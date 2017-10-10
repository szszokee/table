import { GridCellProps } from "react-virtualized";
import { ColumnProps } from "./column";
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
declare const _default: ({columnIndex, key, rowIndex, style, column, parent, onResize}: HeaderCellProps) => JSX.Element;
export default _default;
