import type {
	ApplicationCommandOptionType,
	ApplicationCommandType,
} from "discord-api-types/v10";
import {
	Attachment,
	GuildChannel,
	GuildMember,
	User,
	Role,
	Message,
} from "discord.js";

export type CommandPayload = Readonly<{
	name: string;
	type?: ApplicationCommandType | undefined;
}>;

type Option = Readonly<
	{
		name: string;
		required?: boolean | undefined;
	} & (
		| {
				choices?:
					| readonly Readonly<{ name: string; value: number }>[]
					| undefined;
				type:
					| ApplicationCommandOptionType.Integer
					| ApplicationCommandOptionType.Number;
		  }
		| {
				choices?:
					| readonly Readonly<{ name: string; value: string }>[]
					| undefined;
				type: ApplicationCommandOptionType.String;
		  }
		| {
				options?: readonly Option[] | undefined;
				type:
					| ApplicationCommandOptionType.Subcommand
					| ApplicationCommandOptionType.SubcommandGroup;
		  }
		| {
				type:
					| ApplicationCommandOptionType.Attachment
					| ApplicationCommandOptionType.Boolean
					| ApplicationCommandOptionType.Channel
					| ApplicationCommandOptionType.Mentionable
					| ApplicationCommandOptionType.Role
					| ApplicationCommandOptionType.User;
		  }
	)
>;

type UnionToIntersection<U> = (
	U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
	? I
	: never;

type TypeIdToType<T, O, C> = T extends ApplicationCommandOptionType.Subcommand
	? ArgumentsOfRaw<O>
	: T extends ApplicationCommandOptionType.SubcommandGroup
	? ArgumentsOfRaw<O>
	: T extends ApplicationCommandOptionType.String
	? C extends readonly { value: string }[]
		? C[number]["value"]
		: string
	: T extends
			| ApplicationCommandOptionType.Integer
			| ApplicationCommandOptionType.Number
	? C extends readonly { value: number }[]
		? C[number]["value"]
		: number
	: T extends ApplicationCommandOptionType.Boolean
	? boolean
	: T extends ApplicationCommandOptionType.User
	? { member?: GuildMember | undefined; user: User }
	: T extends ApplicationCommandOptionType.Channel
	? GuildChannel
	: T extends ApplicationCommandOptionType.Role
	? Role
	: T extends ApplicationCommandOptionType.Mentionable
	? Role | { member?: GuildMember | undefined; user: User } | undefined
	: T extends ApplicationCommandOptionType.Attachment
	? Attachment
	: never;

type OptionToObject<O> = O extends {
	choices?: infer C | undefined;
	name: infer K;
	options?: infer O | undefined;
	required?: infer R | undefined;
	type: infer T;
}
	? K extends string
		? R extends true
			? { [k in K]: TypeIdToType<T, O, C> }
			: T extends
					| ApplicationCommandOptionType.Subcommand
					| ApplicationCommandOptionType.SubcommandGroup
			? { [k in K]: TypeIdToType<T, O, C> }
			: { [k in K]?: TypeIdToType<T, O, C> | undefined }
		: never
	: never;

type ArgumentsOfRaw<O> = O extends any[]
	? UnionToIntersection<OptionToObject<O>>
	: never;

export type ArgumentsOf<C extends CommandPayload> = C extends {
	options: readonly Option[];
}
	? UnionToIntersection<OptionToObject<C["options"][number]>>
	: C extends { type: ApplicationCommandType.Message }
	? { message: Message<true> }
	: never;
