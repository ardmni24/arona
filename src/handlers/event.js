import fs from 'node:fs/promises';
import path from 'node:path';

export default async function loadEvents(arona) {
  const files = await fs.readdir(path.join(process.cwd(), 'src', 'events'));

  for (const file of files) {
    if (!file.endsWith('.js')) continue;

    const event = (await import(`../events/${file}`)).default;

    if (event.once) {
      arona.once(event.name, (...args) => event.execute(arona, ...args));
    } else {
      arona.on(event.name, (...args) => event.execute(arona, ...args));
    }
  }
}