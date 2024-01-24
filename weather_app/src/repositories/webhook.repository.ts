import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Webhook } from '../schemas/webhooks.schema';
import { Model } from 'mongoose';
import { CreateWebhookDto } from '../dtos/create-webhook.dto';

@Injectable()
export class WebhookRepository {
  constructor(
    @InjectModel(Webhook.name) private webhookModel: Model<Webhook>,
  ) {}

  async createWebhook(createWebhookDto: CreateWebhookDto): Promise<Webhook> {
    try {
      const existingWebhook = await this.webhookModel.find({
        city: createWebhookDto.city,
        country: createWebhookDto.country,
        webhookURL: createWebhookDto.webhookURL,
      });

      if (existingWebhook.length > 0)
        throw new Error('Webhook já existente para a mesma localização e URL');

      const createdWebhook = await this.webhookModel.create(createWebhookDto);

      return createdWebhook;
    } catch (error) {
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getWebhooks(city: string, country: string) {
    try {
      const webhooks = await this.webhookModel.find({
        city,
        country,
      });

      return webhooks;
    } catch (error) {
      throw error;
    }
  }
}
