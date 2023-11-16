import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthGuard } from './auth/googl-oauth-guard';


@Module({
  imports: [MongooseModule.forRoot('mongodb://dev-alldb:devroot@172.20.6.22:27017/nest_mongo?authMechanism=DEFAULT&authSource=admin'), UsersModule, AuthModule,
  ConfigModule.forRoot()
],
  controllers: [],
  providers: [GoogleAuthGuard],
})
export class AppModule {}
