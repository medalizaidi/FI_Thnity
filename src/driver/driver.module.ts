import { Module } from '@nestjs/common';
import { DriverService } from './service/driver.service';
import { DriverController } from './controller/driver.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from './models/driver.entity';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([DriverEntity]), UserModule],
  providers: [DriverService],
  controllers: [DriverController],
})
export class DriverModule {}
