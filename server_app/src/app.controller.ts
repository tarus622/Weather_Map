import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/weather/:city/:country')
  getWeather(@Param('city') city: string, @Param('country') country: string) {
    return this.appService.getWeather(city, country);
  }

  @Get('/history')
  getWeatherHistory() {
    return this.appService.getWeatherHistory();
  }
}
