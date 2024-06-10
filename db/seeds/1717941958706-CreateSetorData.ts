import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertDoadorEntity1717893000000 implements MigrationInterface {
    name = 'InsertDoadorEntity1717893000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO doador (id, nome, cpf, data_nascimento) VALUES 
            ('a1b2c3d4-e5f6-7890-ab12-cd34ef567890', 'João Silva', '12345678900', '1985-01-01')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM doador WHERE id = 'a1b2c3d4-e5f6-7890-ab12-cd34ef567890'
        `);
    }
}
