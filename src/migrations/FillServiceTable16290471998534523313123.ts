import { MigrationInterface, QueryRunner } from 'typeorm';
import { Service } from '../entities/service.entity';


export class FillServiceTable16290471998534523313123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Array of service data to be inserted into the table
    const serviceData = [
      { name: 'Inspection' },
      { name: 'Testing' },
      { name: 'Analysis' },
      // Add more services as needed
    ];

    // Loop through the service data and insert each entry into the Service table
    for (const data of serviceData) {
      const service = new Service();
      service.name = data.name;
      await queryRunner.manager.save(service);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // We won't implement the rollback for this specific migration as it is meant
    // to fill the data and not remove it.
  }
}
