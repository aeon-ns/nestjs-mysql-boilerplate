import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Mysql } from 'src/modules/mysql/connections/mysql';
import { ACCESS_TOKEN } from '../../../config/constants';


@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(private db:Mysql) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let req = context.switchToHttp().getRequest();
    return [req.body['token'], req.headers['token'], req.query['token']].includes(ACCESS_TOKEN);
  }
}


@Injectable()
export class AccessTokenAuthGuard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let req = context.switchToHttp().getRequest();
    return [req.body['access-token'], req.headers['access-token']].includes(ACCESS_TOKEN);
  }
}
