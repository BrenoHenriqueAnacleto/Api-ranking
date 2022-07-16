import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { Challenge } from './interfaces/challenge.interface';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { ValidationParametersPipe } from '../common/pipes/validation-parameters.pipe';

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

  @Put('/:challengeId')
  @UsePipes(ValidationPipe)
  async update(
    @Param('challengeId', ValidationParametersPipe) challengeId: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ): Promise<void> {
    return this.challengeService.update(challengeId, updateChallengeDto);
  }

  @Delete('/:challengeId')
  async delete(
    @Param('challengeId', ValidationParametersPipe) challengeId: string,
  ): Promise<any> {
    return this.challengeService.delete(challengeId);
  }
}
