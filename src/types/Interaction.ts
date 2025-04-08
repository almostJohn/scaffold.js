import type {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	MessageContextMenuCommandInteraction,
	UserContextMenuCommandInteraction,
} from "discord.js";
import type { CommandPayload, ArgumentsOf } from "./ArgumentsOf.js";

export type ChatInput<C extends CommandPayload> = {
	chatInput(
		interaction: ChatInputCommandInteraction<"cached">,
		args: ArgumentsOf<C>,
	): Promise<void> | void;
};

export type Autocomplete<C extends CommandPayload> = {
	autocomplete(
		interaction: AutocompleteInteraction<"cached">,
		args: ArgumentsOf<C>,
	): Promise<void> | void;
};

export type MessageContext<C extends CommandPayload> = {
	messageContext(
		interaction: MessageContextMenuCommandInteraction<"cached">,
		args: ArgumentsOf<C>,
	): Promise<void> | void;
};

export type UserContext<C extends CommandPayload> = {
	userContext(
		interaction: UserContextMenuCommandInteraction<"cached">,
		args: ArgumentsOf<C>,
	): Promise<void> | void;
};

export type Commands<C extends CommandPayload> = Autocomplete<C> &
	ChatInput<C> &
	MessageContext<C> &
	UserContext<C> & {
		[key: string]: any;
	};

export const enum CommandMethod {
	Autocomplete = "autocomplete",
	ChatInput = "chatInput",
	MessageContext = "messageContext",
	UserContext = "userContext",
}

type CommandMethodParameters<
	C extends CommandPayload = CommandPayload,
	T extends string = CommandMethod.ChatInput,
> = Parameters<Commands<C>[T]>;

export type InteractionParam<
	M extends CommandMethod = CommandMethod.ChatInput,
> = CommandMethodParameters<CommandPayload, M>[0];

export type ArgsParam<
	C extends CommandPayload,
	M extends CommandMethod = CommandMethod.ChatInput,
> = CommandMethodParameters<C, M>[1];
