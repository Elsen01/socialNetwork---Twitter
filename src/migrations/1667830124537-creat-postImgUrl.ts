import { MigrationInterface, QueryRunner } from 'typeorm';

export class creatPostImgUrl1667830124537 implements MigrationInterface {
  name = 'creatPostImgUrl1667830124537';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "postUrl" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "postUrl"`);
  }
}
