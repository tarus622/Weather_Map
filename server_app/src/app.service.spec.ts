import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { NotFoundException } from '@nestjs/common';
import { fetchData } from './helpers/api';

jest.mock('./helpers/api');

describe('AppService', () => {
  let appService: AppService;

  it('Can create an instance of AppService', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);

    expect(appService).toBeDefined();
  });

  it('Must return json with correct data when fetchData is called', async () => {
    // Arrange
    const city = 'London';
    const country = 'uk';
    const expectedResult = {
      coord: {
        lon: 31.2497,
        lat: 30.0626,
      },
      city: 'London',
    };

    (fetchData as jest.Mock).mockReturnValue({
      coord: {
        lon: 31.2497,
        lat: 30.0626,
      },
      city: 'London',
    });

    // Act
    const data = await appService.getWeather(city, country);

    // Assert
    expect(data).toEqual(expectedResult);
  });
});
