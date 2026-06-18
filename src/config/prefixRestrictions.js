/**
 * Prefix command restrictions — dashboard and advanced setup flows stay slash-only.
 */

export const BOT_PREFIX = 'r!';

export function setupPrefixCommands(client) {
  client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(BOT_PREFIX)) return;

    const raw = message.content.slice(BOT_PREFIX.length).trim();
    if (!raw.length) return;

    const parts = raw.split(/\s+/);
    const commandName = parts.shift().toLowerCase();
    const args = parts;

    const command =
      client.commands.get(commandName) ||
      client.commands.find((cmd) => Array.isArray(cmd.aliases) && cmd.aliases.includes(commandName));

    if (!command) return;

    const restriction = getPrefixRestriction(command, args, (alias) => alias);
    if (restriction.blocked) {
      return message.reply(restriction.reason);
    }

    try {
      if (typeof command.execute === 'function') {
        await command.execute(message, args);
      } else if (typeof command.run === 'function') {
        await command.run(message, args);
      } else {
        await message.reply('This command cannot be run with a prefix.');
      }
    } catch (error) {
      console.error(error);
      await message.reply('There was an error while executing that command.');
    }
  });
}

export const SLASH_ONLY_COMMANDS = new Set([]);

/**
 * Returns whether a prefix invocation should be rejected.
 * @param {object} command - Loaded command module
 * @param {string[]} args - Parsed prefix arguments (after command name)
 * @param {(name: string) => string} resolveSubcommandAlias
 * @returns {{ blocked: boolean, reason?: string }}
 */
export function getPrefixRestriction(command, args, resolveSubcommandAlias) {
  return { blocked: false };
}

export function isPrefixRestrictedCommand(command, args, resolveSubcommandAlias) {
  return false;
}
