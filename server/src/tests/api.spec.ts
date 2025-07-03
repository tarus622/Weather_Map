import { fetchData, sendPostRequestsToWebhooks } from '../helpers/api';

describe('fetchData', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Must throw a 404 error if result is not found', async () => {
    // Arrange
    const url = 'testurl.com';
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response);

    // Act && Assert
    await expect(() => fetchData(url)).rejects.toThrow(
      'Weather API request failed: city not found. Status: 404',
    );
  });

  it('Must throw a 401 error if response is unauthorized', async () => {
    // Arrange
    const url = 'testurl.com';
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({}),
    } as Response);

    // Act && Assert
    await expect(() => fetchData(url)).rejects.toThrow(
      'Weather API request failed: API key not valid. Status: 401',
    );
  });

  it('Must return a response', async () => {
    // Arrange
    const url = 'testurl.com';
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as Response);

    // Act && Assert
    await expect(fetchData(url)).resolves.toEqual({});
  });
});

describe('sendPostRequestsToWebhooks', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should process all POST requests successfully', async () => {
    // Arrange
    const webhooks = [
      {
        city: 'London',
        country: 'uk',
        webhookURL: 'https://example.com/webhook1',
      },
      {
        city: 'Paris',
        country: 'fr',
        webhookURL: 'https://example.com/webhook2',
      },
    ];

    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as Response);

    // Act
    await sendPostRequestsToWebhooks(webhooks);

    // Assert
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenCalledWith('https://example.com/webhook1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhooks[0]),
    });
    expect(fetchSpy).toHaveBeenCalledWith('https://example.com/webhook2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhooks[1]),
    });
  });
});
