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

const REGEX_ONE_CAPITAL_LETTER = /^.*[A-Z]+.*$/;
const REGEX_ONE_NUMBER = /^.*[0-9]+.*$/;
const PASSWORD_LENGTH = 8;

export const ERROR_PASSWORD_LENGTH = 'Password must be at least 8 characters long.';
export const ERROR_PASSWORD_CAPITAL_LETTER = 'Password must contain a capital letter.';
export const ERROR_PASSWORD_NUMBER = 'Password must contain a number.';
export const ERROR_PASSWORD_NOT_MATCH = 'Password and confirmation does not match.';

export const isPasswordTooShort = password => {
    return password.length < PASSWORD_LENGTH;
};

export const passwordDoesNotContainACapitalLetter = password => {
    return !password.match(REGEX_ONE_CAPITAL_LETTER);
};

export const passwordDoesNotContainANumber = password => {
    return !password.match(REGEX_ONE_NUMBER) ;
};
