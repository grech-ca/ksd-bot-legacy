import { incline } from 'lvovich';

import { ControllerHandler, MessageHandler } from './index';
import { random, template } from '../utils';

export const fuck: MessageHandler = async ctx => {
  const { text, vk, senderId } = ctx;
  console.log(ctx);
  const args = text.split(' ').slice(1);

  const target = args[0];
  const targetId = target?.slice(3, target.length -1).split('|')[0];

  const users = await vk.api.users.get({ user_ids: [targetId, senderId.toString()]});

  console.log(users);

  const active = users.find(({ id }) => id === senderId); 
  const passive = users.find(({ id }) => id === Number(targetId));

  const activeIncline = incline({ first: active?.first_name, last: active?.last_name }, 'nominative');
  const passiveIncline = incline({ first: passive?.first_name, last: passive?.last_name }, 'accusative');

  const activeName = `${activeIncline.first} ${activeIncline.last}`;
  const passiveName = `${passiveIncline.first} ${passiveIncline.last}`;

  if (!passive || active.id === passive.id) return ctx.send(`${activeName} дрочит`);

  const message = `${activeName} трахнул ${passiveName}`;

  ctx.send(message);
};

export const help: MessageHandler = async ctx => {
  ctx.send(template('help'));
};

export const getDaddy: MessageHandler = async ctx => {
  const daddyId = '363021437';

  const [daddy] = await ctx.vk.api.users.get({ user_ids: [daddyId], fields: ['domain'] });

  ctx.send(`@${daddy.domain}(${daddy.first_name} ${daddy.last_name})`);
};

