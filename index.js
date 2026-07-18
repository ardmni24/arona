import 'dotenv/config';

import { Client, GatewayIntentBits, Partials, ActivityType, DefaultUserAgentAppendix, Collection } from 'discord.js';

import loadInputCommands from './src/handlers/input.js';
import loadEvents from './src/handlers/event.js';

import logger from './src/services/logger.js';
import colors from 'colors';

const arona = new Client({
  intents: [
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildExpressions,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
    Partials.User
  ],
  presence: {
    status: 'dnd',
    activities: [{
      name: 'Schale Archive: Arona\'s Hideout',
      type: ActivityType.Listening
    }]
  },
  allowedMentions: {
    parse: ['users', 'roles'],
    repliedUser: false
  },
  rest: {
    agent: null,
    api: 'https://discord.com/api',
    cdn: 'https://cdn.discordapp.com',
    globalRequestsPerSecond: 50,
    handlerSweepInterval: 3_600_000,
    hashLifetime: 86_400_000,
    hashSweepInterval: 14_400_000,
    invalidRequestWarningInterval: 0,
    mediaProxy: 'https://media.discordapp.net',
    offset: 50,
    rejectOnRateLimit: null,
    retries: 3,
    timeout: 15_000,
    userAgentAppendix: DefaultUserAgentAppendix,
    version: '10'
  },
  ws: {
    large_threshold: null,
    version: '10'
  },
  enforceNonce: false,
  failIfNotExists: true,
  closeTimeout: 5_000,
  waitGuildTimeout: 15_000
});

arona.inputcommands = new Collection();
arona.slashcommands = new Collection();

logger.info('core@system', 'Starting up session(s), please wait...');

await loadInputCommands(arona);
await loadEvents(arona);

await arona.login(process.env.TOKEN).catch((error) => {
  logger.error('core@system', `Unable to login because an invalid ${colors.red('TOKEN')} was provided!`);
  process.exit(1);
});