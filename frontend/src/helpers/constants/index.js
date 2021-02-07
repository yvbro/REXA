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

export const regexOneCapitalLetter = /(?:^|[^A-Z])[A-Z](?![A-Z])/;
export const regexOneNumber = /^.*[0-9]+.*$/;