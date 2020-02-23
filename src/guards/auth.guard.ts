import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN } from '../config/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let req = context.switchToHttp().getRequest();
    console.log('[AuthGuard][canActivate] req: ', req.body, req.query, req.params, req.headers);

    if (req.headers['access-token'] === ACCESS_TOKEN) {
      return true;
    }
    return false;
  }
}
