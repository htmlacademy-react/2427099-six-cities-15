import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '@type/comment';
import { RequestStatus } from '@const';
import { addCommentAction, fetchCommentsAction } from '@store/thunks/comments';

type CommentState = {
  comments: Comment[];
  status: RequestStatus;
}

const initialState: CommentState = {
  comments: [],
  status: RequestStatus.Idle
};

const commentsSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(addCommentAction.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.status = RequestStatus.Success;
      })
      .addCase(addCommentAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(addCommentAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      }),
  initialState,
  name: 'comments',
  reducers: {},
  selectors: {
    selectComments: (state: CommentState) => state.comments,
    selectCommentsStatus: (state: CommentState) => state.status
  }
});

const commentsActions = { ...commentsSlice.actions, fetchCommentsAction, addCommentAction };
const commentsSelectors = {...commentsSlice.selectors};

export { commentsActions, commentsSlice, commentsSelectors };
