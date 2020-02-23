import { TokenAuthGuard, AccessTokenAuthGuard } from './auth.guard';
import { Mysql } from 'src/modules/mysql/connections/mysql';

describe('TokenAuthGuard', () => {
  it('should be defined', () => {
    expect(new TokenAuthGuard(new Mysql())).toBeDefined();
  });
});

describe('AccessTokenAuthGuard', () => {
  it('should be defined', () => {
    expect(new AccessTokenAuthGuard()).toBeDefined();
  });
});
