import { NextMiddleware } from 'middleware-io';

import { AppContext } from '../index';

const achievementMiddleware = (ctx: AppContext, next: NextMiddleware) => {
  return next();
};

export default achievementMiddleware;

