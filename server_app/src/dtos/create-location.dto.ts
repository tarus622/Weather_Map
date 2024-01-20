import { IsNotEmpty } from 'class-validator';
import { WeatherData } from '../interfaces/weather-data.interface';

export class CreateLocationDto {
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  requestDate: string;

  @IsNotEmpty()
  weatherData: WeatherData;
}
