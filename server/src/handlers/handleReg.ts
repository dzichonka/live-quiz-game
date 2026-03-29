import { RegData } from '../types';
import { WebSocket } from 'ws';
import { connectionManager } from '../managers/ConnectionManager';
import { userManager } from '../managers/UserManager';

export function handleReg(ws: WebSocket, data: RegData) {
  const { name, password } = data;

  const user = userManager.createOrLogin(name, password);

  connectionManager.add(user.index, ws);

  ws.send(
    JSON.stringify({
      type: 'reg',
      data: {
        name: user.name,
        index: user.index,
        error: false,
        errorText: '',
      },
      id: 0,
    }),
  );
}
