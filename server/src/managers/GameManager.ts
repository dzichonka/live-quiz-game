import { randomUUID } from 'crypto';

export type Game = {
  id: string;
  code: string;
  ownerId: string;
  questions: any[];
};

class GameManager {
  private games = new Map<string, Game>();
  private codeToGameId = new Map<string, string>();

  createGame(ownerId: string, questions: any[]): Game {
    const code = this.generateCode();

    const game: Game = {
      id: randomUUID(),
      code,
      ownerId,
      questions,
    };

    this.games.set(game.id, game);
    this.codeToGameId.set(code, game.id);

    return game;
  }

  getByCode(code: string): Game | undefined {
    const gameId = this.codeToGameId.get(code);
    if (!gameId) return;
    return this.games.get(gameId);
  }

  private generateCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }

    if (this.codeToGameId.has(code)) {
      return this.generateCode();
    }

    return code;
  }
}

export const gameManager = new GameManager();
