import { Test, TestingModule } from '@nestjs/testing';
import { getPhoto } from '../testing/get-photo.mock';
import { FileService } from './file.service';

describe('FileService', () => {
  let fileService: FileService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    fileService = module.get<FileService>(FileService);
  });

  test('Validar a definição', () => {
    expect(FileService).toBeDefined();
  });
  describe('FileService Test file', () => {
    test('Upload', async () => {
      const photo = await getPhoto();
      const filename = 'photo-test.jpeg';
      fileService.upload(photo, filename);
    });
  });
});
