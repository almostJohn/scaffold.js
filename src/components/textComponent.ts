import {
	type APITextInputComponent,
	TextInputStyle,
	ComponentType,
} from "discord-api-types/v10";

export function createTextComponent({
	customId,
	label,
	maxLength,
	minLength,
	placeholder,
	required,
	style,
	value,
}: {
	customId: string;
	label: string;
	maxLength?: number | undefined;
	minLength?: number | undefined;
	placeholder?: string | undefined;
	required?: boolean | undefined;
	style?: TextInputStyle | undefined;
	value?: string | undefined;
}): APITextInputComponent {
	return {
		type: ComponentType.TextInput,
		custom_id: customId,
		label,
		max_length: maxLength,
		min_length: minLength,
		placeholder,
		required: required ?? false,
		style: style ?? TextInputStyle.Paragraph,
		value,
	} as const;
}
