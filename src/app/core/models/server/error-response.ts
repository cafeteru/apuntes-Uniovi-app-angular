/**
 * Represent an error response from the server
 */
export interface ErrorResponse {
  headers: Headers;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: Error;
}

/**
 * Message error from an error response
 */
interface Error {
  error: string;
}

/**
 * Headers from a error response
 */
interface Headers {
  normalizedNames: {};
  lazyUpdate: null;
}
