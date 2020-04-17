export const API_BASE_URL = 'http://localhost:8080';

export const OAUTH2_REDIRECT_URI = 'http://localhost:8080/rexa/dashboard'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorization/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
