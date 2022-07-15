import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { Player } from 'src/players/interfaces/player.interface';

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

  status: string;
  category: string;
  solicitationDate: Date;
}
