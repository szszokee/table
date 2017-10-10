"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_sortable_hoc_1 = require("react-sortable-hoc");
var react_virtualized_1 = require("react-virtualized");
exports.SortableGrid = react_sortable_hoc_1.SortableContainer(react_virtualized_1.Grid, {
    withRef: true,
});
