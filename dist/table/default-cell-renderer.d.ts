import { GridCellProps } from "react-virtualized";
import { ColumnProps } from "./column";
export interface CellProps extends GridCellProps {
    column: ColumnProps;
    data: any;
}
declare const _default: ({columnIndex, rowIndex, isScrolling, isVisible, key, style, parent, column, data}: CellProps) => JSX.Element;
export default _default;
