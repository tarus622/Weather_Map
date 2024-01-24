import { Test, TestingModule } from '@nestjs/testing';
import { WebhookRepository } from '../repositories/webhook.repository';
import { Webhook, WebhookDocument } from '../schemas/webhooks.schema';
import { getModelToken } from '@nestjs/mongoose';
import { CreateWebhookDto } from '../dtos/create-webhook.dto';
import * as mongoose from 'mongoose';

describe('WebhookRepository', () => {
  let webhookRepository: WebhookRepository;
  let webhookModel: mongoose.Model<WebhookDocument>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        WebhookRepository,
        {
          provide: getModelToken(Webhook.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn().mockImplementation(() => []),
          },
        },
      ],
    }).compile();

    webhookRepository = app.get<WebhookRepository>(WebhookRepository);
    webhookModel = app.get(getModelToken(Webhook.name));
  });

  it('Can create an instance of WebhookRepository', () => {
    // Assert
    expect(WebhookRepository).toBeDefined();
  });

  describe('createWebhook', () => {
    const createWebhookDto: CreateWebhookDto = {
      city: 'London',
      country: 'uk',
      webhookURL: 'www.testurl.com',
    };
    it('Should call create a function of webhookModel with correct data', async () => {
      // Act
      await webhookRepository.createWebhook(createWebhookDto);

      // Assert
      expect(webhookModel.create).toHaveBeenCalledWith(createWebhookDto);
    });

    it('Should return the data created', async () => {
      // Arrange
      webhookModel.create = jest.fn().mockResolvedValue(createWebhookDto);

      // Act
      const data = await webhookRepository.createWebhook(createWebhookDto);

      // Assert
      expect(data).toEqual(createWebhookDto);
    });

    it('Should return an error if webhookModel.create throws it', async () => {
      // Arrange
      webhookModel.create = jest.fn().mockResolvedValue(() => {
        throw new Error('Simulate error');
      });

      // Act & Assert
      await expect(
        webhookRepository.createWebhook(createWebhookDto),
      ).resolves.toThrow('Simulate error');
    });
  });

  describe('getWebhooks', () => {
    it('Should call find function of webhookModel with correct data', async () => {
      // Assert
      const city = 'London';
      const country = 'uk';

      // Act
      await webhookRepository.getWebhooks(city, country);

      // Assert
      expect(webhookModel.find).toBeCalledWith({ city, country });
    });

    it('Should return the list of webHooks', async () => {
      // Arrange
      const city = 'London';
      const country = 'uk';
      const expectedResult = [
        {
          city: 'London',
          country: 'uk',
          webhookURL: 'https://example.com/webhook-endpoint',
        },
        {
          city: 'London',
          country: 'uk',
          webhookURL: 'https://test.com/webhook',
        },
      ];

      (webhookModel.find as jest.Mock).mockReturnValue(expectedResult);

      // Act
      const data = await webhookRepository.getWebhooks(city, country);

      // Assert
      expect(data).toEqual(expectedResult);
    });

    it('Must throw an error when webhookModel throws it', async () => {
      // Arrange
      const city = 'London';
      const country = 'uk';
      const expectedError = new Error('Invalid request');

      (webhookModel.find as jest.Mock).mockImplementation(() => {
        throw expectedError;
      });

      // Act and Assert
      expect(webhookRepository.getWebhooks(city, country)).rejects.toThrow(
        expectedError,
      );
    });
  });
});
