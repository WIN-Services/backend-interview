import { MigrationInterface, QueryRunner } from "typeorm";

export class phase11670263657266 implements MigrationInterface {
    name = 'phase11670263657266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Order\` (\`id\` varchar(64) NOT NULL, \`totalFee\` float NOT NULL, \`description\` varchar(255) NULL, \`userId\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Service\` (\`id\` varchar(64) NOT NULL, \`name\` varchar(255) NOT NULL, \`fee\` float NOT NULL, \`createdBy\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`OrderServices\` (\`orderId\` varchar(64) NOT NULL, \`serviceId\` varchar(64) NOT NULL, INDEX \`IDX_b683590275bb9f9c3331f1991e\` (\`orderId\`), INDEX \`IDX_b5d88410dd30110dc63bb8d304\` (\`serviceId\`), PRIMARY KEY (\`orderId\`, \`serviceId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`OrderServices\` ADD CONSTRAINT \`FK_b683590275bb9f9c3331f1991ed\` FOREIGN KEY (\`orderId\`) REFERENCES \`Order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`OrderServices\` ADD CONSTRAINT \`FK_b5d88410dd30110dc63bb8d3048\` FOREIGN KEY (\`serviceId\`) REFERENCES \`Service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`OrderServices\` DROP FOREIGN KEY \`FK_b5d88410dd30110dc63bb8d3048\``);
        await queryRunner.query(`ALTER TABLE \`OrderServices\` DROP FOREIGN KEY \`FK_b683590275bb9f9c3331f1991ed\``);
        await queryRunner.query(`DROP INDEX \`IDX_b5d88410dd30110dc63bb8d304\` ON \`OrderServices\``);
        await queryRunner.query(`DROP INDEX \`IDX_b683590275bb9f9c3331f1991e\` ON \`OrderServices\``);
        await queryRunner.query(`DROP TABLE \`OrderServices\``);
        await queryRunner.query(`DROP TABLE \`Service\``);
        await queryRunner.query(`DROP TABLE \`Order\``);
    }

}
