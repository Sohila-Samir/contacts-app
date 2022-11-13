export type CreateUserReturnedData = {
  _id: string;
  username: string;
  name: string;
  email: string;
  createdAt: Date;
  verified: boolean;
  phoneNumber?: number;
  birthday?: Date;
  userImg?: string;
};
