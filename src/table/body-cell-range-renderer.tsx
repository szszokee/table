import * as React from "react";
import classNames from "classnames";
import {
    CellMeasurerCache,
    Grid,
    GridCellProps,
    GridCellRangeProps,
    VisibleCellRange,
    SizeAndPositionData,
} from "react-virtualized";

interface FixedGridCellRangeProps extends GridCellRangeProps {
    deferredMeasurementCache: CellMeasurerCache;
    horizontalOffsetAdjustment: number;
    parent: Grid;
    styleCache: Map<string, React.CSSProperties>;
    verticalOffsetAdjustment: number;
    visibleColumnIndices: VisibleCellRange;
    visibleRowIndices: VisibleCellRange;
}

const sortableCellRangeRenderer: (props: any) => JSX.Element[] = ({
    cellCache,
    cellRenderer,
    columnSizeAndPositionManager,
    columnStartIndex,
    columnStopIndex,
    deferredMeasurementCache,
    horizontalOffsetAdjustment,
    isScrolling,
    parent, // Grid (or List or Table)
    rowSizeAndPositionManager,
    rowStartIndex,
    rowStopIndex,
    styleCache,
    verticalOffsetAdjustment,
    visibleColumnIndices,
    visibleRowIndices,
}: FixedGridCellRangeProps) => {
    const renderedCells: JSX.Element[] = [];

    // browsers have native size limits for elements (eg Chrome 33M pixels, IE 1.5M pixes).
    // user cannot scroll beyond these size limitations.
    // in order to work around this, ScalingCellSizeAndPositionManager compresses offsets.
    // we should never cache styles for compressed offsets though as this can lead to bugs.
    // see issue #576 for more.
    const areOffsetsAdjusted: boolean =
        columnSizeAndPositionManager.areOffsetsAdjusted() ||
        rowSizeAndPositionManager.areOffsetsAdjusted();

    const canCacheStyle: boolean = !isScrolling && !areOffsetsAdjusted;

    for (
        let rowIndex: number = rowStartIndex;
        rowIndex <= rowStopIndex;
        rowIndex++
    ) {
        let rowDatum: SizeAndPositionData = rowSizeAndPositionManager.getSizeAndPositionOfCell(
            rowIndex,
        );

        let rowCells: JSX.Element[] = [];
        let rowStyle: React.CSSProperties = {};

        for (
            let columnIndex: number = columnStartIndex;
            columnIndex <= columnStopIndex;
            columnIndex++
        ) {
            let columnDatum: SizeAndPositionData = columnSizeAndPositionManager.getSizeAndPositionOfCell(
                columnIndex,
            );
            let isVisible: boolean =
                columnIndex >= visibleColumnIndices.start &&
                columnIndex <= visibleColumnIndices.stop &&
                rowIndex >= visibleRowIndices.start &&
                rowIndex <= visibleRowIndices.stop;
            let key: string = `${rowIndex}-${columnIndex}`;
            let style: Object;

            // cache style objects so shallow-compare doesn't re-render unnecessarily.
            if (canCacheStyle && styleCache[key]) {
                style = styleCache[key];
            } else {
                // in deferred mode, cells will be initially rendered before we know their size.
                // don't interfere with CellMeasurer's measurements by setting an invalid size.
                if (
                    deferredMeasurementCache &&
                    !deferredMeasurementCache.has(rowIndex, columnIndex)
                ) {
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
                } else {
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

            let cellRendererParams: GridCellProps = {
                columnIndex,
                isScrolling,
                isVisible,
                key,
                parent,
                rowIndex,
                style,
            };

            let renderedCell: React.ReactNode;

            // avoid re-creating cells while scrolling.
            // this can lead to the same cell being created many times and can cause performance issues for "heavy" cells.
            // if a scroll is in progress- cache and reuse cells.
            // this cache will be thrown away once scrolling completes.
            // however if we are scaling scroll positions and sizes, we should also avoid caching.
            // this is because the offset changes slightly as scroll position changes and caching leads to stale values.
            // for more info refer to issue #395
            if (
                isScrolling &&
                !horizontalOffsetAdjustment &&
                !verticalOffsetAdjustment
            ) {
                if (!cellCache[key]) {
                    cellCache[key] = cellRenderer(cellRendererParams);
                }

                renderedCell = cellCache[key];

                // if the user is no longer scrolling, don't cache cells.
                // this makes dynamic cell content difficult for users and would also lead to a heavier memory footprint.
            } else {
                renderedCell = cellRenderer(cellRendererParams);
            }

            if (renderedCell == null || renderedCell === false) {
                continue;
            }

            rowCells.push(renderedCell as any);
            rowStyle = {
                ...style,
                width: parent.props.width,
                left: 0,
                top: rowDatum.offset + verticalOffsetAdjustment,
                boxSizing: "border-box",
            };
        }

        renderedCells.push(
            <div
                key={`swr-${rowIndex}`}
                style={rowStyle}
                className={classNames({
                    "table__body-row--even": rowIndex % 2 !== 0,
                    "table__body-row--odd": rowIndex % 2 === 0,
                })}
            >
                {rowCells}
            </div>,
        );
    }

    return renderedCells;
};
