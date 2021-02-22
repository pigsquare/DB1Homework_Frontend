import { User } from './user';

export class AuthTokenResponse {
  token: string;
  expiration: number;
  name: string;
  id: string;
  role: string;
}
