import type { IEvent } from '../models';
import type { ErrorResponse } from './api';

export interface GetEventsSuccessResponse {
  message: string;
  events: IEvent[];
}

export type GetEventsResponse = GetEventsSuccessResponse | ErrorResponse;
