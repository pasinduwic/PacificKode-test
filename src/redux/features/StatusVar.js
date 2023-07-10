import { createSlice } from "@reduxjs/toolkit";

const StatusVar = {
  sidebarOpen: true,
  alertShowDetails: {
    status: false,
    type: "",
    message: ""
  },
  addModal: false,
  updateModal: false,
  deleteModal: false,
  tableLoader: true,
  refreshData: false
};

export const StatesVarSlice = createSlice({
  name: "statesVar",
  initialState: { value: StatusVar },
  reducers: {
    addSidebarOpen: (state, action) => {
      // console.log("action.payload");
      // console.log(action.payload);

      state.value.sidebarOpen = action.payload;
      // console.log(state.value.cartOpen);
    },

    addAlertDetails: (state, action) => {
      // console.log(action.payload);

      state.value.alertShowDetails = action.payload;
    },
    addModalTogal: (state, action) => {
      state.value.addModal = action.payload;
      // console.log("state.value.addModal");
      // console.log(state.value.addModal);
    },
    updateModalTogal: (state, action) => {
      state.value.updateModal = action.payload;
    },
    deleteModalTogal: (state, action) => {
      state.value.deleteModal = action.payload;
    },
    setTableLoader: (state, action) => {
      state.value.tableLoader = action.payload;
    },
    setRefresh: (state, action) => {
      state.value.refreshData = action.payload;
    }
  }
});

export const {
  addSidebarOpen,
  addAlertDetails,
  addModalTogal,
  updateModalTogal,
  deleteModalTogal,
  setTableLoader,
  setRefresh
} = StatesVarSlice.actions;
export default StatesVarSlice.reducer;
