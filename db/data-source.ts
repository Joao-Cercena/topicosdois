
import { DataSource, DataSourceOptions } from 'typeorm';
import { OngsEntity } from 'src/ongs/ongs.entity';
import { SetorEntity } from 'src/setor/setor.entity';
import { DoadorEntity } from 'src/doador/doador.entity';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    database: 'postgres',
    username: 'postgres',
    password: 'admin',
    port: 5432,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migration/*.js'],
    synchronize: true,
    logging: true,
}

export default new DataSource(dataSourceOptions);
