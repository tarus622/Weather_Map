import { IsNotEmpty } from 'class-validator';

export class CreateWebhookDto {
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  webhookURL: string;
}
