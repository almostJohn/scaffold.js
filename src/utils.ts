import { basename, extname } from "node:path";
import type { APIEmbed, APIEmbedField } from "discord-api-types/v10";
import type { CommandInfo } from "./types/Command.js";
import {
	EMBED_AUTHOR_NAME_LIMIT,
	EMBED_DESCRIPTION_LIMIT,
	EMBED_FIELD_LIMIT,
	EMBED_FIELD_NAME_LIMIT,
	EMBED_FIELD_VALUE_LIMIT,
	EMBED_FOOTER_TEXT_LIMIT,
	EMBED_TITLE_LIMIT,
} from "./constants.js";

export function commandInfo(path: string): CommandInfo | null {
	if (extname(path) !== ".js") {
		return null;
	}

	return { name: basename(path, ".js") } as const;
}

export function ellipsis(text: string, total: number) {
	if (text.length <= total) {
		return text;
	}

	const keep = total - 3;

	if (keep < 1) {
		return text.slice(0, total);
	}

	return `${text.slice(0, keep)}...`;
}

export function dynamicImport<T, R = () => Promise<{ default: T }>>(
	factory: () => Promise<any>,
) {
	return factory as unknown as R;
}

export function createEmbed(
	embed: APIEmbed,
	...data: APIEmbedField[]
): APIEmbed {
	return {
		...embed,
		fields: [...(embed.fields ?? []), ...data],
	};
}

export function truncateEmbed(embed: APIEmbed): APIEmbed {
	return {
		...embed,
		description: embed.description
			? ellipsis(embed.description, EMBED_DESCRIPTION_LIMIT)
			: undefined,
		title: embed.title ? ellipsis(embed.title, EMBED_TITLE_LIMIT) : undefined,
		author: embed.author
			? {
					...embed.author,
					name: ellipsis(embed.author.name, EMBED_AUTHOR_NAME_LIMIT),
			  }
			: undefined,
		footer: embed.footer
			? {
					...embed.footer,
					text: ellipsis(embed.footer.text, EMBED_FOOTER_TEXT_LIMIT),
			  }
			: undefined,
		fields: embed.fields
			? embed.fields
					.map((field) => ({
						...field,
						name: ellipsis(field.name, EMBED_FIELD_NAME_LIMIT),
						value: ellipsis(field.value, EMBED_FIELD_VALUE_LIMIT),
					}))
					.slice(0, EMBED_FIELD_LIMIT)
			: [],
	} as const;
}
