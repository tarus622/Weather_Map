import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Webhook } from '../schemas/webhooks.schema';
import { HelperApiLoggerService } from '../../logging/logger/logger.service';

const logger = new HelperApiLoggerService();

export async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      switch (response.status) {
        case 404:
          logger.error(
            `Weather API request failed: city not found. Status: ${response.status}`,
          );
          throw new NotFoundException(
            `Weather API request failed: city not found. Status: ${response.status}`,
          );

        case 401:
          logger.error(
            `Weather API request failed: API key not valid. Status: ${response.status}`,
          );
          throw new UnauthorizedException(
            `Weather API request failed: API key not valid. Status: ${response.status}`,
          );
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    logger.error(`Error in fetchData: ${error.message}`);
    throw error;
  }
}

export async function sendPostRequestsToWebhooks(
  webhooks: Webhook[],
): Promise<void> {
  try {
    await Promise.all(
      webhooks.map(async (webhook) => {
        await fetch(webhook.webhookURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhook),
        });

        logger.info(
          `POST request to webhook processed successfully: ${JSON.stringify(
            webhook,
          )}`,
        );
      }),
    );

    logger.info('All POST requests to webhooks processed successfully');
  } catch (error) {
    logger.error('Error processing POST requests to webhooks:', error);
  }
}
