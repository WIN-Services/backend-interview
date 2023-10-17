import { Service } from '../../../shared/database/postgres/models/service.model';

export type GetWinServicesRequest = {
  name?: string;
};

export type GetWinServicesResponse = {
  services: Array<Service>;
};
