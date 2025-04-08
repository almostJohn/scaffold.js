import { container } from "tsyringe";
import { Command } from "../Command.js";
import type { CommandPayload } from "../types/ArgumentsOf.js";

export const kCommands = Symbol("Commands");

export function createCommands<C extends Command = Command<CommandPayload>>() {
	const commands = new Map<string, C>();
	container.register(kCommands, { useValue: commands });
}
