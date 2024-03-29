import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { LocationRepository } from '../repositories/location.repository';
import { WebhookRepository } from '../repositories/webhook.repository';
import { RequestHistoryHelper } from '../helpers/request-history';
import { Location } from '../schemas/location.schema';
import { Webhook } from '../schemas/webhooks.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetWeatherDto } from '../dtos/get-weather.dto';
import { LoggerModule } from '../../logging/logger.module';
import { AppControllerLoggerService } from '../../logging/logger/logger.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      controllers: [AppController],
      providers: [
        AppService,
        LocationRepository,
        WebhookRepository,
        RequestHistoryHelper,
        AppControllerLoggerService,
        {
          provide: getModelToken(Location.name),
          useValue: Model,
        },
        { provide: getModelToken(Webhook.name), useValue: Model },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);

    appService.getWeather = jest.fn();
    appService.getWeatherHistory = jest.fn();
  });

  it('Can create an instance of AppController', () => {
    // Assert
    expect(AppController).toBeDefined();
  });

  describe('getWeather', () => {
    it('Must return json with correct data when fetchData is called inside getWeather function', async () => {
      // Arrange
      const getWeatherDto: GetWeatherDto = {
        city: 'London',
        country: 'uk',
      };
      const expectedResult = {
        coord: {
          lon: 31.2497,
          lat: 30.0626,
        },
        city: 'London',
      };

      // Act
      (appService.getWeather as jest.Mock).mockReturnValue(expectedResult);

      // Assert
      expect(await appController.getWeather(getWeatherDto)).toEqual(
        expectedResult,
      );
    });

    it('Must throw an error when appService.getWeather throws it', async () => {
      // Arrange
      const city = 'London';
      const country = 'uk';
      const expectedError = new Error('An error occurred during data fetching');

      (appService.getWeather as jest.Mock).mockImplementation(() => {
        throw expectedError;
      });

      // Act and Assert
      expect(() => appService.getWeather(city, country)).toThrow(expectedError);
    });
  });

  describe('getWeatherHistory', () => {
    it('Should call getWeatherHistory of appService', () => {
      // Act
      appController.getWeatherHistory();

      // Assert
      expect(appService.getWeatherHistory).toBeCalled();
    });

    it('Should return the list of requests history', async () => {
      // Assert
      const expectedResult = [
        {
          city: 'Cairo',
          country: 'eg',
          requestDate: '2024-01-20T18:03:47.573Z',
          weatherData: {},
        },
        {
          city: 'Fortaleza',
          country: 'br',
          requestDate: '2024-01-20T18:05:47.573Z',
          weatherData: {},
        },
      ];
      (appService.getWeatherHistory as jest.Mock).mockReturnValue(
        expectedResult,
      );

      // Act
      const data = await appController.getWeatherHistory();

      expect(data).toEqual(expectedResult);
    });

    it('Must throw an error when appService.getWeatherHistory throws it', async () => {
      // Arrange
      const expectedError = new Error('Invalid request');

      (appService.getWeatherHistory as jest.Mock).mockImplementation(() => {
        throw expectedError;
      });

      // Act and Assert
      expect(() => appService.getWeatherHistory()).toThrow('Invalid request');
    });
  });
});
