import * as React from "react";
import { SortableHandle } from "react-sortable-hoc";

export interface HeaderCellDragHandleProps {
    label: string;
}

export const HeaderCellDragHandle: React.ComponentClass<
    HeaderCellDragHandleProps
> = SortableHandle<HeaderCellDragHandleProps>(({ label }) => (
    <div className="table__header-cell__drag-handle">{label}</div>
));
