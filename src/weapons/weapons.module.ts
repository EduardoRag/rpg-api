import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weapon } from './entities/weapon.entity';
import { WeaponsController } from './weapons.controller';
import { WeaponsService } from './weapons.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Weapon])
  ],
  controllers: [WeaponsController],
  providers: [WeaponsService],
})
export class WeaponsModule { }