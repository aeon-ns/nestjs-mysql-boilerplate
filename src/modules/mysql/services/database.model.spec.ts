import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModel } from './database.model';

describe('DatabaseModel', () => {
  let provider: DatabaseModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseModel],
    }).compile();

    provider = module.get<DatabaseModel>(DatabaseModel);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
