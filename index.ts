import { VK } from 'vk-io';
import { HearManager } from '@vk-io/hear';
import { red, green } from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const vk = new VK({
  token: process.env.TOKEN!,
});

const bot = new HearManager();

vk.updates.on('message_new', bot.middleware);

bot.hear(/эй хуйня/i, message => {
  console.log(message);
  message.send('Сам хуйня');
});

console.log(green('Bot has started'));

vk.updates.start().catch(err => {
  console.log(red(err));
});

