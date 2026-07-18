import logger from '../services/logger.js';
import colors from 'colors';

import { Events } from 'discord.js';

export default {
  name: Events.ClientReady,
  once: true,

  execute(arona) {
    logger.info('core@system', `${colors.cyan(arona.user.tag)} are now Online! ${colors.green('(OK)')}`);
  }
};