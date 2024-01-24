import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { WeatherData } from '../interfaces/weather-data.interface';

export type LocationDocument = HydratedDocument<Location>;

@Schema()
export class Location {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true, length: 2 })
  country: string;

  @Prop({ required: true })
  requestDate: string;

  @Prop({ required: true, type: Object })
  weatherData: WeatherData;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
