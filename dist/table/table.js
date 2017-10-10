"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_virtualized_1 = require("react-virtualized");
var scrollbarSize_1 = require("dom-helpers/util/scrollbarSize");
var sortable_grid_1 = require("./sortable-grid");
var default_header_cell_renderer_1 = require("./default-header-cell-renderer");
var default_cell_renderer_1 = require("./default-cell-renderer");
var Table = (function (_super) {
    __extends(Table, _super);
    function Table(props) {
        var _this = _super.call(this, props) || this;
        _this.headerGridRef = null;
        _this.bodyGridRef = null;
        _this.state = {
            headerScrollbarPresent: false,
            bodyScrollbarPresent: false,
        };
        _this.renderTable = _this.renderTable.bind(_this);
        _this.setHeaderGridRef = _this.setHeaderGridRef.bind(_this);
        _this.setHeaderScrollbarPresence = _this.setHeaderScrollbarPresence.bind(_this);
        _this.setBodyGridRef = _this.setBodyGridRef.bind(_this);
        _this.setBodyScrollbarPresence = _this.setBodyScrollbarPresence.bind(_this);
        _this.getHeaderCellRenderer = _this.getHeaderCellRenderer.bind(_this);
        _this.getCellRenderer = _this.getCellRenderer.bind(_this);
        _this.getColumnWidth = _this.getColumnWidth.bind(_this);
        return _this;
    }
    Table.prototype.setHeaderGridRef = function (ref) {
        if (ref) {
            this.headerGridRef = ref.refs.wrappedInstance;
        }
        else {
            this.headerGridRef = null;
        }
    };
    Table.prototype.setHeaderScrollbarPresence = function (_a) {
        var horizontal = _a.horizontal;
        this.setState({
            headerScrollbarPresent: horizontal,
        });
    };
    Table.prototype.setBodyGridRef = function (ref) {
        if (ref) {
            this.bodyGridRef = ref.refs.wrappedInstance;
        }
        else {
            this.bodyGridRef = null;
        }
    };
    Table.prototype.setBodyScrollbarPresence = function (_a) {
        var vertical = _a.vertical;
        this.setState({
            bodyScrollbarPresent: vertical,
        });
    };
    Table.prototype.getHeaderCellRenderer = function (_a) {
        var rowIndex = _a.rowIndex, columnIndex = _a.columnIndex, isScrolling = _a.isScrolling, isVisible = _a.isVisible, key = _a.key, style = _a.style, parent = _a.parent;
        var children = this.props.children;
        var column = children[columnIndex];
        var cellRenderer = column.props.headerCellRenderer || default_header_cell_renderer_1.default;
        return cellRenderer({
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            isScrolling: isScrolling,
            isVisible: isVisible,
            key: key,
            style: style,
            parent: parent,
        });
    };
    Table.prototype.getCellRenderer = function (_a) {
        var rowIndex = _a.rowIndex, columnIndex = _a.columnIndex, isScrolling = _a.isScrolling, isVisible = _a.isVisible, key = _a.key, style = _a.style, parent = _a.parent;
        var _b = this.props, children = _b.children, dataGetter = _b.dataGetter;
        var column = children[columnIndex];
        var cellRenderer = column.props.cellRenderer || default_cell_renderer_1.default;
        return cellRenderer({
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            isScrolling: isScrolling,
            isVisible: isVisible,
            key: key,
            style: style,
            parent: parent,
            column: column.props,
            data: dataGetter({ rowIndex: rowIndex, dataKey: column.props.dataKey }),
        });
    };
    Table.prototype.getColumnWidth = function (_a) {
        var index = _a.index;
        var children = this.props.children;
        return children[index].props.width;
    };
    Table.prototype.render = function () {
        var children = this.props.children;
        return React.createElement(react_virtualized_1.ScrollSync, null, this.renderTable);
    };
    Table.prototype.renderTable = function (_a) {
        var onScroll = _a.onScroll, scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop;
        var _b = this.props, width = _b.width, height = _b.height, headerHeight = _b.headerHeight, bodyRowHeight = _b.bodyRowHeight, rowCount = _b.rowCount, children = _b.children, onMoveColumn = _b.onMoveColumn;
        var headerScrollbarPresent = this.state.headerScrollbarPresent;
        var headerWidth = width;
        var realHeaderHeight = headerHeight;
        var bodyHeight = height - headerHeight;
        if (headerScrollbarPresent) {
            var scrollbarSize = scrollbarSize_1.default();
            headerWidth -= scrollbarSize;
            realHeaderHeight += scrollbarSize;
        }
        return (React.createElement("div", { className: "sz__table__outer" },
            React.createElement("div", { className: "sz__table__header__outer", style: { width: width, height: headerHeight } },
                React.createElement(sortable_grid_1.SortableGrid, { ref: this.setHeaderGridRef, width: headerWidth, height: realHeaderHeight, columnCount: children.length, columnWidth: this.getColumnWidth, rowCount: 1, rowHeight: headerHeight, cellRenderer: this.getHeaderCellRenderer, scrollLeft: scrollLeft, onScroll: onScroll, onScrollbarPresenceChange: this.setHeaderScrollbarPresence, className: "table__header__grid", helperClass: "table__header-cell--dragged", axis: "x", lockAxis: "x", useDragHandle: true, onSortEnd: onMoveColumn })),
            React.createElement(react_virtualized_1.Grid, { className: "table__body__grid", ref: this.setBodyGridRef, cellRenderer: this.getCellRenderer, columnCount: children.length, columnWidth: this.getColumnWidth, height: bodyHeight, rowCount: rowCount, rowHeight: bodyRowHeight, width: width, scrollLeft: scrollLeft, onScroll: onScroll, onScrollbarPresenceChange: this.setBodyScrollbarPresence })));
    };
    return Table;
}(React.PureComponent));
exports.Table = Table;
