import { ServerMessageMap, WSMessage } from '../types';
import { WebSocket } from 'ws';
import { generateID } from './generateID';

export function sendMessage<T extends keyof ServerMessageMap>(
  ws: WebSocket,
  type: T,
  data: ServerMessageMap[T],
) {
  const message: WSMessage<T> = {
    type,
    data,
    id: generateID(),
  };

  ws.send(JSON.stringify(message));
}
