// src/app.module.ts

import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TargetModule } from './target/target.module';
import { TargetService } from './target/target.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', 'config/.env'],
    }),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    } as TypeOrmModuleOptions),
    UsersModule,
    TargetModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [ConfigModule],
  // providers: [AppService, TargetService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly targetService: TargetService) {}

  async onModuleInit() {
    // Chame o seeder aqui quando o módulo for inicializado
    
    const data = await this.targetService.count();
    
    if (data > 0) return;
    await this.targetService.seedFromCSV();
  }
}



// a
// d
// export class AppModule {
//   constructor(private readonly targetService: TargetService) {
//     this.checkAndImportExcel();
//   }

//   async checkAndImportExcel() {
//     const filePath = './arquivoTarget.xlsx'; // Substitua pelo caminho real do seu arquivo Excel
//     try {
//       await this.targetService.importFromExcel(filePath);
//       console.log('Excel data imported successfully.');
//     } catch (error) {
//       console.error('Error importing Excel data:', error.message);
//     }
//   }
// }
