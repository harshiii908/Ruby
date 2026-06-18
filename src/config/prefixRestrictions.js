import { BOT_PREFIX } from './path-to-your-file.js'; // Import the prefix

client.on('messageCreate', async (message) => {
    // Check if the message starts with "r!"
    if (message.author.bot || !message.content.startsWith(BOT_PREFIX)) return;

    // Parse your arguments and command name
    const args = message.content.slice(BOT_PREFIX.length).trim().split(/+/);
    const commandName = args.shift().toLowerCase();

    // Fetch the loaded command object...
    const command = client.commands.get(commandName); 
    if (!command) return;

    // Check restrictions before running the command
    const restriction = getPrefixRestriction(command, args, (alias) => alias);
    if (restriction.blocked) {
        return message.reply(restriction.reason);
    }

    // Execute command here...
});
