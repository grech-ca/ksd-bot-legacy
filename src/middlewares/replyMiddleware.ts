import { Middleware } from 'middleware-io';
import { MessageContext } from 'vk-io';

import { WithAppContext } from '../index';
import * as replyController from '../controllers/replyController';

const phrases = [
  {
    regex: /^все любят деньги$/i,
    controller: replyController.pirozhkovMoney,
  },
  {
    regex: /^тудым$/i,
    controller: replyController.pirozhkovHereAndThere,
  },
  {
    regex: /^зацепила меня$/i,
    controller: replyController.pirozhkovAttractedMe,
  },
  {
    regex: /^ответ$/i,
    controller: replyController.answerKilled,
  },
  {
    regex: /^(у тебя есть ренджровер|у тебя есть вилла|у тебя есть айфон)/i,
    controller: replyController.doYouHave,
  },
  {
    regex: /^тебя послать или сам пойдешь/i,
    controller: replyController.sewOff,
  },
  {
    regex: /^милый/i,
    controller: replyController.honey,
  },
  {
    regex: /\?$/i,
    controller: replyController.question,
  },
];

const replyMiddleware: Middleware<WithAppContext<MessageContext>> = (ctx, next) => {
  if (!ctx.text) return next();

  for (let phrase of phrases) {
    if (phrase.regex.test(ctx.text)) {
      phrase.controller(ctx);
      return next();
    }
  }

  const MAX_RANDOM = 20;
  const shouldSayRandomPhrase = Math.round(Math.random() * MAX_RANDOM) === MAX_RANDOM;

  if (shouldSayRandomPhrase) replyController.randomPhrase(ctx);

  return next();
};

export default replyMiddleware;
