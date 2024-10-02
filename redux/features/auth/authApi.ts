// import { apiSlice } from "../api/apiSlice";
// import { userLogin, userLogout, userRegister } from "./authSlice";
// import Cookies from "js-cookie";

// type RegisterRespone = {
//   message: string;
//   activationToken: string;
// };

// type RegisterData = {};

// export const authApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // endpoints here (register)
//     register: builder.mutation<RegisterRespone, RegisterData>({
//       query: (data) => ({
//         url: "register",
//         method: "POST",
//         body: data,
//         credentials: "include" as const
//       }),
//       async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           dispatch(
//             userRegister({
//               token: result.data.activationToken
//             })
//           );
//         } catch (error: any) {
//           console.log(error);
//         }
//       }
//     }),
//     activation: builder.mutation({
//       query: ({ activation_token, activation_code }) => ({
//         url: "active-users",
//         method: "POST",
//         body: { activation_token, activation_code }
//       })
//     }),
//     login: builder.mutation({
//       query: ({ email, password }) => ({
//         url: "login",
//         method: "POST",
//         body: { email, password },
//         credentials: "include" as const
//       }),
//       async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           Cookies.set("access_token", result.data.accessToken);
//           Cookies.set("refresh_token", result.data.refreshToken);
//           dispatch(
//             userLogin({
//               accessToken: result.data.accessToken,
//               refreshToken: result.data.refreshToken,
//               user: result.data.user
//             })
//           );
//         } catch (error: any) {
//           console.log(error);
//         }
//       }
//     }),
//     socialAuth: builder.mutation({
//       query: ({ email, name, avatar, password }) => ({
//         url: "social-auth",
//         method: "POST",
//         body: { email, name, avatar, password },
//         credentials: "include" as const
//       }),
//       async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           Cookies.set("access_token", result.data.accessToken);
//           Cookies.set("refresh_token", result.data.refreshToken);
//           dispatch(
//             userLogin({
//               accessToken: result.data.accessToken,
//               refreshToken: result.data.refreshToken,
//               user: result.data.user
//             })
//           );
//         } catch (error: any) {
//           console.log(error);
//         }
//       }
//     }),
//     logout: builder.query({
//       query: () => ({
//         url: "logout",
//         method: "GET",
//         credentials: "include" as const
//       }),
//       async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//         try {
//           await queryFulfilled;
//           Cookies.remove("access_token");
//           Cookies.remove("refresh_token");
//           dispatch(
//             userLogout()
//           );
//         } catch (error: any) {
//           console.log(error);
//         }
//       }
//     })
//   })
// });

// export const { useRegisterMutation, useActivationMutation, useLoginMutation, useSocialAuthMutation, useLogoutQuery } =
//   authApi;

import { apiSlice } from "../api/apiSlice";
import { userLogin, userLogout, userRegister } from "./authSlice";
import Cookies from "js-cookie";

type RegisterResponse = {
  message: string;
  activationToken: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterData>({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
        credentials: "include"
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userRegister({ token: result.data.activationToken }));
        } catch (error) {
          console.error(error);
        }
      }
    }),

    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "active-users",
        method: "POST",
        body: { activation_token, activation_code }
      })
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: { email, password },
        credentials: "include"
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          Cookies.set("access_token", result.data.accessToken);
          Cookies.set("refresh_token", result.data.refreshToken);
          dispatch(
            userLogin({
              accessToken: result.data.accessToken,
              refreshToken: result.data.refreshToken,
              user: result.data.user
            })
          );
        } catch (error) {
          console.error(error);
        }
      }
    }),

    socialAuth: builder.mutation({
      query: ({ email, name, avatar, password }) => ({
        url: "social-auth",
        method: "POST",
        body: { email, name, avatar, password },
        credentials: "include"
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          Cookies.set("access_token", result.data.accessToken);
          Cookies.set("refresh_token", result.data.refreshToken);
          dispatch(
            userLogin({
              accessToken: result.data.accessToken,
              refreshToken: result.data.refreshToken,
              user: result.data.user
            })
          );
        } catch (error) {
          console.error(error);
        }
      }
    }),

    logout: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include"
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          dispatch(userLogout());
        } catch (error) {
          console.error(error);
        }
      }
    })
  })
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogoutQuery
} = authApi;
