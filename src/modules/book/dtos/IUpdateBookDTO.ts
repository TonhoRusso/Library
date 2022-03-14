import { Status } from '@prisma/client';

export interface IUpdateBookDTO {
  bookName: string;
  edition: string;
  year: string;
  releaseDate: Date;
  status: Status;
  quantity: number;
  locationAddress: string;
  locationNumber: number;
  locationZipCode: string;
  locationComplement: string;
  bookId: string;
  bookShopId: string;
}
