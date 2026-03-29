import { ServerMessageType, RegData } from '../types';
import { WebSocket } from 'ws';
import { connectionManager } from '../managers/ConnectionManager';
import { userManager } from '../managers/UserManager';
import { sendMessage } from '../utils/sendMessage';

export function handleReg(ws: WebSocket, data: RegData) {
  const { name, password } = data;

  const user = userManager.createOrLogin(name, password);

  connectionManager.add(user.index, ws);

  sendMessage(ws, ServerMessageType.REG, {
    name: user.name,
    index: user.index,
    error: false,
    errorText: '',
  });
}
