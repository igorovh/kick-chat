export class Event {
	name: EventName;
	data: any;

	constructor(name: EventName, data: any) {
		this.name = name;
		this.data = data;
	}
}

type EventName = 'connected' | 'subbed' | 'message';
