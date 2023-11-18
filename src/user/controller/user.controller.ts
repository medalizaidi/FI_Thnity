import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../models/user.interface';
import { Observable, catchError, map, of } from 'rxjs';
import { get } from 'http';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('create')
  create(@Body() user: User): Observable<User | object> {
    return this.userService.create(user).pipe(
      map((user: User) => user),
      catchError((err) => of({ error: err.message })),
    );
  }
  /*   @Post('test')
  test(@Body() user: User): boolean {
    return this.userService.test(user);
  } */
  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findall();
  }
  @Post('find')
  findone(@Body() email: User): Observable<any> {
    return this.userService.findOne(email);
  }
  @Post('login')
  async login(@Body() user: User) {
    const aa = await this.userService.login(user);
    console.log(aa);
    if (aa === 'wrong') {
      console.log('false');
    } else {
      return aa.pipe(
        map((jwt: string) => {
          return { access_token: jwt };
        }),
      );
    }
  }
  @Get(':em')
  findByemail(@Param() Params) {
    // return this.userService.findByEmail(Params.em);
  }
  @Post('test')
  validateuser(@Body() user: User) {
    return this.userService.ValidateUser(user.email, user.password);
  }
}
