import type { WebSocket } from 'ws';

export interface Player {
  name: string;
  index: string;
  score: number;
  ws?: WebSocket;
  hasAnswered?: boolean;
  answerTime?: number;
  answeredCorrectly?: boolean;
}

export interface Question {
  text: string;
  options: string[];
  correctIndex: number;
  timeLimitSec: number;
}

export interface Game {
  id: string;
  code: string;
  hostId: string;
  questions: Question[];
  players: Player[];
  currentQuestion: number;
  status: 'waiting' | 'in_progress' | 'finished';
  questionStartTime?: number;
  questionTimer?: NodeJS.Timeout;
  playerAnswers: Map<string, { answerIndex: number; timestamp: number }>;
}

export interface User {
  name: string;
  password: string;
  index: string;
  ws?: WebSocket;
}

export interface WSMessage {
  type: string;
  data: any;
  id: number;
}

export interface RegData {
  name: string;
  password: string;
}

export interface CreateGameData {
  questions: Question[];
}

export interface JoinGameData {
  code: string;
}

export interface StartGameData {
  gameId: string;
}

export interface AnswerData {
  gameId: string;
  questionIndex: number;
  answerIndex: number;
}

// --- Request types (client → server) ---

export interface RegRequest {
  name: string;
  password: string;
}

export interface CreateGameRequest {
  questions: Question[];
}

export interface JoinGameRequest {
  code: string;
}

export interface StartGameRequest {
  gameId: string;
}

export interface AnswerRequest {
  gameId: string;
  questionIndex: number;
  answerIndex: number;
}

// --- Response types (server → client) ---

export interface RegResponse {
  name: string;
  index: number | string;
  error: boolean;
  errorText: string;
}

export interface GameCreatedResponse {
  gameId: string;
  code: string;
}

export interface GameJoinedResponse {
  gameId: string;
}

export interface PlayerJoinedMessage {
  playerName: string;
  playerCount: number;
}

export interface UpdatePlayersMessage {
  // data is the array itself: Player[]
}

export interface QuestionMessage {
  questionNumber: number;
  totalQuestions: number;
  text: string;
  options: string[];
  timeLimitSec: number;
}

export interface AnswerAcceptedMessage {
  questionIndex: number;
}

export interface QuestionResultMessage {
  questionIndex: number;
  correctIndex: number;
  playerResults: PlayerResult[];
}

export interface GameFinishedMessage {
  scoreboard: { name: string; score: number; rank: number }[];
}

export interface QuestionsExportedMessage {
  schemaVersion: number;
  questions: Question[];
}

export interface QuestionsImportedMessage {
  gameId: string;
  totalQuestions: number;
}

export interface ErrorMessage {
  message: string;
}

export interface PlayerResult {
  name: string;
  answered: boolean;
  correct: boolean;
  pointsEarned: number;
  totalScore: number;
}