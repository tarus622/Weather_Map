import { ApiProperty } from '@nestjs/swagger';

export class CreateWebhookDto {
  @ApiProperty({ required: true })
  city: string;

  @ApiProperty({ required: true })
  country: string;

  @ApiProperty({ required: true })
  webhookURL: string;
}
