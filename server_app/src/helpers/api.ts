import { NotFoundException } from '@nestjs/common';

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
