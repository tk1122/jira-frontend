// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://localhost:4000/api',
  firebase: {
    apiKey: "AIzaSyDbcHAoqIWfGsdzhrHSAfMbVedOTmaepMo",
    authDomain: "jira-22139.firebaseapp.com",
    databaseURL: "https://jira-22139.firebaseio.com",
    projectId: "jira-22139",
    storageBucket: "jira-22139.appspot.com",
    messagingSenderId: "852768605522",
    appId: "1:852768605522:web:8619bfd52d367dc503268b",
    measurementId: "G-BB7TWQRJ37"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
