import { Injectable } from '@nestjs/common';
import { fetchData } from './helpers/api';
import { sendPostRequestsToWebhooks } from './helpers/api';
import { LocationRepository } from './repositories/location.repository';
import { WebhookRepository } from './repositories/webhook.repository';
import { CreateWebhookDto } from './dtos/create-webhook.dto';

@Injectable()
export class AppService {
  constructor(
    private locationRepository: LocationRepository,
    private webhookRepository: WebhookRepository,
  ) {}
  async getWeather(city: string, country: string) {
    try {
      // Fetch data from the API
      const response = await fetchData(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${process.env.API_KEY}`,
      );

      const webhooks = await this.webhookRepository.getWebhooks(city, country);
      if (webhooks.length > 0) {
        await sendPostRequestsToWebhooks(webhooks);
      }

      if (response) {
        // If successful, store data in the repository
        this.getWebhooks(city, country);

        this.locationRepository.createLocationWeatherData({
          city,
          country,
          requestDate: new Date().toISOString(),
          weatherData: response,
        });
      }

      // Return the response
      return response;
    } catch (error) {
      // If an error occurs during data fetching, rethrow the same error
      throw error;
    }
  }

  getWeatherHistory() {
    try {
      const response = this.locationRepository.getRequestsHistory();
      return response;
    } catch (error) {
      throw error;
    }
  }

  createWebhook(createWebhookDto: CreateWebhookDto) {
    try {
      const response = this.webhookRepository.createWebhook(createWebhookDto);
      return response;
    } catch (error) {
      throw error;
    }
  }

  getWebhooks(city: string, country: string) {
    try {
      const response = this.webhookRepository.getWebhooks(city, country);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
