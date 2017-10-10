import * as React from "react";
import classNames from "classnames";
import { GridCellProps } from "react-virtualized";

import { ColumnProps } from "./column";

export interface CellProps extends GridCellProps {
    column: ColumnProps;
    data: any;
}

export default ({
    columnIndex,
    rowIndex,
    isScrolling,
    isVisible,
    key,
    style,
    parent,
    column,
    data,
}: CellProps) => (
    <div
        key={key}
        style={style}
        className={classNames({
            "table__body-cell": true,
            "table__body-cell--first": columnIndex === 0,
            "table__body-cell--last":
                columnIndex === parent.props.columnCount - 1,
            "table__body-cell--even-row": rowIndex % 2 !== 0,
            "table__body-cell--odd-row": rowIndex % 2 === 0,
        })}
    >
        <span style={{ padding: "0 6px" }}>{data}</span>
    </div>
);
