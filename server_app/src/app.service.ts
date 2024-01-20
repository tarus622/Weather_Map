import { Injectable } from '@nestjs/common';
import { fetchData } from './helpers/api';

@Injectable()
export class AppService {
  async getWeather(city: string, country: string) {
    try {
      const response = await fetchData(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${process.env.API_KEY}`,
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}
