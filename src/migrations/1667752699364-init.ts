import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1667752699364 implements MigrationInterface {
  name = 'init1667752699364';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment-like" ("id" SERIAL NOT NULL, "userId" integer, "commentId" integer, CONSTRAINT "PK_f57f8d048305d847f243cab43f3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" SERIAL NOT NULL, "body" character varying NOT NULL, "userId" integer, "postId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "post-like" ("id" SERIAL NOT NULL, "userId" integer, "postId" integer, CONSTRAINT "PK_df71f970017836ca1bb9fbf16af" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "share" ("id" SERIAL NOT NULL, "userId" integer, "sentUserId" integer, CONSTRAINT "PK_67a2b28d2cff31834bc2aa1ed7c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "friendly-list" ("id" SERIAL NOT NULL, "userId" integer, "takeId" integer, CONSTRAINT "PK_2f09776ebe671da45b1e8983a68" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "username" character varying, "age" integer NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "banned-list" ("id" SERIAL NOT NULL, "userId" integer, "bannedUserId" integer, CONSTRAINT "PK_39d89b1694c34c1e13a122eca5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment-like" ADD CONSTRAINT "FK_477cd000dbb2ad0d5dd87179179" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment-like" ADD CONSTRAINT "FK_01b4303631a67eebec0ad4299f7" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post-like" ADD CONSTRAINT "FK_9ce664fc783a0c44fc18dbb655a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post-like" ADD CONSTRAINT "FK_9889aa34df386cb92137d1e3eb6" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "share" ADD CONSTRAINT "FK_07e293248ed4aeb7965af840b13" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "share" ADD CONSTRAINT "FK_2a1e1fba04fffa8bc6e69e4b13e" FOREIGN KEY ("sentUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "friendly-list" ADD CONSTRAINT "FK_3660315d81dd14e8670e366e7d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "friendly-list" ADD CONSTRAINT "FK_7c4fb6d4ce5ff3b56077f31cae2" FOREIGN KEY ("takeId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "banned-list" ADD CONSTRAINT "FK_38343b640e6163f45617e9f816f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "banned-list" ADD CONSTRAINT "FK_d239e301147bb4adb17b2856cee" FOREIGN KEY ("bannedUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "banned-list" DROP CONSTRAINT "FK_d239e301147bb4adb17b2856cee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banned-list" DROP CONSTRAINT "FK_38343b640e6163f45617e9f816f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "friendly-list" DROP CONSTRAINT "FK_7c4fb6d4ce5ff3b56077f31cae2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "friendly-list" DROP CONSTRAINT "FK_3660315d81dd14e8670e366e7d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "share" DROP CONSTRAINT "FK_2a1e1fba04fffa8bc6e69e4b13e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "share" DROP CONSTRAINT "FK_07e293248ed4aeb7965af840b13"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post-like" DROP CONSTRAINT "FK_9889aa34df386cb92137d1e3eb6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post-like" DROP CONSTRAINT "FK_9ce664fc783a0c44fc18dbb655a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment-like" DROP CONSTRAINT "FK_01b4303631a67eebec0ad4299f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment-like" DROP CONSTRAINT "FK_477cd000dbb2ad0d5dd87179179"`,
    );
    await queryRunner.query(`DROP TABLE "banned-list"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "friendly-list"`);
    await queryRunner.query(`DROP TABLE "share"`);
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`DROP TABLE "post-like"`);
    await queryRunner.query(`DROP TABLE "comments"`);
    await queryRunner.query(`DROP TABLE "comment-like"`);
  }
}
