import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModel } from './database.model';
import { Mysql } from '../connections/mysql';

describe('DatabaseModel', () => {
  let provider: DatabaseModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Mysql, DatabaseModel],
    }).compile();

    provider = module.get<DatabaseModel>(DatabaseModel);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});import { from } from 'rxjs';

