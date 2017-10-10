"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_draggable_1 = require("react-draggable");
var classnames_1 = require("classnames");
var header_cell_drag_handle_1 = require("./header-cell-drag-handle");
exports.default = function (_a) {
    var columnIndex = _a.columnIndex, key = _a.key, rowIndex = _a.rowIndex, style = _a.style, column = _a.column, parent = _a.parent, onResize = _a.onResize;
    return (React.createElement("div", { key: key, style: style, className: classnames_1.default({
            "table__header-cell": true,
            "table__header-cell--last": columnIndex === parent.props.columnCount - 1,
        }) },
        React.createElement(header_cell_drag_handle_1.HeaderCellDragHandle, { label: column.label }),
        React.createElement(react_draggable_1.default, { axis: "x", defaultClassNameDragging: "table__header-cell__resize-handle--dragging", onStop: function (e, data) { return onResize({ columnIndex: columnIndex, delta: data.x }); }, position: { x: 0, y: 0 }, bounds: {
                left: -style.width + 20,
                top: 0,
                bottom: 0,
                right: 99999,
            } },
            React.createElement("div", { className: "table__header-cell__resize-handle" },
                React.createElement("div", { className: "table__header-cell__resize-handle__vertical_line" })))));
};
