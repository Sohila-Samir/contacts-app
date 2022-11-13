// configs
import redisClient from "../../configs/redis.configs";

class UserRefreshTokens {
  addRefreshToken = function (refreshToken: string, userID: string): void {
    try {
      redisClient.LPUSH(`RTs_${userID}`, refreshToken);
    } catch (err: unknown) {
      if (err && err instanceof Error) throw new Error(err.message);
    }
  };

  removeAndAddRefreshToken(
    oldRefreshToken: string,
    newRefreshToken: string,
    userID: string
  ): void {
    try {
      redisClient.LREM(`RTs_${userID}`, 0, oldRefreshToken);
      redisClient.LPUSH(`RTs_${userID}`, newRefreshToken);
    } catch (err: unknown) {
      if (err && err instanceof Error) throw new Error(err.message);
    }
  }

  resetRefreshTokens(userID: string): void {
    try {
      redisClient.DEL(`RTs_${userID}`);
    } catch (err: unknown) {
      if (err && err instanceof Error) throw new Error(err.message);
    }
  }
}

export default UserRefreshTokens;
