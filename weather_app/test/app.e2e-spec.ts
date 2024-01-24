import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { AppService } from '../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const appService = {
    getWeather: () => {
      return {
        test: 'test',
      };
    },
    getWeatherHistory: () => ['test'],
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useValue(appService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/weather/:city/:country (GET)', () => {
    // Arrange
    const city = 'London';
    const country = 'uk';
    const expectedResult = {
      test: 'test',
    };

    return request(app.getHttpServer())
      .get(`/weather/${city}/${country}`)
      .expect(200)
      .expect(expectedResult);
  });

  it('/history (GET)', () => {
    // Arrange
    const expectedResult = ['test'];

    return request(app.getHttpServer())
      .get(`/history`)
      .expect(200)
      .expect(expectedResult);
  });
});
