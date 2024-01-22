import { NotFoundException } from '@nestjs/common';
import { Webhook } from '../schemas/webhooks.schema';

export async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new NotFoundException(
        `Weather API request failed: city not found. Status: ${response.status}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function sendPostRequestsToWebhooks(
  webhooks: Webhook[],
): Promise<void> {
  try {
    // Use Promise.all to wait for all requests to complete
    await Promise.all(
      webhooks.map(async (webhook) => {
        await fetch(webhook.webhookURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhook),
        });
      }),
    );

    console.log('All POST requests to webhooks processed successfully');
  } catch (error) {
    console.error('Error processing POST requests to webhooks:', error);
  }
}
