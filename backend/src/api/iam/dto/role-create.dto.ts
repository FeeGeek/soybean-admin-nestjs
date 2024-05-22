import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RoleCreateDto {
  @ApiProperty({ required: true })
  @IsString({ message: 'code must be a string' })
  @IsNotEmpty({ message: 'code cannot be empty' })
  code: string;

  @ApiProperty({ required: true })
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name cannot be empty' })
  name: string;

  @ApiProperty({ required: true })
  @IsString({ message: 'pid must be a string' })
  @IsNotEmpty({ message: 'pid cannot be empty' })
  pid: string;

  @ApiProperty({ type: 'string', required: false, nullable: true })
  @IsOptional()
  @IsString({ message: 'description must be a string or null' })
  @Type(() => String)
  description: string | null;
}
