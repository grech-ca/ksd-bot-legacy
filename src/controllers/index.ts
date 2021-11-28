import { MessageContext } from 'vk-io';

import * as replyController from './replyController';
import * as commandController from './commandController';
import { AppContext, WithAppContext } from '../index';

export interface ControllerHandler {
  (context: AppContext): void;
}

export interface MessageHandler {
  (context: WithAppContext<MessageContext>): void;
}

export {
  replyController,
  commandController,
};

