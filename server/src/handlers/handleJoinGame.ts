import { connectionManager } from '../managers/ConnectionManager';
import { gameManager } from '../managers/GameManager';
import { JoinGameData, ServerMessageType } from '../types';
import { sendMessage } from '../utils/sendMessage';
import { WebSocket } from 'ws';

export function handleJoinGame(ws: WebSocket, data: JoinGameData) {
  const userId = connectionManager.findUserByWS(ws);

  if (!userId) {
    sendMessage(ws, ServerMessageType.ERROR, { message: 'Unauthorized' });
    return;
  }

  const { code } = data;

  const game = gameManager.getByCode(code);

  if (!game) {
    sendMessage(ws, ServerMessageType.ERROR, { message: 'Game not found' });
    return;
  }

  gameManager.joinGame(game, userId);

  sendMessage(ws, ServerMessageType.GAME_JOINED, {
    gameId: game.id,
  });

  // broadcastPlayers(game.id);
}
