import {
  Controller,
  Body,
  Get,
  Post,
  Param,
  Logger,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateWebhookDto } from './dtos/create-webhook.dto';
import { GetWeatherDto } from './dtos/get-weather.dto';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller()
@UseFilters(HttpExceptionFilter)
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get('/weather/:city/:country')
  async getWeather(@Param() params: GetWeatherDto) {
    const formattedCity =
      params.city.charAt(0).toUpperCase() + params.city.slice(1).toLowerCase();

    const result = await this.appService.getWeather(
      formattedCity,
      params.country.toLowerCase(),
    );

    this.logger.log(
      `Successfully retrieved weather for ${formattedCity}, ${params.country}`,
    );

    return result;
  }

  @Get('/history')
  async getWeatherHistory() {
    const result = await this.appService.getWeatherHistory();

    this.logger.log('Successfully retrieved weather history');

    return result;
  }

  @Post('/webhook')
  async postWebhook(@Body() createWebhookDto: CreateWebhookDto) {
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
  }
}
