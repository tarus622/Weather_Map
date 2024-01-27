import { IsNotEmpty, IsString, Length, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { WeatherData } from '../interfaces/weather-data.interface';

export class CreateLocationDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2, { message: 'country length must be 2 characters' })
  country: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  requestDate: string;

  @ApiProperty({ required: true })
  @IsObject()
  @IsNotEmpty()
  weatherData: WeatherData;
}
