import { MigrationInterface, QueryRunner } from 'typeorm';

export class confirmationEmail1668256626929 implements MigrationInterface {
  name = 'confirmationEmail1668256626929';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "isEmailConfirmed" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "isEmailConfirmed"`,
    );
  }
}
