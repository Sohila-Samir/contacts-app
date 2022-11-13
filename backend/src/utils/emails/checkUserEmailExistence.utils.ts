// main
import { UserModel } from "../../models/mongoose/User.models";

/**
 * @desc checks if the provided email exists in database and attached to a user that is existed too in the database.
 * @returns the user found in database associated with the provided email.
 * @throws throws an error if there is no user found in the database that is associated with the provided email.
 */
const checkUserEmailExistence = async (email: string) => {
  const user = await UserModel.findOne({ email });

  if (!user)
    throw new Error("could not find an account associated with this email!");

  return user;
};

export default checkUserEmailExistence;
