import { Controller, Body, Get, Post, Param, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateWebhookDto } from './dtos/create-webhook.dto';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get('/weather/:city/:country')
  async getWeather(
    @Param('city') city: string,
    @Param('country') country: string,
  ) {
    const formattedCity =
      city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

    try {
      const result = await this.appService.getWeather(
        formattedCity,
        country.toLowerCase(),
      );

      this.logger.log(
        `Successfully retrieved weather for ${formattedCity}, ${country}`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `Error in getWeather for ${formattedCity}, ${country}: ${error.message}`,
      );
      throw error;
    }
  }

  @Get('/history')
  async getWeatherHistory() {
    try {
      const result = await this.appService.getWeatherHistory();

      this.logger.log('Successfully retrieved weather history');

      return result;
    } catch (error) {
      this.logger.error(`Error in getWeatherHistory: ${error.message}`);
      throw error;
    }
  }

  @Post('/webhook')
  async postWebhook(@Body() createWebhookDto: CreateWebhookDto) {
    try {
      const formattedCity =
        createWebhookDto.city.charAt(0).toUpperCase() +
        createWebhookDto.city.slice(1).toLowerCase();

      const result = await this.appService.createWebhook({
        city: formattedCity,
        country: createWebhookDto.country.toLowerCase(),
        webhookURL: createWebhookDto.webhookURL,
      });

      this.logger.log('Successfully created webhook');

      return result;
    } catch (error) {
      this.logger.error(`Error in postWebhook: ${error.message}`);
      throw error;
    }
  }
}
