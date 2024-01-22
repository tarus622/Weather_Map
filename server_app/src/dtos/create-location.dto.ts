import { ApiProperty } from '@nestjs/swagger';
import { WeatherData } from '../interfaces/weather-data.interface';

export class CreateLocationDto {
  @ApiProperty({ required: true })
  city: string;

  @ApiProperty({ required: true })
  country: string;

  @ApiProperty({ required: true })
  requestDate: string;

  @ApiProperty({ required: true })
  weatherData: WeatherData;
}
