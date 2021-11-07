import { Context } from 'vk-io';

export const offend = (context: Context, next) => {
  context.send('Сам хуйня');

  return next();
};

