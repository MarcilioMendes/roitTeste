import { Test, TestingModule } from '@nestjs/testing';
import { PessoasService } from './pessoas.service';

describe('PessoasService', () => {
  let provider: PessoasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoasService],
    }).compile();

    provider = module.get<PessoasService>(PessoasService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
