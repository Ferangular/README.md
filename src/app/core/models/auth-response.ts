export class AuthResponse {
  private _accessToken: string;
  private _refreshToken: string;
  private _expiresIn: number;
  private _userId: string;
  private _userName: string;
  private _email: string;

  constructor(
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    userId: string,
    userName: string,
    email: string
  ) {
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
    this._expiresIn = expiresIn;
    this._userId = userId;
    this._userName = userName;
    this._email = email;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  get expiresIn(): number {
    return this._expiresIn;
  }

  get userId(): string {
    return this._userId;
  }

  get userName(): string {
    return this._userName;
  }

  get email(): string {
    return this._email;
  }
}
