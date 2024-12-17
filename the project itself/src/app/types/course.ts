export interface Course {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  startDate: string;
  price: string;
  signedOut: string[];
  _ownerId: string;
  __v: number;
}
