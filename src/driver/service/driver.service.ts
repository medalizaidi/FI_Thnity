import { Injectable } from '@nestjs/common';
import { DriverEntity } from '../models/driver.entity';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './../models/driver.interface';
import { AuthService } from 'src/auth/auth.service';
import { Observable, from, map } from 'rxjs';
import { MoreThanOrEqual } from 'typeorm';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(DriverEntity)
    private readonly driverRepository: Repository<DriverEntity>,
    private authservice: AuthService,
  ) {}
  addtraject(driver: Driver): Observable<Driver> {
    return from(this.driverRepository.save(driver));
  }
  findtraject(driver: Driver): Observable<Driver[]> {
    return from(
      this.driverRepository.find({
        where: {
          departure: driver.departure,
          destination: driver.destination,
          date: driver.date,
          nbredeplace: MoreThanOrEqual(driver.nbredeplace),
        },
      }),
    );
  }
  findAll(): Observable<Driver[]> {
    return from(this.driverRepository.find());
  }
  findbyId(id: number): Observable<Driver[]> {
    console.log(id);
    return from(this.driverRepository.find({ where: { iddriver: Equal(id) } }));
  }
  deleteone(id: number): Observable<any> {
    return from(this.driverRepository.delete(id));
  }
  Updatetrajet(id: number, driver: Driver): Observable<any> {
    return from(this.driverRepository.update(id, driver));
  }
}
