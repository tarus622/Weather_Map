import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { RequestHistoryHelper } from '../helpers/request-history';
import { Location } from '../schemas/location.schema';

const mockLocationModel = {
  find: jest.fn(),
  select: jest.fn(),
};

describe('RequestHistoryHelper', () => {
  let requestHistoryHelper: RequestHistoryHelper;
  let locationModel: Model<Location>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestHistoryHelper,
        {
          provide: getModelToken(Location.name),
          useValue: mockLocationModel,
        },
      ],
    }).compile();

    requestHistoryHelper =
      module.get<RequestHistoryHelper>(RequestHistoryHelper);
    locationModel = module.get<Model<Location>>(getModelToken(Location.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Can create an instance of RequestHistoryHelper', () => {
    // Assert
    expect(RequestHistoryHelper).toBeDefined();
  });

  describe('findRequestHistory', () => {
    it('should throw an error if finding request history fails', async () => {
      // Arrange
      const expectedError = new Error('Test error');
      mockLocationModel.find.mockImplementation(() => {
        throw expectedError;
      });

      // Act & Assert
      await expect(
        requestHistoryHelper.findRequestHistory(),
      ).rejects.toThrowError(expectedError);
      expect(locationModel.find).toHaveBeenCalled();
    });
  });
});
