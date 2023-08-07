import * as EventEmitter from 'events';
import { API_URL } from './constants';
import handlers from './events/handlers';

type ClientOptions = {
	channels: number[];
	debug?: boolean;
};

//https://kick.com/api/v1/channels/igor_ovh - chat room id

export class Client extends EventEmitter {
	private _socket: any; // Browser WebSocket
	private _options: ClientOptions;
	private connected = false;

	constructor(options: ClientOptions) {
		super();

		this._options = options;
	}

	connect() {
		if (this.connected) {
			return this.log('Client is already connected');
		}
		this.connected = true; // Try Catch and check when is not

		this._socket = new WebSocket(API_URL); // Browser WebSocket

		this._socket.onclose = () => {
			this.connected = false;
			this.log('Socket closed. Trying to reconnect in 10 seconds');
			setTimeout(() => this.connect(), 10000);
		};

		this._socket.onopen = () => {
			this.log('Connected to server');

			this._socket.onmessage = (message) => {
				message = JSON.parse(message.data);

				const event = handlers[message.event](message);
				if (!event) return;

				this.emit(event.name, event.data);
			};

			this._options.channels.forEach((id) => {
				this.log('Joining channel: ' + id);
				this._socket.send(
					JSON.stringify({
						event: 'pusher:subscribe',
						data: {
							channel: `chatrooms.${id}.v2`,
							auth: '',
						},
					})
				);
			});
		};
	}

	close() {
		if (!this.connected) return;
		this._socket.close();
		this._socket = null;
		this.connected = false;
	}

	private log(message: string) {
		if (this._options.debug) console.info(message);
	}
}
