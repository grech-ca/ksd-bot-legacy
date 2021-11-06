import { VK } from 'vk-io';
import { HearManager } from '@vk-io/hear';
import { red, green } from 'chalk';
import * as dotenv from 'dotenv';

dotenv.config();

const isDevelopment = process.env.NODE_ENV !== 'production';

const vk = new VK({
  token: process.env.TOKEN!,
});

const bot = new HearManager();

vk.updates.on('message_new', bot.middleware);

if (!isDevelopment) {
  vk.api.messages.send({
    chat_id: 1,
    random_id: Date.now(),
    message: 'Я проснулся',
  });
}

bot.hear(/эй хуйня/i, message => {
  console.log(message);
  message.send('Сам хуйня');
});

console.log(green('Bot has started'));

vk.updates.start().catch(err => {
  console.log(red(err));
});

