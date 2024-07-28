import { createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import { Profile } from "./Profile";

export const createProfileThunk = createAsyncThunk(
  "profile/createProfile",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to create profile");
      }
      const data = await response.json();

      return data;
    } catch (error: unknown) {
      return rejectWithValue((error as SerializedError).message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("id", userId);

      const response = await fetch("/api/user", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
