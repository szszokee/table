import * as React from "react";
import { HeaderCellProps } from "./default-header-cell-renderer";
import { CellProps } from "./default-cell-renderer";
export interface ColumnProps {
    label: string;
    width: number;
    dataKey: string;
    headerCellRenderer?: (props: HeaderCellProps) => JSX.Element;
    cellRenderer?: (props: CellProps) => JSX.Element;
}
export declare class Column extends React.Component<ColumnProps> {
}
