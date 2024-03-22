import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '@const';
import { Comment } from '@type/comment';


type CommentProps = {
  body: {
    comment: string;
    rating: number;
  };
  offerId: string;
}

export const fetchCommentsAction = createAsyncThunk<Comment[], string, { extra: AxiosInstance }>(
  'data/fetchComments',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Comment[]>(`${ApiRoute.Comments}/${offerId}`);
    return data;
  }
);

export const addCommentAction = createAsyncThunk<Comment, CommentProps, { extra: AxiosInstance }>(
  'data/addComment',
  async ({offerId, body}, { extra: api }) => {
    const { data } = await api.post<Comment>(`${ApiRoute.Comments}/${offerId}`, body);
    return data;
  }
);
