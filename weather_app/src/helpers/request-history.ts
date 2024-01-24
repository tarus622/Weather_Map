import { InjectModel } from '@nestjs/mongoose';
import { Location } from '../schemas/location.schema';
import { Model } from 'mongoose';

export class RequestHistoryHelper {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
  ) {}

  async findRequestHistory() {
    try {
      const data = await this.locationModel.find().select('-_id -__v').exec();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
