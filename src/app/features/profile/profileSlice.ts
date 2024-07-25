// src/app/features/profile/profileSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  name: string;
  lastName: string;
  documentType: string;
  document: string | null;
  email: string;
  phoneNumber: string;
  sameBillingInfo: boolean;
}

const initialState: ProfileState = {
  name: "",
  lastName: "",
  documentType: "RUC",
  document: "",
  email: "",
  phoneNumber: "",
  sameBillingInfo: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setDocumentType: (state, action: PayloadAction<string>) => {
      state.documentType = action.payload;
    },
    setDocument: (state, action: PayloadAction<string>) => {
      state.document = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setSameBillingInfo: (state, action: PayloadAction<boolean>) => {
      state.sameBillingInfo = action.payload;
    },
  },
});

export const {
  setName,
  setLastName,
  setDocumentType,
  setDocument,
  setEmail,
  setPhoneNumber,
  setSameBillingInfo,
} = profileSlice.actions;

export default profileSlice.reducer;
