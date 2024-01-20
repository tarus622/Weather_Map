import { Injectable } from '@nestjs/common';
import { fetchData } from './helpers/api';
import { LocationRepository } from './repositories/location.repository';

@Injectable()
export class AppService {
  constructor(private locationRepository: LocationRepository) {}
  async getWeather(city: string, country: string) {
    try {
      const response = await fetchData(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${process.env.API_KEY}`,
      );

      this.locationRepository.createLocationWeatherData({
        city,
        country,
        requestDate: new Date().toISOString(),
        weatherData: response,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}
