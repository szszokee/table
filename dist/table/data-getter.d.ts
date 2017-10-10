export interface DataGetterParams {
    dataKey: string;
    rowIndex: number;
}
export interface DataGetter {
    (params: DataGetterParams): any;
}
