import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://api.spacexdata.com/v3/missions';
export const getMissions = createAsyncThunk('missions/getMissions', async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
});

const initialState = {
  missions: [],
  isLoading: false,
  errorMessage: '',
};

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    joinMissions: (state, action) => {
      const getId = action.payload;
      const missionId = state.missions.findIndex(
        (mission) => mission.mission_id === getId,
      );

      if (missionId != null) {
        const updateMissions = { ...state.missions[missionId], reserved: true };
        state.missions[missionId] = updateMissions;
      }
    },
    leaveMissions: (state, action) => {
      const getId = action.payload;
      const missionId = state.missions.findIndex(
        (mission) => mission.mission_id === getId,
      );

      if (missionId != null) {
        const updateMissions = {
          ...state.missions[missionId],
          reserved: false,
        };
        state.missions[missionId] = updateMissions;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMissions.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getMissions.fulfilled, (state, action) => {
        const missions = action.payload.map((item) => ({
          mission_id: item.mission_id,
          mission_name: item.mission_name,
          description: item.description,
          reserved: false,
        }));
        state.missions = missions;
        state.isLoading = true;
      })

      .addCase(getMissions.rejected, (state, action) => {
        state.isLoading = true;
        state.missions = action.payload;
      });
  },
});

export const { joinMissions, leaveMissions } = missionsSlice.actions;
export default missionsSlice.reducer;
