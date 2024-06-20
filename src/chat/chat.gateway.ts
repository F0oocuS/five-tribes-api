import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
	cors: {
		origin: 'http://localhost:4200',
		methods: ['GET', 'POST'],
		credentials: true
	}
})
export class ChatGateway {
	@WebSocketServer()
	server: Server;

	@SubscribeMessage('message')
	handleMessage(@MessageBody() message: string): void {
		this.server.emit('message', message);
	}
}
