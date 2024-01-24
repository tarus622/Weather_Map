import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Location } from '../schemas/location.schema';
import { Model } from 'mongoose';

@Injectable()
export class RequestHistoryHelper {
  private readonly logger = new Logger(RequestHistoryHelper.name);

  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
  ) {}

  async findRequestHistory() {
    try {
      this.logger.log('Retrieving request history');

      const data = await this.locationModel.find().select('-_id -__v').exec();

      this.logger.log(
        `Successfully retrieved request history: ${JSON.stringify(data)}`,
      );

      return data;
    } catch (error) {
      this.logger.error(`Error in findRequestHistory: ${error.message}`);
      throw error;
    }
  }
}
