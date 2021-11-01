// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   url: 'https://ygn8q40qaf.execute-api.ap-south-1.amazonaws.com/prod/',
  //  url: 'https://0719-117-222-112-234.ngrok.io/prod/', 
  
  firebaseConfig: {
    apiKey: 'AIzaSyAnMONxA1GU2wcPnSLyU-VacVgZDSgJ5UU',
    authDomain: 'ironman-app-99a2f.firebaseapp.com',
    projectId: 'ironman-app-99a2f',
    storageBucket: 'ironman-app-99a2f.appspot.com',
    messagingSenderId: '797555515730',
    appId: '1:797555515730:web:e0486554f60f512df31a8b',
    measurementId: 'G-88LSV1MS7H',
    databaseURL: 'ironman-app-99a2f.firebaseio.com',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
