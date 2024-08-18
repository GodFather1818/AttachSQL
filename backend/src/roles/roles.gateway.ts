import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Roles } from './roles.schema';


@WebSocketGateway({ cors: true })
export class RolesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('RolesGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  emitRoleAdded(role: Roles) {
    this.server.emit('roleAdded', role);
  }

  emitUserAssignedToRole(userId: string, role: any) {
    this.server.emit('userAssignedToRole', { userId, role });
  }

  emitRoleDeleted(role: Roles) {
    console.log("Emiiting Deleting Role Notifications!");
    this.server.emit('roleDeleted', role);
  }

  emitUpdatedRole(role:Roles) {
   console.log("Emittinng the Updated Role Functionality!") // Log this
    this.server.emit('roleUpdated', role);
  }
}
