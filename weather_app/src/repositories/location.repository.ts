import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Location } from '../schemas/location.schema';
import { Model } from 'mongoose';
import { CreateLocationDto } from '../dtos/create-location.dto';
import { RequestHistoryHelper } from '../helpers/request-history';

@Injectable()
export class LocationRepository {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
    private requestHistoryHelper: RequestHistoryHelper,
  ) {}

  async createLocationWeatherData(
    createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    try {
      const createdLocationWeather = await this.locationModel.create(
        createLocationDto,
      );

      return createdLocationWeather;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRequestsHistory() {
    try {
      const requestsHistory =
        await this.requestHistoryHelper.findRequestHistory();

      return requestsHistory;
    } catch (error) {
      throw error;
    }
  }
}
