import { BadRequestException, Injectable } from '@nestjs/common';
import {
  GetWinServicesRequest,
  GetWinServicesResponse,
} from '../types/get-win-service.type';
import { PostgresService } from '../../../shared/database/postgres/postgres.service';
import { Service } from '../../../shared/database/postgres/models/service.model';

@Injectable()
export class WinServiceDataService {
  constructor(private readonly postgresService: PostgresService) {}

  async getWinServicesWithFilter(
    filters: GetWinServicesRequest,
  ): Promise<GetWinServicesResponse> {
    let whereClause = ``;
    const queryValues: string[] = [];

    if (filters.name) {
      whereClause = `WHERE name ilike $${queryValues.length + 1}`;
      queryValues.push(filters.name);
    }

    const services = await this.postgresService.query<Service>(
      `
          SELECT id, "name", "description", fee, "currencyCode", "dateCreated", "dateUpdated"
          FROM "Service"
          ${whereClause}
        `,
      queryValues,
    );

    return {
      services,
    };
  }

  async checkIfServiceExists(serviceIds: string[]) {
    const servicesPresent = await this.postgresService.query<Service>(
      `
          SELECT *
          FROM "Service"
          WHERE id = ANY($1)
        `,
      [serviceIds],
    );

    const presentServiceIdSet = new Set(
      servicesPresent.map((service) => service.id),
    );

    const serviceIdsNotPresent = serviceIds.filter(
      (id) => !presentServiceIdSet.has(id),
    );

    if (serviceIdsNotPresent.length) {
      throw new BadRequestException(
        `Service '${serviceIdsNotPresent.join(', ')}' does not exist`,
      );
    }

    return servicesPresent;
  }
}
