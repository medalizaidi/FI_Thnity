import { Injectable, Param, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { AuthService } from 'src/auth/auth.service';
import { catchError, map, switchMap } from 'rxjs/operators';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authservice: AuthService,
  ) {}
  create(user: User): Observable<User> {
    return this.authservice.hashpassword(user.password).pipe(
      switchMap((passwordhach: string) => {
        const newuser = new UserEntity();
        newuser.admin = user.admin;
        newuser.email = user.email;
        newuser.password = passwordhach;
        newuser.name = user.name;
        return from(this.userRepository.save(newuser)).pipe(
          map((user: User) => {
            const { password, ...result } = user;
            return result;
          }),
        );
      }),
    );
  }
  findOne(user: User): Observable<any> {
    return from(
      this.userRepository.findOne({
        where: { email: user.email },
      }),
    ).pipe(
      map((user: User) => {
        const { password, ...result } = user;
        return result;
      }),
    );
  }
  findall(): Observable<User[]> {
    return from(this.userRepository.find());
  }
  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }
  async ValidateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    const test = await bcrypt.compare(password, user.password);
    if (test) {
      const { password, ...result } = user;
      return result;
    } else {
      return false;
    }
  }
  async login(user: User) {
    const aa = await this.ValidateUser(user.email, user.password);
    console.log(aa);
    if (aa === false) {
      return 'wrong';
    } else {
      return this.authservice.generateJWT(aa).pipe(map((jwt: string) => jwt));
    }
  }
}
