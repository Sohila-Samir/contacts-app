// interfaces
import { UserDoc } from "../../interfaces/user.interfaces";

// types
import { UserAuthCredentials } from "../../types/auth.types";

/**
 * @desc constructs a user credentials object contains the user id, the user roles, an access token associated with the provided user and the current user email verification status
 * @returns `{user: user._id, roles: user.roles, accessToken: accessToken, verified: user?.verified}`
 */
const constructUserCredentials = (
  user: UserDoc,
  accessToken: string
): UserAuthCredentials => {
  const data = {
    _id: user?._id,
    roles: user?.roles,
    verified: user?.verified,
    accessToken: accessToken,
  };
  return data;
};

export default constructUserCredentials;
