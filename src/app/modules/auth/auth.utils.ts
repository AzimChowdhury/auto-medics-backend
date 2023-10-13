import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
const comparePassword = async (
  enteredPassword: string,
  storedPassword: string,
  role: string,
  email: string
) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(enteredPassword, storedPassword, (err, result) => {
      if (err) {
        reject(
          new ApiError(
            httpStatus.EXPECTATION_FAILED,
            'Password comparison error'
          )
        );
      } else if (result) {
        const accessToken = jwtHelpers.createToken(
          { email, role },
          config.jwt.secret as Secret,
          config.jwt.expires_in as string
        );
        const refreshToken = jwtHelpers.createToken(
          { email, role },
          config.jwt.refresh_secret as Secret,
          config.jwt.refresh_expires_in as string
        );
        resolve({
          accessToken,
          refreshToken,
        });
      } else {
        reject(new ApiError(httpStatus.NOT_FOUND, 'Password did not match'));
      }
    });
  });
};

export const AuthUtils = {
  comparePassword,
};
