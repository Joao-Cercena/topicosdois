import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OngsModule } from './ongs/ongs.module';
import { SetorModule } from './setor/setor.module';
import { DoadorModule } from './doador/doador.module';

@Module({
  imports: [OngsModule, SetorModule, DoadorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
