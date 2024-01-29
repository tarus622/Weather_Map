import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Location } from '../schemas/location.schema';
import { Model } from 'mongoose';
import { RequestHistoryLoggerService } from '../../logging/logger/logger.service';

@Injectable()
export class RequestHistoryHelper {
  private readonly logger = new RequestHistoryLoggerService();

  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
  ) {}

  async findRequestHistory() {
    try {
      this.logger.info('Retrieving request history');

      const data = await this.locationModel.find().select('-_id -__v').exec();

      this.logger.info(
        `Successfully retrieved request history: ${JSON.stringify(data)}`,
      );

      return data;
    } catch (error) {
      this.logger.error(`Error in findRequestHistory: ${error.message}`);
      throw error;
    }
  }
}
