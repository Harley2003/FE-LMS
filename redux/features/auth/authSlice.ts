// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const initialState = {
//   user: "",
//   token: "",
//   refreshToken: ""
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     userRegister: (state, action: PayloadAction<{ token: string }>) => {
//       state.token = action.payload.token;
//     },
//     userLogin: (
//       state,
//       action: PayloadAction<{
//         accessToken: string;
//         user: string;
//         refreshToken: string;
//       }>
//     ) => {
//       state.token = action.payload.accessToken;
//       state.refreshToken = action.payload.refreshToken;
//       state.user = action.payload.user;
//     },
//     userLogout: (state: any) => {
//       state.token = "";
//       state.user = "";
//       state.refreshToken = "";
//     }
//   }
// });

// export const { userRegister, userLogin, userLogout } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "",
  refreshToken: ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegister: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userLogin: (
      state,
      action: PayloadAction<{
        accessToken: string;
        user: string;
        refreshToken: string;
      }>
    ) => {
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    userLogout: (state) => {
      state.token = "";
      state.user = "";
      state.refreshToken = "";
    }
  }
});

export const { userRegister, userLogin, userLogout } = authSlice.actions;
export default authSlice.reducer;

