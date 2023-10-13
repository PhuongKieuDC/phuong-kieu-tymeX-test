import { CategoryEntity } from '../category/category.entity';
import { AbstractEntity } from './../../common/abstract.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0, type: 'float4' })
  price: number;

  @Column({ default: 0, type: 'float4' })
  discountPercentage: number;

  @Column({ type: 'float4', default: 0 })
  rating: number;

  @Column({ default: 0 })
  stock: number;

  @Column()
  brand: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ default: '', type: 'simple-array' })
  images: string[];

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => CategoryEntity)
  category: CategoryEntity;
}
