// import CONFIG from 'react-native-config';
// import Auth0 from 'react-native-auth0';

// class Auth {
//   auth0;

//   constructor() {
//     this.auth0 = new Auth0({
//       domain: CONFIG.AUTH0_DOMAIN,
//       clientId: CONFIG.AUTH0_CLIENT_ID,
//     });
//   }

//   passwordlessWithSms = async (phoneNumber) => {
//     try {
//       const result = await this.auth0.auth.passwordlessWithSMS({
//         phoneNumber,
//       });
//       return result;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   loginWithSms = async (phoneNumber, code) => {
//     try {
//       const result = await this.auth0.auth.loginWithSMS({
//         phoneNumber,
//         code,
//         scope: 'openid email profile offline_access read:box',
//         audience: CONFIG.AUTH0_AUDIENCE,
//       });
//       return result;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   authorize = async () => {
//     try {
//       const result = await this.auth0.webAuth.authorize({
//         scope: 'openid email profile offline_access read:box',
//         audience: CONFIG.AUTH0_AUDIENCE,
//         prompt: 'login',
//       },
//       { ephemeralSession: true });
//       return result;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   fetchUser = async (token) => {
//     try {
//       const result = await this.auth0.auth.userInfo({ token });
//       return result;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   refreshToken = async (refreshToken) => {
//     try {
//       const result = await this.auth0.auth.refreshToken({ refreshToken });
//       return result;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
// }

// const auth = new Auth();

// export default auth;
