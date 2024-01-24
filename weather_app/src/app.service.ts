import { Injectable, Logger } from '@nestjs/common';
import { fetchData } from './helpers/api';
import { sendPostRequestsToWebhooks } from './helpers/api';
import { LocationRepository } from './repositories/location.repository';
import { WebhookRepository } from './repositories/webhook.repository';
import { CreateWebhookDto } from './dtos/create-webhook.dto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private locationRepository: LocationRepository,
    private webhookRepository: WebhookRepository,
  ) {}
  async getWeather(city: string, country: string) {
    try {
      const response = await fetchData(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${process.env.API_KEY}`,
      );

      const webhooks = await this.getWebhooks(city, country);

      this.logger.log(`Weather request for ${city}, ${country}`);

      if (response) {
        this.locationRepository.createLocationWeatherData({
          city,
          country,
          requestDate: new Date().toISOString(),
          weatherData: response,
        });

        if (webhooks.length > 0) {
          this.logger.log(
            `Sending post requests to ${webhooks.length} webhooks`,
          );

          await sendPostRequestsToWebhooks(webhooks);
        }

        this.logger.log(
          `Location weather data created for ${city}, ${country}`,
        );
      }

      return response;
    } catch (error) {
      this.logger.error(
        `Error in getWeather for ${city}, ${country}: ${error.message}`,
      );

      throw error;
    }
  }

  getWeatherHistory() {
    try {
      const response = this.locationRepository.getRequestsHistory();

      this.logger.log('Webhook created');

      return response;
    } catch (error) {
      throw error;
    }
  }

  createWebhook(createWebhookDto: CreateWebhookDto) {
    try {
      const response = this.webhookRepository.createWebhook(createWebhookDto);

      this.logger.log('Getting weather history');

      return response;
    } catch (error) {
      this.logger.error(`Error in createWebhook: ${error.message}`);

      throw error;
    }
  }

  getWebhooks(city: string, country: string) {
    try {
      const response = this.webhookRepository.getWebhooks(city, country);

      this.logger.log(`Getting webhooks for ${city}, ${country}`);

      return response;
    } catch (error) {
      this.logger.error(
        `Error in getWebhooks for ${city}, ${country}: ${error.message}`,
      );

      throw error;
    }
  }
}
