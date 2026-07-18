import logger from '../services/logger.js';
import colors from 'colors';

import { Events, inlineCode } from 'discord.js';
import config from '../../config.json' with { type: 'json' };

export default {
  name: Events.MessageCreate,
  once: false,

  async execute(arona, message) {
    if (message.author.bot) return;

    const { Settings, Colours } = config;
    if (!message.content.startsWith(Settings.prefix)) return;

    const args = message.content.slice(Settings.prefix.length).trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();

    // ... Initialize The Given Command(s)
    const command = arona.inputcommands.get(commandName) || arona.inputcommands.find((input) => input.aliases?.includes(commandName));
    if (!command) return;

    try {
      await command.execute(arona, message, args);
    } catch (error) {
      logger.error('core@system', `Cannot process the ${colors.red(command.name.toUpperCase())} input command!`);
      logger.error('core@system', `Output: ${colors.gray(error.message)}`);

      return await message.reply({
        content: `${inlineCode(`[🔴] PROCESS TERMINATED WITH EXIT CODE 404`)}`
      });
    }
  }
};