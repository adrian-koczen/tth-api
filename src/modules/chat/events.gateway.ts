import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: ['*', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
  allowEIO3: true,
})
export class EventGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: { message: string }): string {
    return this.server.emit('message', data.message);
  }
}
