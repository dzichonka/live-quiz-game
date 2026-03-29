import { gameManager } from '../managers/GameManager';
import { connectionManager } from '../managers/ConnectionManager';
import { CreateGameData } from '../types';
import { WebSocket } from 'ws';
import { randomUUID } from 'crypto';

export function handleCreateGame(ws: WebSocket, data: CreateGameData) {
  const userId = connectionManager.findUserByWS(ws);

  const id = randomUUID();

  if (!userId) {
    ws.send(
      JSON.stringify({
        type: 'game_created',
        data: {
          error: true,
          errorText: 'Unauthorized',
        },
        id: id,
      }),
    );
    return;
  }

  const { questions } = data;

  if (!Array.isArray(questions) || questions.length === 0) {
    ws.send(
      JSON.stringify({
        type: 'game_created',
        data: {
          error: true,
          errorText: 'Invalid questions',
        },
        id: id,
      }),
    );
    return;
  }

  const game = gameManager.createGame(userId, questions);

  ws.send(
    JSON.stringify({
      type: 'game_created',
      data: {
        code: game.code,
        error: false,
        errorText: '',
      },
      id: id,
    }),
  );
  console.log(`Game created with code: ${game.code} by user: ${userId}`);
}
