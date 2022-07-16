import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';
import { ChallengeStatus } from '../enums/challange-status.enum';

export interface Challenge extends Document {
  challengeDateTime: Date;
  status: ChallengeStatus;
  solicitationDateTime: Date;
  acceptDateTime: Date;
  challenger: Player;
  category: string;
  player: Array<Player>;
  match: Match;
}

export interface Match extends Document {
  category: string;
  players: Array<Player>;
  result: Array<Result>;
  def: Player;
}

export interface Result {
  set: string;
}
