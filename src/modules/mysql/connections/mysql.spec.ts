import { Test, TestingModule } from '@nestjs/testing';
import { Mysql } from './mysql';

describe('Mysql', () => {
  let provider: Mysql;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Mysql],
    }).compile();

    provider = module.get<Mysql>(Mysql);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
