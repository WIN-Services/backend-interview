import { PaginationObject } from 'src/types/pagination.types';
import { Logger } from 'winston';
export declare class Utility {
    private readonly logger;
    constructor(logger: Logger);
    convertRowDataListToList(data: any[]): any[];
    convertArrayToString(array: any[]): string;
    getPagination(page: number, pageSize: number): PaginationObject;
}
