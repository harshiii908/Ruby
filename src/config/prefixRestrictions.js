/**
 * Prefix command restrictions
 * All commands are allowed through prefix commands.
 */

export const SLASH_ONLY_COMMANDS = new Set();
export const GLOBAL_BLOCKED_SUBCOMMANDS = new Set();
export const GLOBAL_BLOCKED_SUBCOMMAND_GROUPS = new Set();
export const COMMAND_BLOCKED_SUBCOMMANDS = {};

export function getPrefixRestriction() {
  return { blocked: false };
}

export function isPrefixRestrictedCommand() {
  return false;
}
