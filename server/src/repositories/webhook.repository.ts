import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Webhook } from '../schemas/webhooks.schema';
import { Model } from 'mongoose';
import { CreateWebhookDto } from '../dtos/create-webhook.dto';
import { WebhookRepositoryLoggerService } from '../../logging/logger/logger.service';

@Injectable()
export class WebhookRepository {
  private readonly logger = new WebhookRepositoryLoggerService();

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

      if (existingWebhook.length > 0) {
        this.logger.info(
          `Webhook already exists for the same location and URL: ${JSON.stringify(
            existingWebhook,
          )}`,
        );
        throw new Error('Webhook already exists for the same location and URL');
      }

      const createdWebhook = await this.webhookModel.create(createWebhookDto);

      this.logger.info(`Webhook created: ${JSON.stringify(createdWebhook)}`);

      return createdWebhook;
    } catch (error) {
      this.logger.error(`Error in createWebhook: ${error.message}`);
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

      this.logger.info(
        `Retrieved webhooks for ${city}, ${country}: ${JSON.stringify(
          webhooks,
        )}`,
      );

      return webhooks;
    } catch (error) {
      this.logger.error(
        `Error in getWebhooks for ${city}, ${country}: ${error.message}`,
      );
      throw error;
    }
  }
}
