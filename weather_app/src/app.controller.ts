import { Controller, Body, Get, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateWebhookDto } from './dtos/create-webhook.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/weather/:city/:country')
  getWeather(@Param('city') city: string, @Param('country') country: string) {
    const formattedCity =
      city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

    return this.appService.getWeather(formattedCity, country.toLowerCase());
  }

  @Get('/history')
  getWeatherHistory() {
    return this.appService.getWeatherHistory();
  }

  @Post('/webhook')
  postWebhook(@Body() createWebhookDto: CreateWebhookDto) {
    // Capitalize the first letter and make the rest of the word lowercase for the city property
    const formattedCity =
      createWebhookDto.city.charAt(0).toUpperCase() +
      createWebhookDto.city.slice(1).toLowerCase();

    return this.appService.createWebhook({
      city: formattedCity,
      country: createWebhookDto.country.toLowerCase(),
      webhookURL: createWebhookDto.webhookURL,
    });
  }
}
