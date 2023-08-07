import { Event } from './event';

const handlers = {
	'pusher:connection_established': (data) => {
		return new Event('connected', JSON.parse(data.data));
	},
	'pusher_internal:subscription_succeeded': (data) => {
		return new Event('subbed', { channel: data.channel });
	},
	'App\\Events\\ChatMessageEvent': (data) => {
		return new Event('message', JSON.parse(data.data));
	},
};

export default handlers;
