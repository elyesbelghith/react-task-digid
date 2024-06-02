import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store'; // Adjust this import if necessary

export interface Item {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface ItemsState {
  items: Item[];
  count: number; // New state to keep track of the count
}

const initialState: ItemsState = {
  items: [],
  count: 0,
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
      state.count = action.payload.length;
    },
    addItem: (state, action: PayloadAction<Omit<Item, 'id'>>) => {
      const newItem: Item = {
        ...action.payload,
        id: state.count + 1,
      };
      state.items.push(newItem);
      state.count++;
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    editItem(state, action: PayloadAction<Item>) {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
            state.items[index] = action.payload;
        }
    },
  },
});

export const { setItems, addItem, deleteItem, editItem } = itemsSlice.actions;
export const selectItems = (state: RootState) => state.items.items;
export default itemsSlice.reducer;
