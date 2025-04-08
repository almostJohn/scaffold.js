import type { Webhook } from "discord.js";
import { container } from "tsyringe";

export const kWebhooks = Symbol("Webhooks");

export function createWebhooks<W extends Webhook = Webhook>() {
	const webhooks = new Map<string, W>();
	container.register(kWebhooks, { useValue: webhooks });

	return webhooks;
}
