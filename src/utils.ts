import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { red } from 'chalk';

export const random = <T = unknown>(arr: T[]): T => arr[Math.round(Math.random() * (arr.length - 1))];

export const template = (templateName: string, data: Record<string, unknown> = {}) => {
  try {
    const templatePath = path.join(process.cwd(), 'src/templates', `${templateName}.hbs`);

    const source = fs.readFileSync(templatePath).toString();
    const buildTemplate = Handlebars.compile(source);

    return buildTemplate(data); 
  } catch(err) {
    console.log(red(err));
    return 'Invalid template';
  }
};

