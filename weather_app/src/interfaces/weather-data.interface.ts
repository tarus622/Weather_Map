import { Clouds } from './clouds.interface';
import { Coord } from './coord.interface';
import { Main } from './main.interface';
import { Sys } from './sys.interface';
import { Weather } from './weather.interface';
import { Wind } from './wind.interface';

export interface WeatherData {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
