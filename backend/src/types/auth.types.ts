import { SchemaRole } from "./roles.types";

export type UserAuthCredentials = {
  _id: string;
  roles: SchemaRole;
  verified: boolean;
  createdAt?: Date;
};
