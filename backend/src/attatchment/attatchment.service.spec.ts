import { Test, TestingModule } from '@nestjs/testing';
import { AttatchmentService } from './attatchment.service';

describe('AttatchmentService', () => {
  let service: AttatchmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttatchmentService],
    }).compile();

    service = module.get<AttatchmentService>(AttatchmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
