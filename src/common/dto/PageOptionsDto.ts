import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { BooleanEnum } from '../constants/boolean-enum';

import { Order } from '../constants/order';

export class PageOptionsDto {
  @ApiPropertyOptional({
    enum: Order,
    default: Order.DESC,
  })
  @IsEnum(Order)
  @IsOptional()
  readonly order: Order = Order.DESC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1000)
  @IsOptional()
  readonly take: number = 30;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly q?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly deleted?: BooleanEnum;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly orderField?: string;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  itemCount?: number;
}
