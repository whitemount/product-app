import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
