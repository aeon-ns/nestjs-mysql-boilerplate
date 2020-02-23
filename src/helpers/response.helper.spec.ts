import { Test, TestingModule } from '@nestjs/testing';
import { ResponseHelper } from './response.helper';

describe('ResponseHelper', () => {
  let provider: ResponseHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseHelper],
    }).compile();

    provider = module.get<ResponseHelper>(ResponseHelper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
