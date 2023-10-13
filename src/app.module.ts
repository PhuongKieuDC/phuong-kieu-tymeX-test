import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'snake-naming.strategy';
import { ProductEntity } from './modules/product/product.entity';
import { CategoryEntity } from './modules/category/category.entity';

const entities = [ProductEntity, CategoryEntity];

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'containers-us-west-64.railway.app',
      port: 5567,
      username: 'postgres',
      password: 'JSm6GdnSiSGUKB8zaqMX',
      database: 'railway',
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
      logging: true,
      entities: entities,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
