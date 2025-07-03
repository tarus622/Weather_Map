import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Location } from '../schemas/location.schema';
import { Model } from 'mongoose';
import { CreateLocationDto } from '../dtos/create-location.dto';
import { RequestHistoryHelper } from '../helpers/request-history';
import { LocationRepositoryLoggerService } from '../../logging/logger/logger.service';

@Injectable()
export class LocationRepository {
  private readonly logger = new LocationRepositoryLoggerService();

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

      this.logger.info(
        `Location weather data created: ${JSON.stringify(
          createdLocationWeather,
        )}`,
      );

      return createdLocationWeather;
    } catch (error) {
      this.logger.error(`Error in createLocationWeatherData: ${error.message}`);

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

      this.logger.info(
        `Successfully retrieved request history: ${JSON.stringify(
          requestsHistory,
        )}`,
      );

      return requestsHistory;
    } catch (error) {
      this.logger.error(`Error in getRequestsHistory: ${error.message}`);
      throw error;
    }
  }
}
