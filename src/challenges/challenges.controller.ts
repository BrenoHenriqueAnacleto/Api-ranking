import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { Challenge } from './interfaces/challenge.interface';

@Controller('api/v1/challenges')
export class ChallengesController {
  constructor(private readonly challengeService: ChallengesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createChallengeDto: CreateChallengeDto,
  ): Promise<Challenge> {
    return this.challengeService.create(createChallengeDto);
  }

  @Get()
  async fetch(@Query('playerId') playerId: string): Promise<Array<Challenge>> {
    if (playerId) {
      return this.challengeService.fetchChallengesByPlayerId(playerId);
    }
    return this.challengeService.fetchAll();
  }
}
