import { Context } from 'vk-io';

const achievementMiddleware = (ctx: Context, next) => {
  return next();
};

export default achievementMiddleware;

