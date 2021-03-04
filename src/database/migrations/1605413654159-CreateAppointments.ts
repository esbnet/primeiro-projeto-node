import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAppointments1605413654159 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "appointments",
        columns: [
          {
            name: "id",
            type: "uuid",
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "provider",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "date",
            type: "timestamp with time zone",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default:'now()',
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default:'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("appointments");
  }
}
