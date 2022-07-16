import { IsDateString, IsEnum, IsNotEmpty, NotEquals } from 'class-validator';
import { ChallengeStatus } from '../enums/challange-status.enum';

export class UpdateChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  acceptDateTime: Date;

  @IsEnum(ChallengeStatus)
  @NotEquals(ChallengeStatus[ChallengeStatus.PENDING])
  status: ChallengeStatus;
}
