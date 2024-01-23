import { Test, TestingModule } from '@nestjs/testing';
import { LocationRepository } from '../repositories/location.repository';
import { Location, LocationDocument } from '../schemas/location.schema';
import { RequestHistoryHelper } from '../helpers/request-history';
import { getModelToken } from '@nestjs/mongoose';
import { CreateLocationDto } from '../dtos/create-location.dto';
import * as mongoose from 'mongoose';

describe('LocationRepository', () => {
  let locationRepository: LocationRepository;
  let requestHistoryHelper: RequestHistoryHelper;
  let locationModel: mongoose.Model<LocationDocument>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        LocationRepository,
        RequestHistoryHelper,
        {
          provide: getModelToken(Location.name),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    locationRepository = app.get<LocationRepository>(LocationRepository);
    requestHistoryHelper = app.get<RequestHistoryHelper>(RequestHistoryHelper);
    locationModel = app.get(getModelToken(Location.name));

    requestHistoryHelper.findRequestHistory = jest.fn();
  });

  describe('createLocationWeatherData', () => {
    const createLocationDto: CreateLocationDto = {
      city: 'Fortaleza',
      country: 'br',
      requestDate: '2024-01-20T18:05:47.573Z',
      weatherData: {
        coord: {
          lon: -38.5247,
          lat: -3.7227,
        },
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d',
          },
        ],
        base: 'stations',
        main: {
          temp: 305.13,
          feels_like: 312.13,
          temp_min: 302.71,
          temp_max: 305.97,
          pressure: 1010,
          humidity: 72,
        },
        visibility: 10000,
        wind: {
          speed: 5.14,
          deg: 80,
        },
        clouds: {
          all: 20,
        },
        dt: 1705774216,
        sys: {
          type: 2,
          id: 2089363,
          country: 'BR',
          sunrise: 1705739743,
          sunset: 1705784028,
        },
        timezone: -10800,
        id: 6320062,
        name: 'Fortaleza',
        cod: 200,
      },
    };
    it('Should call call create function of locationModel with correct data', async () => {
      // Act
      await locationRepository.createLocationWeatherData(createLocationDto);

      // Assert
      expect(locationModel.create).toBeCalledWith(createLocationDto);
    });

    it('Should return the data created', async () => {
      // Arrange
      locationModel.create = jest.fn().mockResolvedValue(createLocationDto);

      // Act
      const data = await locationRepository.createLocationWeatherData(
        createLocationDto,
      );

      // Assert
      expect(data).toEqual(createLocationDto);
    });

    it('Should return an error if locationModel.create throws it', async () => {
      // Arrange
      locationModel.create = jest.fn().mockResolvedValue(() => {
        throw new Error('Simulate error');
      });

      // Act & Assert
      await expect(
        locationRepository.createLocationWeatherData(createLocationDto),
      ).resolves.toThrow();
    });
  });

  describe('getRequestHistory', () => {
    it('Should call findRequestHistory function of requestHistoryHelper with correct data', async () => {
      // Act
      await locationRepository.getRequestsHistory();

      // Assert
      expect(requestHistoryHelper.findRequestHistory).toBeCalled();
    });

    it('Should return the list of requests history', async () => {
      // Arrange
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
      (requestHistoryHelper.findRequestHistory as jest.Mock).mockReturnValue(
        expectedResult,
      );

      // Act
      const data = await locationRepository.getRequestsHistory();

      // Assert
      expect(data).toEqual(expectedResult);
    });

    it('Must throw an error when requestHistoryHelper.findRequestHistory throws it', async () => {
      // Arrange
      const expectedError = new Error('Invalid request');

      (requestHistoryHelper.findRequestHistory as jest.Mock).mockImplementation(
        () => {
          throw expectedError;
        },
      );

      // Act and Assert
      expect(locationRepository.getRequestsHistory()).rejects.toThrow(
        expectedError,
      );
    });
  });
});
