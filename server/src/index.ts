import { WebSocketServer } from 'ws';
import { logSuccess } from './utils/logger';
import { handleReg } from './handlers/handleReg';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const wss = new WebSocketServer({ port: PORT });
logSuccess(`WebSocket server started on ws://localhost:${PORT}`);

wss.on('connection', (ws) => {
  logSuccess(`Client connected`);

  ws.send('Welcome to the WebSocket server!');

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message.toString());

      const { type, data } = parsed;

      switch (type) {
        case 'reg':
          handleReg(ws, data);
          break;

        default:
          ws.send(
            JSON.stringify({
              type: 'error',
              data: { message: 'Unknown type' },
              id: 0,
            }),
          );
      }
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: 'error',
          data: { message: 'Invalid JSON' },
          id: 0,
        }),
      );
    }
  });

  ws.on('close', () => {
    logSuccess(`Client disconnected`);
  });
});
