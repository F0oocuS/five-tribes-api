import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class GameGateway {
	@WebSocketServer()
	server: Server;

	notifyPlayers(gameId: number) {
		this.server.to(`game_${gameId}`).emit('playerJoined', { gameId });
	}

	handleConnection(client: any) {

	}

	handleDisconnect(client) {

	}
}
