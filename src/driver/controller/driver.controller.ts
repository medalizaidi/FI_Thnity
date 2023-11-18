import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { DriverService } from '../service/driver.service';
import { Driver } from '../models/driver.interface';
import { Observable } from 'rxjs';

@Controller('driver')
export class DriverController {
  constructor(private driverService: DriverService) {}
  @Post('add')
  addtrajectoire(@Body() driver: Driver): Observable<Driver> {
    return this.driverService.addtraject(driver);
  }
  @Get()
  findAll(): Observable<Driver[]> {
    return this.driverService.findAll();
  }
  @Post('find')
  search(@Body() driver: Driver): Observable<any> {
    return this.driverService.findtraject(driver);
  }
  @Post('byid')
  findbyid(@Body('id') id: number): Observable<any> {
    return this.driverService.findbyId(id);
  }
  @Delete(':id')
  deleteone(@Param('id') id: number): Observable<any> {
    return this.driverService.deleteone(id);
  }
  @Put(':id')
  updatetrajet(
    @Param('id') id: number,
    @Body() driver: Driver,
  ): Observable<any> {
    return this.driverService.Updatetrajet(id, driver);
  }
}
