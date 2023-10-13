import { ProductEntity } from '../product/product.entity';
import { AbstractEntity } from './../../common/abstract.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
