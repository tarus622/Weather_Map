import { Injectable } from '@nestjs/common';
import { fetchData } from './helpers/api';
import { LocationRepository } from './repositories/location.repository';

@Injectable()
export class AppService {
  constructor(private locationRepository: LocationRepository) {}
  async getWeather(city: string, country: string) {
    try {
      // Fetch data from the API
      const response = await fetchData(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${process.env.API_KEY}`,
      );

      // If successful, store data in the repository
      this.locationRepository.createLocationWeatherData({
        city,
        country,
        requestDate: new Date().toISOString(),
        weatherData: response,
      });

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
}
