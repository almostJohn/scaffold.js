import type { CommandPayload } from "./types/ArgumentsOf.js";
import type {
	ArgsParam,
	InteractionParam,
	CommandMethod,
	Commands,
} from "./types/Interaction.js";

export abstract class Command<C extends CommandPayload = CommandPayload>
	implements Commands<C>
{
	public constructor(public readonly name?: C["name"][]) {}

	public chatInput(
		_interaction: InteractionParam<CommandMethod.ChatInput>,
		_args: ArgsParam<C, CommandMethod.ChatInput>,
	): Promise<void> | void {
		console.log(
			`Received chat input for command: ${_interaction.commandName}, but the command does not handle chat input.`,
		);
	}

	public autocomplete(
		_interaction: InteractionParam<CommandMethod.Autocomplete>,
		_args: ArgsParam<C, CommandMethod.Autocomplete>,
	): Promise<void> | void {
		console.log(
			`Received autcompelete for command: ${_interaction.commandName}, but the command does not handle autocomplete.`,
		);
	}

	public messageContext(
		_interaction: InteractionParam<CommandMethod.MessageContext>,
		_args: ArgsParam<C, CommandMethod.MessageContext>,
	): Promise<void> | void {
		console.log(
			`Received message context for command: ${_interaction.commandName}, but the command does not handle message context.`,
		);
	}

	public userContext(
		_interaction: InteractionParam<CommandMethod.UserContext>,
		_args: ArgsParam<C, CommandMethod.UserContext>,
	): Promise<void> | void {
		console.log(
			`Received user context for command: ${_interaction.commandName}, but the command does not handle user context.`,
		);
	}
}
