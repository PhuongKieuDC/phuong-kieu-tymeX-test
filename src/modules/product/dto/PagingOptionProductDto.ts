import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from './../../../common/dto/PageOptionsDto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PagingOptionProductDto extends PageOptionsDto {
  @IsOptional()
  @IsString({ message: 'minPrice must be a string' })
  @ApiPropertyOptional()
  minPrice?: string;

  @IsOptional()
  @IsString({ message: 'maxPrice must be a string' })
  @ApiPropertyOptional()
  maxPrice?: string;

  @IsOptional()
  @IsString({ message: 'categoryId must be a string' })
  @ApiPropertyOptional()
  categoryId?: string;

  @IsOptional()
  @IsString({ message: 'sortPrice must be a string' })
  @ApiPropertyOptional()
  sortPrice?: string;
}
