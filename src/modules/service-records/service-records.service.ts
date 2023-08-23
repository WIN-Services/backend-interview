import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateServiceRecordDto } from './dto/create-service-record.dto';
import { UpdateServiceRecordDto } from './dto/update-service-record.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ServiceRecordsService {
  constructor(
    @Inject(DatabaseService) private readonly databaseService: DatabaseService,
  ) {}

  async createServiceRecord(createServiceRecordDto: CreateServiceRecordDto) {
    try {
      const createServiceRecord = await this.databaseService.executeQuery(
        `select * from win_insert_service_record($1)`,
        [createServiceRecordDto.name],
      );
      if (createServiceRecord.length)
        return createServiceRecord[0].win_insert_service_record;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async getAllServiceRecords() {
    try {
      const getAllServiceRecords = await this.databaseService.executeQuery(
        `select * from win_get_all_service_records()`,
      );

      return {
        msg: getAllServiceRecords.length
          ? 'Service Records fetched successfully'
          : 'No Service Record found',
        data: getAllServiceRecords,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async getServiceRecord(param: { id: string }) {
    try {
      const getServiceRecord = await this.databaseService.executeQuery(
        `select * from win_get_service_record_by_id($1)`,
        [+param.id],
      );
      return {
        msg: getServiceRecord.length
          ? 'Service Record fetched successfully'
          : 'No Service Record found',
        data: getServiceRecord,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async updateServiceRecord(
    param: { id: string },
    updateServiceRecordDto: UpdateServiceRecordDto,
  ) {
    try {
      const updateServiceRecord = await this.databaseService.executeQuery(
        `select * from win_update_service_record($1, $2)`,
        [+param.id, updateServiceRecordDto.name],
      );
      if (updateServiceRecord.length)
        return updateServiceRecord[0].win_update_service_record;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async removeServiceRecord(param: { id: string }) {
    try {
      const updateServiceRecord = await this.databaseService.executeQuery(
        `select * from win_delete_service_record($1)`,
        [+param.id],
      );
      if (updateServiceRecord.length)
        return updateServiceRecord[0].win_delete_service_record;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
