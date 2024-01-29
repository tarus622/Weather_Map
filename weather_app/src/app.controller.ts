import { Controller, Body, Get, Post, Param, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateWebhookDto } from './dtos/create-webhook.dto';
import { GetWeatherDto } from './dtos/get-weather.dto';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AppControllerLoggerService } from '../logging/logger/logger.service';

@Controller()
@UseFilters(HttpExceptionFilter)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly loggerService: AppControllerLoggerService,
  ) {}

  @Get('/weather/:city/:country')
  async getWeather(@Param() params: GetWeatherDto) {
    const formattedCity =
      params.city.charAt(0).toUpperCase() + params.city.slice(1).toLowerCase();
    const result = await this.appService.getWeather(
      formattedCity,
      params.country.toLowerCase(),
    );

    this.loggerService.info(
      {
        message: 'Weather request successful',
        city: formattedCity,
        country: params.country,
      },
      AppController.name,
    );

    return result;
  }

  @Get('/history')
  async getWeatherHistory() {
    const result = await this.appService.getWeatherHistory();

    this.loggerService.info(
      {
        message: 'Successfully retrieved request history',
      },
      AppController.name,
    );

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

    this.loggerService.info('Successfully created webhook');
    this.loggerService.info('Successfully created webhook');

    return result;
  }
}
