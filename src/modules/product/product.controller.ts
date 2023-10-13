import { CommonPagingResponse } from './../../common/dto/CommonPageResponse';
import { PagingOptionProductDto } from './dto/PagingOptionProductDto';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts(
    @Query() query: PagingOptionProductDto,
  ): Promise<CommonPagingResponse<ProductEntity>> {
    return this.productService.getProducts(query);
  }
}
