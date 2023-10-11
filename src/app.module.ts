import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { Character } from './characters/entities/character.entity';
import { ClassesModule } from './classes/classes.module';
import { Class } from './classes/entities/class.entity';
import { Race } from './races/entities/race.entity';
import { RacesModule } from './races/races.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { Weapon } from './weapons/entities/weapon.entity';
import { WeaponsModule } from './weapons/weapons.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Character, Race, Weapon, Class],
      synchronize: true,
      autoLoadEntities: true
    }),
    UserModule,
    CharactersModule,
    RacesModule,
    WeaponsModule,
    ClassesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
