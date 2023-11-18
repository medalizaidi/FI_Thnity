import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { User } from 'src/user/models/user.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(private readonly jwtservices: JwtService) {}
  generateJWT(user: User): Observable<string> {
    return from(this.jwtservices.signAsync({ user }));
  }
  hashpassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }
  comparepassword(newpass: string, hachpass: string): Observable<boolean> {
    return of<boolean>(bcrypt.compare(newpass, hachpass));
  }
}
