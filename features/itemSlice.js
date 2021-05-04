import { createSlice } from '@reduxjs/toolkit';

export const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    value: 0,
    blockItems: [
      {
        id: 'HEADING',
        content: 'This is a heading',
        type: 'heading',
      },
      {
        id: 'BLOCK',
        content: 'This is a block',
        type: 'block',
      },
      {
        id: 'TEXT',
        content: 'This is a text',
        type: 'text',
      },
      {
        id: 'IMAGE',
        content: 'This is a image',
        type: 'image',
      },
    ],
    droppedItems: [],
  },
  reducers: {
    addBlocks: (state, action) => {
      state.blockItems.push(action.payload);
    },
    addItem: (state, action) => {
      state.droppedItems.push(action.payload);
    },
    orderItems: (state, action) => {
      const { startIndex, endIndex } = action.payload;
      const [removed] = state.droppedItems.splice(startIndex, 1);
      console.log('removed', removed);

      state.droppedItems.splice(endIndex, 0, removed);
    },
    changeItemZone: (state, action) => {
      const item = state.droppedItems.find(
        (x) => x.droppedItemId === action.payload.droppedItemId
      );
      if (item) {
        console.log('aqui');
        item.droppedOver === action.payload.droppedOver
          ? null
          : (item.droppedOver = action.payload.droppedOver);
      }
    },
  },
});

export const selectedAllDroppedItems = (state) => state.items.droppedItems;
export const selectDroppedItemsById = (state, id) =>
  state?.items?.droppedItems?.filter((x) => {
    return x?.droppedOver === id;
  });

export const selectDroppedItemById = (state, id) => {
  const foundIndex = state.items.droppedItems.findIndex(
    (x) => x.droppedItemId === id
  );

  // console.log('index', foundIndex);

  // console.log('id', id);
  state?.items?.droppedItems?.find((x) => {
    // console.log(x?.droppedItemId === id);
    return x?.droppedItemId === id;
  });
};

// Action creators are generated for each case reducer function
export const {
  addItem,
  changeItemZone,
  addBlocks,
  orderItems,
} = itemsSlice.actions;

export default itemsSlice.reducer;
