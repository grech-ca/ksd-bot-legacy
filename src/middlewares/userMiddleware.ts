import { Middleware } from 'middleware-io';

import User from '../entity/User';
import { AppContext } from '../index';

const userMiddleware: Middleware<AppContext> = async ({ connection, senderId, senderType }, next) => {
  const userRepository = connection.getRepository(User);

  if (senderType === 'user' && senderId) {
    const userExists = await userRepository.findOne(senderId);
    
    if (!userExists) {
      const user = await userRepository.create({ id: senderId });

      await userRepository.save(user);
    };
  }

  next();
};

export default userMiddleware;

