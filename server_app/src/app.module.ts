import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Location, LocationSchema } from './schemas/location.schema';
import { LocationRepository } from './repositories/location.repository';

const options = {
  path: '.env',
};

dotenv.config(options);

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, LocationRepository],
})
export class AppModule {}
