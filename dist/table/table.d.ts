import * as React from "react";
import { Grid, GridCellProps, ScrollSyncChildProps, Index } from "react-virtualized";
import { Column } from "./column";
import { DataGetter } from "./data-getter";
import { MoveColumn } from "./move-column";
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
export declare class Table extends React.PureComponent<TableProps, TableState> {
    headerGridRef: Grid;
    bodyGridRef: Grid;
    constructor(props: TableProps);
    setHeaderGridRef(ref: any): void;
    setHeaderScrollbarPresence({horizontal}: any): void;
    setBodyGridRef(ref: any): void;
    setBodyScrollbarPresence({vertical}: any): void;
    getHeaderCellRenderer({rowIndex, columnIndex, isScrolling, isVisible, key, style, parent}: GridCellProps): JSX.Element;
    getCellRenderer({rowIndex, columnIndex, isScrolling, isVisible, key, style, parent}: GridCellProps): JSX.Element;
    getColumnWidth({index}: Index): number;
    render(): JSX.Element;
    renderTable({onScroll, scrollLeft, scrollTop}: ScrollSyncChildProps): JSX.Element;
}
