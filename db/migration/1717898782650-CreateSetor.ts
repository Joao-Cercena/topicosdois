import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSetor1717898782650 implements MigrationInterface {
    name = 'CreateSetor1717898782650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "setor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "ativo" character varying(1) NOT NULL, CONSTRAINT "PK_3514be97057f6d3d8859297ba25" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ongs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "cnpj" character varying(14) NOT NULL, "email" character varying(100) NOT NULL, "endereco" character varying(100) NOT NULL, "pedido" character varying(100) NOT NULL, "ativo" character varying(1) NOT NULL, "setorId" uuid, CONSTRAINT "PK_bcd0edd4e9d5fb34b6e0b8c06d2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ongs" ADD CONSTRAINT "FK_4d79b5ebc97475ff6ae769377d9" FOREIGN KEY ("setorId") REFERENCES "setor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ongs" DROP CONSTRAINT "FK_4d79b5ebc97475ff6ae769377d9"`);
        await queryRunner.query(`DROP TABLE "ongs"`);
        await queryRunner.query(`DROP TABLE "setor"`);
    }

}
