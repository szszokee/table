import * as React from "react";

import {
    Grid,
    GridCellProps,
    ScrollSync,
    ScrollSyncChildProps,
    Index,
} from "react-virtualized";
import getScrollbarSize from "dom-helpers/util/scrollbarSize";

import { Column } from "./column";
import { DataGetter } from "./data-getter";
import { MoveColumn } from "./move-column";
import { SortableGrid } from "./sortable-grid";

import defaultHeaderCellRenderer from "./default-header-cell-renderer";
import defaultCellRenderer from "./default-cell-renderer";
import { CellProps } from "./default-cell-renderer";

export interface TableProps {
    children: Column[];
    dataGetter: DataGetter;

    width: number;
    height: number;

    headerHeight: number;
    bodyRowHeight: number;

    rowCount: number;

    onMoveColumn?: MoveColumn;
}

export interface TableState {
    headerScrollbarPresent: boolean;
    bodyScrollbarPresent: boolean;
}

export class Table extends React.PureComponent<TableProps, TableState> {
    headerGridRef: Grid = null;
    bodyGridRef: Grid = null;

    constructor(props: TableProps) {
        super(props);

        this.state = {
            headerScrollbarPresent: false,
            bodyScrollbarPresent: false,
        };

        this.renderTable = this.renderTable.bind(this);
        this.setHeaderGridRef = this.setHeaderGridRef.bind(this);
        this.setHeaderScrollbarPresence = this.setHeaderScrollbarPresence.bind(
            this,
        );
        this.setBodyGridRef = this.setBodyGridRef.bind(this);
        this.setBodyScrollbarPresence = this.setBodyScrollbarPresence.bind(
            this,
        );
        this.getHeaderCellRenderer = this.getHeaderCellRenderer.bind(this);
        this.getCellRenderer = this.getCellRenderer.bind(this);
        this.getColumnWidth = this.getColumnWidth.bind(this);
    }

    setHeaderGridRef(ref: any): void {
        if (ref) {
            this.headerGridRef = ref.refs.wrappedInstance;
        } else {
            this.headerGridRef = null;
        }
    }

    setHeaderScrollbarPresence({ horizontal }: any): void {
        this.setState({
            headerScrollbarPresent: horizontal,
        });
    }

    setBodyGridRef(ref: any): void {
        if (ref) {
            this.bodyGridRef = ref.refs.wrappedInstance;
        } else {
            this.bodyGridRef = null;
        }
    }

    setBodyScrollbarPresence({ vertical }: any): void {
        this.setState({
            bodyScrollbarPresent: vertical,
        });
    }

    getHeaderCellRenderer({
        rowIndex,
        columnIndex,
        isScrolling,
        isVisible,
        key,
        style,
        parent,
    }: GridCellProps): JSX.Element {
        const { children } = this.props;

        const column: Column = children[columnIndex];

        const cellRenderer: (props: GridCellProps) => JSX.Element =
            column.props.headerCellRenderer || defaultHeaderCellRenderer;

        return cellRenderer({
            rowIndex,
            columnIndex,
            isScrolling,
            isVisible,
            key,
            style,
            parent,
        });
    }

    getCellRenderer({
        rowIndex,
        columnIndex,
        isScrolling,
        isVisible,
        key,
        style,
        parent,
    }: GridCellProps): JSX.Element {
        const { children, dataGetter } = this.props;

        const column: Column = children[columnIndex];

        const cellRenderer: (props: CellProps) => JSX.Element =
            column.props.cellRenderer || defaultCellRenderer;

        return cellRenderer({
            rowIndex,
            columnIndex,
            isScrolling,
            isVisible,
            key,
            style,
            parent,
            column: column.props,
            data: dataGetter({ rowIndex, dataKey: column.props.dataKey }),
        });
    }

    getColumnWidth({ index }: Index): number {
        const { children } = this.props;
        return children[index].props.width;
    }

    render(): JSX.Element {
        const { children } = this.props;

        return <ScrollSync>{this.renderTable}</ScrollSync>;
    }

    renderTable({
        onScroll,
        scrollLeft,
        scrollTop,
    }: ScrollSyncChildProps): JSX.Element {
        const {
            width,
            height,

            headerHeight,
            bodyRowHeight,

            rowCount,

            children,

            onMoveColumn,
        } = this.props;

        const { headerScrollbarPresent } = this.state;

        let headerWidth: number = width;
        let realHeaderHeight: number = headerHeight;
        const bodyHeight: number = height - headerHeight;

        if (headerScrollbarPresent) {
            const scrollbarSize: number = getScrollbarSize();
            headerWidth -= scrollbarSize;
            realHeaderHeight += scrollbarSize;
        }

        return (
            <div className="sz__table__outer">
                <div
                    className="sz__table__header__outer"
                    style={{ width: width, height: headerHeight }}
                >
                    <SortableGrid
                        ref={this.setHeaderGridRef}
                        width={headerWidth}
                        height={realHeaderHeight}
                        columnCount={children.length}
                        columnWidth={this.getColumnWidth}
                        rowCount={1}
                        rowHeight={headerHeight}
                        cellRenderer={this.getHeaderCellRenderer}
                        scrollLeft={scrollLeft}
                        onScroll={onScroll}
                        onScrollbarPresenceChange={
                            this.setHeaderScrollbarPresence
                        }
                        className="table__header__grid"
                        helperClass="table__header-cell--dragged"
                        axis="x"
                        lockAxis="x"
                        useDragHandle
                        onSortEnd={onMoveColumn}
                    />
                </div>
                <Grid
                    className="table__body__grid"
                    ref={this.setBodyGridRef}
                    cellRenderer={this.getCellRenderer}
                    columnCount={children.length}
                    columnWidth={this.getColumnWidth}
                    height={bodyHeight}
                    rowCount={rowCount}
                    rowHeight={bodyRowHeight}
                    width={width}
                    scrollLeft={scrollLeft}
                    onScroll={onScroll}
                    onScrollbarPresenceChange={this.setBodyScrollbarPresence}
                />
            </div>
        );
    }
}
