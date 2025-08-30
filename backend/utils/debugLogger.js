import debugLib from 'debug';

export const debugApp = debugLib('app:server');
export const debugGeocode = debugLib('app:Geocode');
export const debugTokenService = debugLib('app:TokenService');
export const debugAuthController = debugLib('app:AuthController');
export const debugMapplsController = debugLib('app:MapplsController');
export const debugNotificationController = debugLib('app:NotificationController');
export const debugDatabase = debugLib('app:Database');
export const debugError = debugLib('app:Error');
export const debugUserController = debugLib('app:UserController');
