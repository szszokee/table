import * as React from "react";

import { SortableContainer, SortableContainerProps } from "react-sortable-hoc";
import { Grid, GridProps } from "react-virtualized";

export type SortableGrid = React.ComponentClass<
    GridProps & SortableContainerProps
>;

export const SortableGrid: SortableGrid = SortableContainer(Grid as any, {
    withRef: true,
});
