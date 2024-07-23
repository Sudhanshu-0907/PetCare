import {Platform, ToastAndroid} from 'react-native';
import Toast from 'react-native-simple-toast';

export const toastr = {
  showToast: (message, _type, duration = 500) => {
    Platform.OS === 'ios'
      ? Toast.show(message, Toast.LONG, {
          tapToDismissEnabled: true,
          textColor: '#fff',
          backgroundColor: 'gray',
        })
      : ToastAndroid.show(message, duration);
  },
};

export function handleFirebaseAuthError(error) {
  //   switch (error.code) {
  //     case 'auth/claims-too-large':
  //       toastr.showToast(
  //         'The claims payload provided to setCustomUserClaims() exceeds the maximum allowed size of 1000 bytes.',
  //       );
  //       break;
  //     case 'auth/email-already-exists':
  //       toastr.showToast(
  //         'The provided email is already in use by an existing user. Each user must have a unique email.',
  //       );
  //       break;
  //     case 'auth/id-token-expired':
  //       toastr.showToast('The provided Firebase ID token is expired.');
  //       break;
  //     case 'auth/id-token-revoked':
  //       toastr.showToast('The Firebase ID token has been revoked.');
  //       break;
  //     case 'auth/insufficient-permission':
  //       toastr.showToast(
  //         'The credential used to initialize the Admin SDK has insufficient permission to access the requested Authentication resource.',
  //       );
  //       break;
  //     case 'auth/internal-error':
  //       toastr.showToast(
  //         'The Authentication server encountered an unexpected error while trying to process the request.',
  //       );
  //       break;
  //     case 'auth/invalid-argument':
  //       toastr.showToast(
  //         'An invalid argument was provided to an Authentication method.',
  //       );
  //       break;
  //     case 'auth/invalid-claims':
  //       toastr.showToast(
  //         'The custom claim attributes provided to setCustomUserClaims() are invalid.',
  //       );
  //       break;
  //     case 'auth/invalid-continue-uri':
  //       toastr.showToast('The continue URL must be a valid URL string.');
  //       break;
  //     case 'auth/invalid-creation-time':
  //       toastr.showToast('The creation time must be a valid UTC date string.');
  //       break;
  //     case 'auth/invalid-credential':
  //       toastr.showToast(
  //         'The credential used to authenticate the Admin SDKs cannot be used to perform the desired action.',
  //       );
  //       break;
  //     case 'auth/invalid-disabled-field':
  //       toastr.showToast(
  //         'The provided value for the disabled user property is invalid. It must be a boolean.',
  //       );
  //       break;
  //     case 'auth/invalid-display-name':
  //       toastr.showToast(
  //         'The provided value for the displayName user property is invalid. It must be a non-empty string.',
  //       );
  //       break;
  //     case 'auth/invalid-dynamic-link-domain':
  //       toastr.showToast(
  //         'The provided dynamic link domain is not configured or authorized for the current project.',
  //       );
  //       break;
  //     case 'auth/invalid-email':
  //       toastr.showToast('The email address is badly formatted');
  //       break;
  //     case 'auth/invalid-email-verified':
  //       toastr.showToast(
  //         'The provided value for the emailVerified user property is invalid. It must be a boolean.',
  //       );
  //       break;
  //     case 'auth/invalid-hash-algorithm':
  //       toastr.showToast(
  //         'The hash algorithm must match one of the strings in the list of supported algorithms.',
  //       );
  //       break;
  //     case 'auth/invalid-hash-block-size':
  //       toastr.showToast('The hash block size must be a valid number.');
  //       break;
  //     case 'auth/invalid-hash-derived-key-length':
  //       toastr.showToast('The hash derived key length must be a valid number.');
  //       break;
  //     case 'auth/invalid-hash-key':
  //       toastr.showToast('The hash key must a valid byte buffer.');
  //       break;
  //     case 'auth/invalid-hash-memory-cost':
  //       toastr.showToast('The hash memory cost must be a valid number.');
  //       break;
  //     case 'auth/invalid-hash-parallelization':
  //       toastr.showToast('The hash parallelization must be a valid number.');
  //       break;
  //     case 'auth/invalid-hash-rounds':
  //       toastr.showToast('The hash rounds must be a valid number.');
  //       break;
  //     case 'auth/invalid-hash-salt-separator':
  //       toastr.showToast(
  //         'The hashing algorithm salt separator field must be a valid byte buffer.',
  //       );
  //       break;
  //     case 'auth/invalid-id-token':
  //       toastr.showToast(
  //         'The provided ID token is not a valid Firebase ID token.',
  //       );
  //       break;
  //     case 'auth/invalid-last-sign-in-time':
  //       toastr.showToast(
  //         'The last sign-in time must be a valid UTC date string.',
  //       );
  //       break;
  //     case 'auth/invalid-page-token':
  //       toastr.showToast(
  //         'The provided next page token in listUsers() is invalid. It must be a valid non-empty string.',
  //       );
  //       break;
  //     case 'auth/invalid-password':
  //       toastr.showToast(
  //         'The provided value for the password user property is invalid. It must be a string with at least six characters.',
  //       );
  //       break;
  //     case 'auth/invalid-password-hash':
  //       toastr.showToast('The password hash must be a valid byte buffer.');
  //       break;
  //     case 'auth/invalid-password-salt':
  //       toastr.showToast('The password salt must be a valid byte buffer.');
  //       break;
  //     case 'auth/invalid-phone-number':
  //       toastr.showToast(
  //         'The provided value for the phoneNumber is invalid. It must be a non-empty E.164 standard compliant identifier string.',
  //       );
  //       break;
  //     case 'auth/invalid-photo-url':
  //       toastr.showToast(
  //         'The provided value for the photoURL user property is invalid. It must be a string URL.',
  //       );
  //       break;
  //     case 'auth/invalid-provider-data':
  //       toastr.showToast(
  //         'The providerData must be a valid array of UserInfo objects.',
  //       );
  //       break;
  //     case 'auth/invalid-provider-id':
  //       toastr.showToast(
  //         'The providerId must be a valid supported provider identifier string.',
  //       );
  //       break;
  //     case 'auth/invalid-oauth-responsetype':
  //       toastr.showToast(
  //         'Only exactly one OAuth responseType should be set to true.',
  //       );
  //       break;
  //     case 'auth/invalid-session-cookie-duration':
  //       toastr.showToast(
  //         'The session cookie duration must be a valid number in milliseconds between 5 minutes and 2 weeks.',
  //       );
  //       break;
  //     case 'auth/invalid-uid':
  //       toastr.showToast(
  //         'The provided uid must be a non-empty string with at most 128 characters.',
  //       );
  //       break;
  //     case 'auth/invalid-user-import':
  //       toastr.showToast('The user record to import is invalid.');
  //       break;
  //     case 'auth/maximum-user-count-exceeded':
  //       toastr.showToast(
  //         'The maximum allowed number of users to import has been exceeded.',
  //       );
  //       break;
  //     case 'auth/missing-android-pkg-name':
  //       toastr.showToast(
  //         'An Android Package Name must be provided if the Android App is required to be installed.',
  //       );
  //       break;
  //     case 'auth/missing-continue-uri':
  //       toastr.showToast('A valid continue URL must be provided in the request.');
  //       break;
  //     case 'auth/missing-hash-algorithm':
  //       toastr.showToast(
  //         'Importing users with password hashes requires that the hashing algorithm and its parameters be provided.',
  //       );
  //       break;
  //     case 'auth/missing-ios-bundle-id':
  //       toastr.showToast('The request is missing a Bundle ID.');
  //       break;
  //     case 'auth/missing-uid':
  //       toastr.showToast(
  //         'A uid identifier is required for the current operation.',
  //       );
  //       break;
  //     case 'auth/missing-oauth-client-secret':
  //       toastr.showToast(
  //         'The OAuth configuration client secret is required to enable OIDC code flow.',
  //       );
  //       break;
  //     case 'auth/operation-not-allowed':
  //       toastr.showToast(
  //         'The provided sign-in provider is disabled for your Firebase project. Enable it from the Sign-in Method section of the Firebase console.',
  //       );
  //       break;
  //     case 'auth/phone-number-already-exists':
  //       toastr.showToast(
  //         'The provided phoneNumber is already in use by an existing user. Each user must have a unique phoneNumber.',
  //       );
  //       break;
  //     case 'auth/project-not-found':
  //       toastr.showToast(
  //         'No Firebase project was found for the credential used to initialize the Admin SDKs.',
  //       );
  //       break;
  //     case 'auth/reserved-claims':
  //       toastr.showToast(
  //         'One or more custom user claims provided to setCustomUserClaims() are reserved.',
  //       );
  //       break;
  //     case 'auth/session-cookie-expired':
  //       toastr.showToast('The provided Firebase session cookie is expired.');
  //       break;
  //     case 'auth/session-cookie-revoked':
  //       toastr.showToast('The Firebase session cookie has been revoked.');
  //       break;
  //     case 'auth/too-many-requests':
  //       toastr.showToast('The number of requests exceeds the maximum allowed.');
  //       break;
  //     case 'auth/uid-already-exists':
  //       toastr.showToast(
  //         'The provided uid is already in use by an existing user. Each user must have a unique uid.',
  //       );
  //       break;
  //     case 'auth/unauthorized-continue-uri':
  //       toastr.showToast('The domain of the continue URL is not whitelisted.');
  //       break;
  //     case 'auth/user-not-found':
  //       toastr.showToast(
  //         'There is no existing user record corresponding to the provided identifier.',
  //       );
  //       break;
  //     default:
  //       toastr.showToast('An unexpected error occurred:', error.message);
  //       break;
  //   }
  toastr.showToast(error.message);
}
