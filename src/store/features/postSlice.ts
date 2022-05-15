import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IFPost } from "../../models/Post";
import { RootState } from "../store";

interface IFState {
  post: IFPost[];
  loading: boolean;
  error: any;
}

const initialState: IFState = {
  post: [],
  loading: false,
  error: null,
};

export const getAsyncPost = createAsyncThunk(
  "post/getPost",
  async ({ userId }: { userId: string }) => {
    return axios
      .get(`https://jsonplaceholder.typicode.com/posts/${userId}`)
      .then((res) => res.data);
  }
);

export const deleteAsyncPost = createAsyncThunk(
  "post/deletePost",
  async ({ userId }: { userId: string }) => {
    return axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${userId}`)
      .then((res) => res.data);
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (bundler) => {
    // get post
    bundler.addCase(getAsyncPost.pending, (state, _) => {
      state.loading = true;
    });
    bundler.addCase(getAsyncPost.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.post = [payload];
    });
    bundler.addCase(getAsyncPost.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // delete post
    bundler.addCase(deleteAsyncPost.pending, (state, _) => {
      state.loading = true;
    });
    bundler.addCase(deleteAsyncPost.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.post = payload;
    });
    bundler.addCase(deleteAsyncPost.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const selectPost = (state: RootState) => state.post.post;
export const selectLoading = (state: RootState) => state.post.loading;
export const selectError = (state: RootState) => state.post.error;

export default postSlice.reducer;
