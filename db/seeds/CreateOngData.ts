import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertOngSeed1717893000001 implements MigrationInterface {
    name = 'InsertOngSeed1717893000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO ongs (id, nome, cnpj, email, endereco, pedido, ativo) VALUES 
            ('b2c3d4e5-f6a1-7890-bc12-d34ef567890a', 'ONG Exemplo', '12345678000199', 'contato@ongexemplo.org', 'Rua Exemplo, 123, Cidade Exemplo, Estado Exemplo', 'Pedido Exemplo', 'S')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM ongs WHERE id = 'b2c3d4e5-f6a1-7890-bc12-d34ef567890a'
        `);
    }
}
