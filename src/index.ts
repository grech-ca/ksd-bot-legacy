import { createConnection, Connection } from "typeorm";
import { VK, Context, MessageContext } from 'vk-io';
import { Middleware } from 'middleware-io';
import { HearManager } from '@vk-io/hear';
import { red, green } from 'chalk';
import * as dotenv from 'dotenv';
import moment from 'moment';
import "reflect-metadata";
import 'moment/locale/ru';

import { replyController } from './controllers';
import { userMiddleware, achievementMiddleware, commandMiddleware, replyMiddleware } from './middlewares';

export interface AppContext {
  connection: Connection;
  vk: VK;
}

export type WithAppContext<Ctx> = AppContext & Ctx;

interface WithContext {
  (handler: Middleware<WithAppContext<MessageContext>>): Middleware<WithAppContext<MessageContext>>;
}

dotenv.config();
moment.locale('ru');

const isDevelopment = process.env.NODE_ENV !== 'production';

const vk = new VK({
  token: process.env.TOKEN!,
});

const bot = new HearManager();

createConnection().then(async connection => {
  const withContext: WithContext = handler => (context, next) => handler(Object.assign(context, { connection, vk }), next);

  vk.updates.on('message_new', bot.middleware);
  vk.updates.on('message', withContext(userMiddleware));
  vk.updates.on('message', withContext(achievementMiddleware));
  vk.updates.on('message', withContext(commandMiddleware));
  vk.updates.on('message', withContext(replyMiddleware));

  if (!isDevelopment) {
    vk.api.messages.send({
      chat_id: 1,
      random_id: Date.now(),
      message: 'Я проснулся',
    });
  }

  vk.updates.start().then(() => {
    console.log(green('Bot has started'));
  }).catch(err => {
    console.log(red(err));
  });
  
}).catch(error => console.log(error));

