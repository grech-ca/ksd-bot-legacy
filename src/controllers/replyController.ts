import delay from 'delay';

import { MessageHandler } from './index';
import { random } from '../utils';

export const pirozhkovMoney: MessageHandler = ctx => {
  const messages = [
    'только не я...',
    'а я тебя 😘',
    'кто ж не любит деньги?',
    'это всего лишь деньги.',
  ];

  ctx.send(random(messages));
};

export const pirozhkovHereAndThere: MessageHandler = ctx => ctx.send('сюдым');

export const honey: MessageHandler = ctx => ctx.send('тебя послать или сам пойдешь');

export const pirozhkovAttractedMe: MessageHandler = ctx => {
  const messages = [
    'ослепила меня',
    'до порога довела',
    'a любви не дала',
    'соблазнила меня',
  ];

  ctx.send(random(messages));
};

export const question: MessageHandler = ctx => {
  const messages = [
    'Загадка Жака Фреско',
    'На размышление дается 30 секунд',
    'Загадка Жака Фреско. На размышление дается 30 секунд',
    'Мне на эту хуйню отвечать?',
  ];

  const MAX_RANDOM = 10;
  const shouldSend = Math.round(Math.random() * MAX_RANDOM) === MAX_RANDOM;

  if (shouldSend) ctx.send(random(messages));
};

export const answerKilled: MessageHandler = ctx => {
  ctx.send('убил...');
};

export const doYouHave: MessageHandler = ctx => ctx.send('нет');
export const sewOff: MessageHandler = async ctx => {
  ctx.send('То есть ты мне предлагаешь продать ферарри');
  await delay(1000);
  ctx.send('И купить ренджеровер');
  await delay(1000);
  ctx.send('Продать BlackBerry');
  await delay(1000);
  ctx.send('И купить айфон');
  await delay(1000);
  ctx.send('Продать квартиру и купить виллу');
};

export const randomPhrase: MessageHandler = ctx => {
  const messages = [
    'пон)',
    'я псих',
    'я псих)',
    'я грубиян, сексист и хам',
    'хуйню написал',
    'я пидорас',
    'ты больше не армянин',
    'внатуре?',
    'кек',
    'сам понял че сказал?',
    'ты это... помойся е-мое)',
    'обама',
    'Так бы сказал Андрей Сталин',
    'сверху пидор',
  ];

  ctx.send(random(messages));
};

