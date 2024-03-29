import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { LocationRepository } from '../repositories/location.repository';
import { WebhookRepository } from '../repositories/webhook.repository';
import { Location } from '../schemas/location.schema';
import { Webhook } from '../schemas/webhooks.schema';
import { RequestHistoryHelper } from '../helpers/request-history';
import { fetchData } from '../helpers/api';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

jest.mock('../helpers/api');

describe('AppService', () => {
  let appService: AppService;
  let locationRepository: LocationRepository;
  let webhookRepository: WebhookRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        LocationRepository,
        WebhookRepository,
        RequestHistoryHelper,
        { provide: getModelToken(Location.name), useValue: Model },
        { provide: getModelToken(Webhook.name), useValue: Model },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    locationRepository = module.get<LocationRepository>(LocationRepository);
    webhookRepository = module.get<WebhookRepository>(WebhookRepository);

    locationRepository.createLocationWeatherData = jest.fn();
    locationRepository.getRequestsHistory = jest.fn();

    webhookRepository.createWebhook = jest.fn();
    webhookRepository.getWebhooks = jest.fn();
  });

  it('Can create an instance of AppService', () => {
    expect(appService).toBeDefined();
  });

  describe('getWeather', () => {
    it('Must return json with correct data when fetchData is called inside getWeather function', async () => {
      // Arrange
      webhookRepository.getWebhooks = jest
        .fn()
        .mockImplementation(() => [{}, {}]);
      const city = 'London';
      const country = 'uk';
      const expectedResult = {
        coord: {
          lon: 31.2497,
          lat: 30.0626,
        },
        city: 'London',
      };

      (fetchData as jest.Mock).mockReturnValue(expectedResult);

      // Act
      const data = await appService.getWeather(city, country);

      // Assert
      expect(data).toEqual(expectedResult);
    });

    it('Must throw an error when fetchData throws it', async () => {
      // Arrange
      const city = 'London';
      const country = 'uk';
      const expectedError = new Error('An error occurred during data fetching');

      (fetchData as jest.Mock).mockImplementation(() => {
        throw expectedError;
      });

      // Act and Assert
      await expect(appService.getWeather(city, country)).rejects.toThrow(
        expectedError,
      );
    });
  });

  describe('getWeatherHistory', () => {
    it('Should call getRequestsHistory of locationRepository', () => {
      // Act
      appService.getWeatherHistory();

      // Assert
      expect(locationRepository.getRequestsHistory).toBeCalled();
    });

    it('Should return the list of requests history', () => {
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
      (locationRepository.getRequestsHistory as jest.Mock).mockReturnValue(
        expectedResult,
      );

      // Act
      const data = appService.getWeatherHistory();

      expect(data).toEqual(expectedResult);
    });

    it('Must throw an error when locationRepository.getRequestsHistory throws it', async () => {
      // Arrange
      const expectedError = new Error('Invalid request');

      (locationRepository.getRequestsHistory as jest.Mock).mockImplementation(
        () => {
          throw expectedError;
        },
      );

      // Act and Assert
      expect(() => appService.getWeatherHistory()).toThrow(expectedError);
    });
  });
});
