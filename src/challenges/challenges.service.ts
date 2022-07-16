import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { Challenge } from './interfaces/challenge.interface';
import { CategoriesService } from '../categories/categories.service';
import { ChallengeStatus } from './enums/challange-status.enum';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
    private readonly playerService: PlayersService,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    const { challenger } = createChallengeDto;

    createChallengeDto.players.forEach((player) =>
      this.playerService.findPlayerById(player._id),
    );

    const playerIsOneOfThePlayers = createChallengeDto.players.filter(
      (player) => player._id == challenger._id,
    );

    if (playerIsOneOfThePlayers.length == 0) {
      throw new BadRequestException(
        `Challenger ${challenger._id} ins't one of the expected players`,
      );
    }

    const categories = await this.categoryService.getCategoryByPlayer(
      challenger._id,
    );

    if (categories.length == 0) {
      throw new BadRequestException(
        `Challenger ${challenger._id} don't have an category`,
      );
    }

    createChallengeDto.solicitationDate = new Date();
    createChallengeDto.category = categories[0].category;

    const createdChallenge = new this.challengeModel(createChallengeDto);
    return createdChallenge.save();
  }

  async fetchAll(): Promise<Array<Challenge>> {
    return this.challengeModel.find().exec();
  }

  async fetchChallengesByPlayerId(playerId: string): Promise<Array<Challenge>> {
    return this.challengeModel.find().where('players').in([playerId]);
  }

  async update(
    _id: string,
    updateChallengeDto: UpdateChallengeDto,
  ): Promise<void> {
    await this.verifyChallengeExists(_id);
    await this.challengeModel
      .findOneAndUpdate({ _id }, { $set: updateChallengeDto })
      .exec();
  }

  async delete(_id: string): Promise<any> {
    await this.verifyChallengeExists(_id);
    await this.challengeModel
      .findOneAndUpdate({ _id }, { $set: { status: ChallengeStatus.CANCELED } })
      .exec();
  }

  private async verifyChallengeExists(_id: string) {
    const foundChallenge = await this.challengeModel.findOne({ _id }).exec();
    if (!foundChallenge) {
      throw new BadRequestException(`Challenge ${_id} not found`);
    }
  }
}
