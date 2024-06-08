import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OngsModule } from './ongs/ongs.module';
import { SetorModule } from './setor/setor.module';

@Module({
  imports: [OngsModule, SetorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
