"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var sortableCellRangeRenderer = function (_a) {
    var cellCache = _a.cellCache, cellRenderer = _a.cellRenderer, columnSizeAndPositionManager = _a.columnSizeAndPositionManager, columnStartIndex = _a.columnStartIndex, columnStopIndex = _a.columnStopIndex, deferredMeasurementCache = _a.deferredMeasurementCache, horizontalOffsetAdjustment = _a.horizontalOffsetAdjustment, isScrolling = _a.isScrolling, parent = _a.parent, // Grid (or List or Table)
    rowSizeAndPositionManager = _a.rowSizeAndPositionManager, rowStartIndex = _a.rowStartIndex, rowStopIndex = _a.rowStopIndex, styleCache = _a.styleCache, verticalOffsetAdjustment = _a.verticalOffsetAdjustment, visibleColumnIndices = _a.visibleColumnIndices, visibleRowIndices = _a.visibleRowIndices;
    var renderedCells = [];
    // browsers have native size limits for elements (eg Chrome 33M pixels, IE 1.5M pixes).
    // user cannot scroll beyond these size limitations.
    // in order to work around this, ScalingCellSizeAndPositionManager compresses offsets.
    // we should never cache styles for compressed offsets though as this can lead to bugs.
    // see issue #576 for more.
    var areOffsetsAdjusted = columnSizeAndPositionManager.areOffsetsAdjusted() ||
        rowSizeAndPositionManager.areOffsetsAdjusted();
    var canCacheStyle = !isScrolling && !areOffsetsAdjusted;
    for (var rowIndex = rowStartIndex; rowIndex <= rowStopIndex; rowIndex++) {
        var rowDatum = rowSizeAndPositionManager.getSizeAndPositionOfCell(rowIndex);
        var rowCells = [];
        var rowStyle = {};
        for (var columnIndex = columnStartIndex; columnIndex <= columnStopIndex; columnIndex++) {
            var columnDatum = columnSizeAndPositionManager.getSizeAndPositionOfCell(columnIndex);
            var isVisible = columnIndex >= visibleColumnIndices.start &&
                columnIndex <= visibleColumnIndices.stop &&
                rowIndex >= visibleRowIndices.start &&
                rowIndex <= visibleRowIndices.stop;
            var key = rowIndex + "-" + columnIndex;
            var style = void 0;
            // cache style objects so shallow-compare doesn't re-render unnecessarily.
            if (canCacheStyle && styleCache[key]) {
                style = styleCache[key];
            }
            else {
                // in deferred mode, cells will be initially rendered before we know their size.
                // don't interfere with CellMeasurer's measurements by setting an invalid size.
                if (deferredMeasurementCache &&
                    !deferredMeasurementCache.has(rowIndex, columnIndex)) {
                    // position not-yet-measured cells at top/left 0,0,
                    // and give them width/height of 'auto' so they can grow larger than the parent Grid if necessary.
                    // positioning them further to the right/bottom influences their measured size.
                    style = {
                        height: "auto",
                        left: 0,
                        position: "absolute",
                        top: 0,
                        width: "auto",
                    };
                }
                else {
                    style = {
                        height: rowDatum.size,
                        left: columnDatum.offset + horizontalOffsetAdjustment,
                        position: "absolute",
                        // top: rowDatum.offset + verticalOffsetAdjustment,
                        width: columnDatum.size,
                    };
                    styleCache[key] = style;
                }
            }
            var cellRendererParams = {
                columnIndex: columnIndex,
                isScrolling: isScrolling,
                isVisible: isVisible,
                key: key,
                parent: parent,
                rowIndex: rowIndex,
                style: style,
            };
            var renderedCell = void 0;
            // avoid re-creating cells while scrolling.
            // this can lead to the same cell being created many times and can cause performance issues for "heavy" cells.
            // if a scroll is in progress- cache and reuse cells.
            // this cache will be thrown away once scrolling completes.
            // however if we are scaling scroll positions and sizes, we should also avoid caching.
            // this is because the offset changes slightly as scroll position changes and caching leads to stale values.
            // for more info refer to issue #395
            if (isScrolling &&
                !horizontalOffsetAdjustment &&
                !verticalOffsetAdjustment) {
                if (!cellCache[key]) {
                    cellCache[key] = cellRenderer(cellRendererParams);
                }
                renderedCell = cellCache[key];
                // if the user is no longer scrolling, don't cache cells.
                // this makes dynamic cell content difficult for users and would also lead to a heavier memory footprint.
            }
            else {
                renderedCell = cellRenderer(cellRendererParams);
            }
            if (renderedCell == null || renderedCell === false) {
                continue;
            }
            rowCells.push(renderedCell);
            rowStyle = __assign({}, style, { width: parent.props.width, left: 0, top: rowDatum.offset + verticalOffsetAdjustment, boxSizing: "border-box" });
        }
        renderedCells.push(React.createElement("div", { key: "swr-" + rowIndex, style: rowStyle, className: classnames_1.default({
                "table__body-row--even": rowIndex % 2 !== 0,
                "table__body-row--odd": rowIndex % 2 === 0,
            }) }, rowCells));
    }
    return renderedCells;
};
