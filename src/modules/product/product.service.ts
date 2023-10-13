import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Brackets, Repository } from 'typeorm';
import { PagingOptionProductDto } from './dto/PagingOptionProductDto';
import { CommonPagingResponse } from './../../common/dto/CommonPageResponse';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getProducts(
    options: PagingOptionProductDto,
  ): Promise<CommonPagingResponse<ProductEntity>> {
    const condition: string[] = [];
    const params = {};

    if (options.q) {
      const searchConditions = [
        'product.title ILIKE :q',
        'product.description ILIKE :q',
        'category."name" ILIKE :q',
      ];

      condition.push(`(${searchConditions.join(' OR ')})`);
      Object.assign(params, {
        q: `%${options.q}%`,
      });
    }

    if (options.categoryId) {
      condition.push('product.categoryId = :categoryId');
      Object.assign(params, {
        categoryId: options.categoryId,
      });
    }

    if (options.minPrice && options.maxPrice) {
      condition.push(
        '(product.price >= :minPrice AND product.price <= :maxPrice)',
      );
      Object.assign(params, {
        minPrice: +options.minPrice,
        maxPrice: +options.maxPrice,
      });
    } else if (options.minPrice) {
      condition.push('product.price >= :minPrice');
      Object.assign(params, {
        minPrice: +options.minPrice,
      });
    } else if (options.maxPrice) {
      condition.push('product.price <= :maxPrice');
      Object.assign(params, {
        maxPrice: +options.maxPrice,
      });
    }

    let query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where(
        new Brackets((qb) => qb.where(`${condition.join(' AND ')}`)),
        params,
      );

    if (options.orderField && options.order) {
      query = query.orderBy(`product.${options.orderField}`, options.order);
    }

    query = query.take(+options.take).skip(+options.skip);

    const [products, count] = await query.getManyAndCount();

    return new CommonPagingResponse(
      {
        pageOptionsDto: options,
        itemCount: count,
      },
      products,
    );
  }
}
