import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderDataService from "../services/OrderService";

export interface OrderProps {
  id: string
  amount: number
  city: string
  confirmed: boolean
  createdAt: string
  messageType: string
  name: string
  phone: string
  requestAmount: number
  requestType: string
}

const initialState: OrderProps[] = [];

export const createOrder = createAsyncThunk(
  "orders/create",
  async (data: OrderProps) => {
    const res = await OrderDataService.create(data);
    return res.data;
  }
);

export const retrieveOrders = createAsyncThunk(
  "orders/retrieve",
  async ({page, limit}: { page?: number, limit?: number }) => {
    const res = await OrderDataService.getAll(page, limit);
    return res.data;
  }
);

export const updateOrder = createAsyncThunk(
  "orders/update",
  async ({ id, data }: { id: string, data: any }) => {
    const res = await OrderDataService.update(id, data);
    return res.data;
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async ({ id }: { id: string }) => {
    await OrderDataService.remove(id);
    return { id };
  }
);

export const deleteAllOrders = createAsyncThunk(
  "orders/deleteAll",
  async () => {
    const res = await OrderDataService.removeAll();
    return res.data;
  }
);

export const findOrdersByTitle = createAsyncThunk(
  "orders/findByTitle",
  async ({ title }: { title: string }) => {
    const res = await OrderDataService.findByTitle(title);
    return res.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(retrieveOrders.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.findIndex((order) => order.id === action.payload.id);
        state[index] = {
          ...state[index],
          ...action.payload,
        };
      })
      .addCase(deleteOrder.fulfilled, () => {})
      .addCase(deleteAllOrders.fulfilled, (state, action) => {
        return [];
      })
      .addCase(findOrdersByTitle.fulfilled, (state, action) => {
        return [...action.payload];
      });
  },
});

const { reducer } = orderSlice;

export default reducer;
