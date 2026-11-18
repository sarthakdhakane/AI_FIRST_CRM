import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hcpName: "",
  interactionType: "",
  interactionDate: "",
  interactionTime: "",
  attendees: "",
  topicsDiscussed: "",
  voiceSummary: "",
  materialsShared: "",
  samplesDistributed: "",
  sentiment: "",
  outcomes: "",
  followUpActions: "",
  aiSuggestedFollowUps: [],
};

const interactionSlice = createSlice({
  name: "interaction",

  initialState,

  reducers: {
    // Replace the whole interaction (Log Interaction Tool)
    updateInteraction: (state, action) => {
      Object.assign(state, action.payload);
    },

    // Update only one field (Edit Interaction Tool)
    updateField: (state, action) => {
      const { field, value } = action.payload;

      if (field in state) {
        state[field] = value;
      }
    },

    clearInteraction: () => initialState,
  },
});

export const {
  updateInteraction,
  updateField,
  clearInteraction,
} = interactionSlice.actions;

export default interactionSlice.reducer;
