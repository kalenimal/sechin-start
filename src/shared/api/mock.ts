/** Emulates network latency for mock API calls until the backend exists. */
export const delay = (ms = 400) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status = 400,
  ) {
    super(message);
  }
}

export async function mockRequest<T>(resolver: () => T, ms?: number): Promise<T> {
  await delay(ms);
  return structuredClone(resolver());
}
