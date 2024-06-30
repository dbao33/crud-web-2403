import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const urlApi = 'http://localhost:3001/users'

export const getUserAll = createAsyncThunk("userList/getUserAll", async () => {
  try {
    // const url = urlApi;
    const response = await axios.get(urlApi);
    return response.data.length;
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching users:", error);
  }
});

export const getUsersList = createAsyncThunk(
  "userList/getUsersList",
  async ({ page, limit, nameSearch }) => {
    // console.log('page, limit, nameSearch', page, limit, nameSearch)
    try {
      const url = urlApi;
      const response = await axios.get(url, {
        params: {
          _page: page,
          _per_page: limit,
          lastName_like: nameSearch,
        },
      });
      // console.log('response', response);

      return response.data;
    } catch (error) {
      // Log the error for debugging
      // console.error("Error fetching users:", error);
    }
  }
);

export const deleteManyUser = (listId) => {
  console.log('listId', listId)
  try {
    const list = listId?.map(async (element) => {
      const data = await axios.delete(`${urlApi}/${element}`)
      return data
    });
    // console.log(list);
    return list;
  } catch (error) {
    console.error(`Error deleting user with ID ${listId}:`, error);
  }
};

export const createUser = async (user) => {
  try {
    const newUser = { ...user };
    // console.log("first user created", newUser);
    await axios.post(urlApi, newUser);
  } catch (error) {
    console.error(`Error creating user: `, error);
  }
};
export const editUser = async (id, user) => {
  try {
    const newUser = { ...user };
    // console.log("first user created id", id);
    // console.log("first user created", newUser);
    await axios.put(`${urlApi}/${id}/`, newUser);
  } catch (error) {
    console.error(`Error creating user: `, error);
  }
};
//============================================================================

const initialState = {
  status: "idle",
  userList: [],
  total: 0,
  errors: "",
};
const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsersList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUsersList.fulfilled, function (state, action) {
        state.status = "success";
        // console.log('`action`', action)
        state.userList = [...action.payload]
      })
      .addCase(getUsersList.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getUserAll.fulfilled, (state, action) => {
        state.total = action.payload;
      });
  },
});

export default userSlice.reducer;
