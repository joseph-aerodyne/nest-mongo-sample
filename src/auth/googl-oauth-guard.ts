import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleAuthGuard extends PassportStrategy(Strategy, 'google') {
  constructor(
  ) {
    super({
      clientID: process.env.clientID,
      clientSecret: process.env.SECRET_KEY,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName}`,
      password:'test@123',
      age: 19,
      city:'Kanyakumari',
      role:'user',
      picture: photos[0].value,
    };
    done(null, user);
  }
}