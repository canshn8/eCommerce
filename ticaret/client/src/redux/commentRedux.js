import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments:[],
    total: 0,
  },
  reducers: {
    addCommentSuccess: (state, action) => {
      state.quantity += 1;
      state.comments.push(action.payload);
    },
    
    getCommentSuccess: (state, action) => {
      state.comments = action.payload;
    },

    updateComment: (state, action) => {
        state.isFetching = false;
        state.comments[state.comments.findIndex((item) => item._id === action.payload.id)] = action.payload.comment;
    },
    
    removeComment: (state, action) => {
        let index = state.comments.indexOf(action.payload);
        state.total -= action.payload
        state.comments.splice(index, 1)
        state.comments = [...state.comments] 
    },
  },
});

export const {addCommentSuccess, getCommentSuccess,updateComment, removeComment} = commentSlice.actions;
export default commentSlice.reducer;