import * as React from "react";
import Draggable from "react-draggable";
import classNames from "classnames";
import { GridCellProps } from "react-virtualized";

import { ColumnProps } from "./column";
import { HeaderCellDragHandle } from "./header-cell-drag-handle";

export interface OnResizeParams {
    columnIndex: number;
    delta: number;
}

export interface OnResize {
    (params: OnResizeParams): void;
}

export interface HeaderCellProps extends GridCellProps {
    onResize: OnResize;
    column: ColumnProps;
}

export default ({
    columnIndex,
    key,
    rowIndex,
    style,
    column,
    parent,
    onResize,
}: HeaderCellProps) => (
    <div
        key={key}
        style={style}
        className={classNames({
            "table__header-cell": true,
            "table__header-cell--last":
                columnIndex === parent.props.columnCount - 1,
        })}
    >
        <HeaderCellDragHandle label={column.label} />
        <Draggable
            axis="x"
            defaultClassNameDragging="table__header-cell__resize-handle--dragging"
            onStop={(e, data) => onResize({ columnIndex, delta: data.x })}
            position={{ x: 0, y: 0 }}
            bounds={{
                left: -style.width + 20,
                top: 0,
                bottom: 0,
                right: 99999,
            }}
        >
            <div className="table__header-cell__resize-handle">
                <div className="table__header-cell__resize-handle__vertical_line" />
            </div>
        </Draggable>
    </div>
);
