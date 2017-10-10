export interface MoveColumnParams {
    oldIndex: number;
    newIndex: number;
}
export interface MoveColumn {
    (params: MoveColumnParams): void;
}
