import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('NotificationGateway');

  afterInit(server: Server) {
    this.logger.log('NotificationGateway Initialized!');
  }

  // handleConnection(client: Socket) {
  //   const userId = client.handshake.query.userId as string;
  //   if (userId) {
  //     client.join(userId);
  //     this.logger.log(`Client connected: ${userId}`);
  //   } else {
  //     this.logger.log(`Client connected without userId: ${client.id}`);
  //   }
  // }
  handleConnection(client: Socket,...args:any) {
    this.logger.log(`Client connected: ${client.id}`);
  
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      client.leave(userId);
      this.logger.log(`Client disconnected: ${userId}`);
    } else {
      this.logger.log(`Client disconnected without userId: ${client.id}`);
    }
  }

  sendNotificationToUser(userId: string, notification: any) {
    this.logger.log(`Sending notification to user ${userId}`);
    this.server.to(userId).emit('notification', notification);
  }

  sendUnreadCountToUser(userId: string, unreadCount: number) {
    this.logger.log(`Sending unread count to user ${userId}: ${unreadCount}`);
    this.server.to(userId).emit('unreadCount', unreadCount);
  }
}