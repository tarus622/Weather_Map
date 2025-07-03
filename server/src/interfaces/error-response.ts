export interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string | { message: string };
}
