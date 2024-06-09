
import { DataSource, DataSourceOptions } from 'typeorm';
import { SetorEntity } from 'src/setor/setor.entity';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    database: 'postgres',
    username: 'postgres',
    password: 'admin',
    port: 5432,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
}

export default new DataSource(dataSourceOptions);
