import { MigrationInterface, QueryRunner } from 'typeorm';

export class refreshToken1668093101070 implements MigrationInterface {
  name = 'refreshToken1668093101070';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "currentHashedRefreshToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "currentHashedRefreshToken"`,
    );
  }
}
