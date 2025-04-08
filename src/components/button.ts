import {
	type APIButtonComponent,
	type APIMessageComponentEmoji,
	ButtonStyle,
	ComponentType,
	type APIButtonComponentBase,
} from "discord-api-types/v10";

export function createButton({
	customId,
	label,
	style,
	url,
	disabled,
	emoji,
}: {
	customId?: string | undefined;
	label: string;
	style?: ButtonStyle | undefined;
	url?: string | undefined;
	disabled?: boolean | undefined;
	emoji?: APIMessageComponentEmoji | undefined;
}): APIButtonComponent {
	const button: APIButtonComponentBase<any> = {
		type: ComponentType.Button,
		label,
		style: style ?? ButtonStyle.Primary,
		disabled,
		emoji,
	};

	if (style === ButtonStyle.Link && url) {
		return {
			...button,
			url,
		};
	}

	return {
		...button,
		custom_id: customId!,
	};
}
