// src/targets/target.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Target } from './target.entity';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Target])], // Importe o TypeOrmModule.forFeature com a entidade Target
  providers: [TargetService], // Adicione o serviço aqui
  exports: [TargetService], controllers: [TargetController], // Exporte o serviço se você pretende usá-lo fora deste módulo
})
export class TargetModule {}
