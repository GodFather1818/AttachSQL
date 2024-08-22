import { Test, TestingModule } from '@nestjs/testing';
import { AttatchmentController } from './attatchment.controller';

describe('AttatchmentController', () => {
  let controller: AttatchmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttatchmentController],
    }).compile();

    controller = module.get<AttatchmentController>(AttatchmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
