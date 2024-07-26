import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "../location/Location";
import { RootState } from "@/app/store";

interface ProfileState {
  name: string;
  lastName: string;
  documentType: string;
  document: string | null;
  email: string;
  phoneNumber: string;
  sameBillingInfo: boolean;
  location: Location | null;
}

const initialState: ProfileState = {
  name: "",
  lastName: "",
  documentType: "RUC",
  document: "",
  email: "",
  phoneNumber: "",
  sameBillingInfo: false,
  location: null,
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
    setLocation: (state, action: PayloadAction<Location>) => {
      console.log(action.payload);
      state.location = action.payload;
    },
  },
});
export const selectLocation = (state: RootState) => state.profile.location;
export const selectProfile = (state: RootState) => state.profile;

export const {
  setName,
  setLastName,
  setDocumentType,
  setDocument,
  setEmail,
  setPhoneNumber,
  setSameBillingInfo,
  setLocation,
} = profileSlice.actions;

export default profileSlice.reducer;
