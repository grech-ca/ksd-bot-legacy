import { Middleware } from 'middleware-io';
import { MessageContext } from 'vk-io';

import User from '../entity/User';
import { AppContext, WithAppContext } from '../index';

const userMiddleware: Middleware<WithAppContext<MessageContext>> = async ({ connection, senderId, senderType }, next) => {
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

