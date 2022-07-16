import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { Player } from 'src/players/interfaces/player.interface';
import { ChallengeStatus } from '../enums/challange-status.enum';

export class CreateChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  challengeDateTime: Date;

  @IsNotEmpty()
  challenger: Player;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: Array<Player>;

  status: ChallengeStatus.PENDING;
  category: string;
  solicitationDate: Date;
}
