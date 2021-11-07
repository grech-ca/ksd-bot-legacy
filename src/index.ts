import { createConnection, Connection } from "typeorm";
import { VK, Context } from 'vk-io';
import { Middleware } from 'middleware-io';
import { HearManager } from '@vk-io/hear';
import { red, green } from 'chalk';
import * as dotenv from 'dotenv';
import "reflect-metadata";

import { replyController } from './controllers';
import { userMiddleware, achievementMiddleware } from './middlewares';

export interface AppContext extends Context {
  connection: Connection;
  vk: VK;
}

interface WithContext {
  (handler: Middleware<AppContext>): Middleware<AppContext>;
}

interface WithoutReturn {
  (handler: Middleware<AppContext>): Middleware<AppContext>;
}

dotenv.config();

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

  if (!isDevelopment) {
    vk.api.messages.send({
      chat_id: 1,
      random_id: Date.now(),
      message: 'Я проснулся',
    });
  }

  bot.hear(/эй хуйня/i, replyController.offend);

  vk.updates.start().then(() => {
    console.log(green('Bot has started'));
  }).catch(err => {
    console.log(red(err));
  });
  
}).catch(error => console.log(error));
