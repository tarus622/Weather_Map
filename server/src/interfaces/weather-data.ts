import { Clouds } from './clouds';
import { Coord } from './coord';
import { Main } from './main';
import { Sys } from './sys';
import { Weather } from './weather';
import { Wind } from './wind';

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
