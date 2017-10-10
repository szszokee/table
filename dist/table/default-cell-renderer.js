"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
exports.default = function (_a) {
    var columnIndex = _a.columnIndex, rowIndex = _a.rowIndex, isScrolling = _a.isScrolling, isVisible = _a.isVisible, key = _a.key, style = _a.style, parent = _a.parent, column = _a.column, data = _a.data;
    return (React.createElement("div", { key: key, style: style, className: classnames_1.default({
            "table__body-cell": true,
            "table__body-cell--first": columnIndex === 0,
            "table__body-cell--last": columnIndex === parent.props.columnCount - 1,
            "table__body-cell--even-row": rowIndex % 2 !== 0,
            "table__body-cell--odd-row": rowIndex % 2 === 0,
        }) },
        React.createElement("span", { style: { padding: "0 6px" } }, data)));
};
