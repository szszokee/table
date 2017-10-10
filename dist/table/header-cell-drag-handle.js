"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_sortable_hoc_1 = require("react-sortable-hoc");
exports.HeaderCellDragHandle = react_sortable_hoc_1.SortableHandle(function (_a) {
    var label = _a.label;
    return (React.createElement("div", { className: "table__header-cell__drag-handle" }, label));
});
