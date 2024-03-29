import { internet, lorem, name } from 'faker';
import { User } from '@type/user';
import { Comment } from '@type/comment';

export const makeFakeUser = (): User => ({
  name: name.title(),
  avatarUrl: internet.avatar(),
  isPro: false,
  email: internet.email(),
  token: 'secret'
});

export const makeFakeComment = (): Comment => ({
  id: crypto.randomUUID(),
  date: new Date().toISOString(),
  user: {
    name: name.title(),
    avatarUrl: internet.avatar(),
    isPro: false,
  },
  comment: lorem.text(),
  rating: Math.floor(Math.random() * 5) + 1,
});
