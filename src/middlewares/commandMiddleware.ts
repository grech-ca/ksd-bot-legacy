import { Middleware } from 'middleware-io';
import { MessageContext } from 'vk-io';
import moment from 'moment';

import { random } from '../utils';
import { AppContext, WithAppContext } from '../index';
import * as commandController from '../controllers/commandController';

const commandMap: Record<string, keyof typeof commandController> = {
  'трахнуть': 'fuck',
  'помощь': 'help',
  'папочка': 'getDaddy',
};

const wrongCommandMessages = [
  'Не, нихуя',
  'Ха, думал, это сработает?',
  'Иди нахуй с такими запросами',
  'Ага, че еще скажешь?',
  `Бля, меня создали ${moment('20211106', 'YYYYMMDD').fromNow()}, ты серьёзно думаешь, что я умею так много?`,
  'Извини, занят, слушаю винил...',
];

const commandMiddleware: Middleware<WithAppContext<MessageContext>> = (ctx, next) => {
  const { text } = ctx;

  if (text?.startsWith('/')) {
    const command = text.slice(1).split(' ')[0];

    if (!command) return next();

    if (command in commandMap) {
      commandController[commandMap[command]]?.(ctx);
    } else {
      ctx.send(random(wrongCommandMessages));
    }
  }

  return next();
};

export default commandMiddleware;

