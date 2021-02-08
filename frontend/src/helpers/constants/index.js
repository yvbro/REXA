export const API_BASE_URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'accessToken';
export const TOKEN_TYPE = 'Bearer';
export const EXPIRATION_DATE = 'expirationDate';

export const OAUTH2_REDIRECT_URI = 'http://localhost:8080/oauth2/redirect';
export const GOOGLE_AUTH_PROVIDER = 'google';

export const GOOGLE_AUTH_URL =
    API_BASE_URL +
    '/oauth2/authorize-client/google?redirect_uri=' +
    OAUTH2_REDIRECT_URI;

// eslint-disable-next-line
export const regexEmail = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

const REGEX_ONE_CAPITAL_LETTER = /(?:^|[^A-Z])[A-Z](?![A-Z])/;
const REGEX_ONE_NUMBER = /^.*[0-9]+.*$/;
const PASSWORD_LENGTH = 8;

export const ERROR_INVALID_PASSWORD =
    'The new password is invalid. Please follow the rules.';

export const isPasswordInvalid = (password) => {
    return (
        !password.match(REGEX_ONE_CAPITAL_LETTER) ||
        !password.match(REGEX_ONE_NUMBER) ||
        password.length < PASSWORD_LENGTH
    );
};
