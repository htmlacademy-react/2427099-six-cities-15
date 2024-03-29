import { internet, name } from 'faker';
import { User } from '@type/user';

export const makeFakeUser = (): User => ({
  name: name.title(),
  avatarUrl: internet.avatar(),
  isPro: false,
  email: internet.email(),
  token: 'secret'
});
