import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWebhookDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2, { message: 'country length must be 2 characters' })
  country: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  webhookURL: string;
}
