import fs from 'node:fs/promises';
import path from 'node:path';

import logger from '../services/logger.js';
import colors from 'colors';

export default async function loadInputCommands(arona) {
  const files = await fs.readdir(path.join(process.cwd(), 'src', 'commands', 'input'));

  for (const file of files) {
    if (!file.endsWith('.js')) continue;

    const { default: input } = await import(`../commands/input/${file}`);

    if (input && 'execute' in input && 'name' in input) {
      arona.inputcommands.set(input.name, input);
    } else {
      logger.failure('loader@input', `No valid property detected! File: ${colors.red(file)} are skipped.`);
    }
  }

  logger.success('loader@input', `Reloaded ${colors.green(arona.inputcommands.size)} of input commands.`);
}