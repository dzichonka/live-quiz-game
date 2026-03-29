import { gameManager } from '../managers/GameManager';
import { connectionManager } from '../managers/ConnectionManager';
import { CreateGameData, ServerMessageType } from '../types';
import { WebSocket } from 'ws';
import { sendMessage } from '../utils/sendMessage';

export function handleCreateGame(ws: WebSocket, data: CreateGameData) {
  const userId = connectionManager.findUserByWS(ws);

  if (!userId) {
    sendMessage(ws, ServerMessageType.ERROR, {
      message: 'User not registered',
    });
    return;
  }

  const { questions } = data;

  if (!Array.isArray(questions) || questions.length === 0) {
    sendMessage(ws, ServerMessageType.ERROR, {
      message: 'At least one question is required',
    });
    return;
  }

  const game = gameManager.createGame(userId, questions);
  sendMessage(ws, ServerMessageType.GAME_CREATED, {
    gameId: game.id,
    code: game.code,
  });
  console.log(`Game created with code: ${game.code} by user: ${userId}`);
}
