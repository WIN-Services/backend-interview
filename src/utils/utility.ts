import { Inject, Injectable } from '@nestjs/common';
import { PaginationObject } from 'src/types/pagination.types';
import { Logger } from 'winston';
@Injectable()
export class Utility {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
  ) {}
  public convertRowDataListToList(data: any[]): any[] {
    if (!data) {
      return [];
    }
    return Object.values(JSON.parse(JSON.stringify(data)));
  }
  public convertArrayToString(array: any[]): string {
    return array
      .map(function (a) {
        return "'" + a.replace("'", "''") + "'";
      })
      .join();
  }
  public getPagination(page: number, pageSize: number): PaginationObject {
    if (!page) page = 1;
    if (!pageSize) pageSize = 30;
    page = page - 1;
    const skip = page <= 0 ? 0 : page * pageSize;
    const limit = +(Number.isNaN(pageSize) ? 30 : pageSize);
    return {
      skip,
      limit,
      page: page + 1,
    };
  }
}
