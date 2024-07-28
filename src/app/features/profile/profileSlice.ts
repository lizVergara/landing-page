import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "../location/Location";
import { RootState } from "@/app/store";
import { Profile } from "./Profile";
import { createProfileThunk, fetchUserProfile } from "./profileThunks";

interface ProfileState extends Profile {
  images: string[];
  loading: boolean;
  error: string | null;
  temperature: string;
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
  images: [],
  loading: false,
  error: null,
  temperature: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: () => initialState,
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
      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfileThunk.fulfilled, (state, action) => {
        state.name = action.payload.profile.nombre;
        state.lastName = action.payload.profile.apellido;
        state.documentType = action.payload.profile.tipo_documento;
        state.document = action.payload.profile.documento;
        state.email = action.payload.profile.correo;
        state.phoneNumber = action.payload.profile.telefono;
        state.sameBillingInfo = action.payload.profile.bill_info;
        state.location = action.payload.profile.location_id;
        state.images = action.payload.images;
        state.temperature = action.payload.wheather.temperature;
        state.loading = false;
      })
      .addCase(createProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        const result = action.payload.result;
        state.name = result.nombre;
        state.lastName = result.apellido;
        state.documentType = result.tipo_documento;
        state.document = result.documento;
        state.email = result.correo;
        state.phoneNumber = result.telefono;
        state.sameBillingInfo = result.bill_info;
        state.location = result.trd_location;
        state.images = result.images;
        state.temperature = action.payload.wheather.temperature;

        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectLocation = (state: RootState) => state.profile.location;
export const selectProfile = (state: RootState) => state.profile;
export const selectImages = (state: RootState) => state.profile.images;
export const selectLoading = (state: RootState) => state.profile.loading;

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
