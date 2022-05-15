import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IFPost } from "../../models/Post";
import { RootState } from "../store";

interface IFState {
  post: IFPost[];
  loading: boolean;
  error: any;
  edit: boolean;
}

const initialState: IFState = {
  post: [],
  loading: false,
  error: null,
  edit: false,
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

export const createAsyncPost = createAsyncThunk(
  "post/createPost",
  async (values: { title: string; body: string }) => {
    return axios
      .post(`https://jsonplaceholder.typicode.com/posts/`, values, {
        headers: {
          accept: "application/json",
          "Content-type": "application/json",
        },
      })
      .then((res) => res.data);
  }
);

export const updateAsyncPost = createAsyncThunk(
  "post/updaePost",
  async ({
    userId,
    values,
  }: {
    userId: number;
    values: {
      title: string;
      body: string;
    };
  }) => {
    return axios
      .put(`https://jsonplaceholder.typicode.com/posts/${userId}`, values, {
        headers: {
          accept: "application/json",
          "Content-type": "application/json",
        },
      })
      .then((res) => res.data);
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setEdit: (state, { payload }) => {
      state.edit = payload.edit;
    },
  },
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
    // create post
    bundler.addCase(createAsyncPost.pending, (state, _) => {
      state.loading = true;
    });
    bundler.addCase(createAsyncPost.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.post = [payload];
    });
    bundler.addCase(createAsyncPost.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // update post
    bundler.addCase(updateAsyncPost.pending, (state, _) => {
      state.loading = true;
    });
    bundler.addCase(updateAsyncPost.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.post = [payload];
    });
    bundler.addCase(updateAsyncPost.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { setEdit } = postSlice.actions;

export const selectPost = (state: RootState) => state.post.post;
export const selectLoading = (state: RootState) => state.post.loading;
export const selectError = (state: RootState) => state.post.error;
export const selectEdit = (state: RootState) => state.post.edit;

export default postSlice.reducer;
