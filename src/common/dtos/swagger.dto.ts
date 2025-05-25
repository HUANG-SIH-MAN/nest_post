import { IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({ description: '頁碼', example: 1, default: 1, required: false })
  page: number = 1;

  @IsNumber()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  @ApiProperty({
    description: '每頁數量',
    example: 10,
    default: 10,
    required: false,
  })
  pageSize: number = 10;
}
