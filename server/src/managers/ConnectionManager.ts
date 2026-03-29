import { WebSocket } from 'ws';

class ConnectionManager {
  private connections = new Map<string, WebSocket>();

  add(userId: string, ws: WebSocket) {
    this.connections.set(userId, ws);
  }

  get(userId: string) {
    return this.connections.get(userId);
  }

  remove(userId: string) {
    this.connections.delete(userId);
  }

  findUserByWS(ws: WebSocket): string | undefined {
    for (const [id, socket] of this.connections) {
      if (socket === ws) return id;
    }
  }
}

export const connectionManager = new ConnectionManager();
