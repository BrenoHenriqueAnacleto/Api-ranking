import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto;
    const playerFound = await this.playerModel.findOne({ email }).exec();
    if (playerFound) {
      throw new BadRequestException(`Player already exists!`);
    }

    const createdPlayer = new this.playerModel(createPlayerDto);
    return createdPlayer.save();
  }

  async updatePlayer(
    _id: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<void> {
    await this.findPlayerById(_id);
    await this.playerModel
      .findOneAndUpdate({ _id }, { $set: updatePlayerDto })
      .exec();
  }

  async findAllPlayers(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  async findPlayerById(_id: string): Promise<Player> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();
    if (!playerFound) {
      throw new NotFoundException(`Player with id: ${_id} not found`);
    }
    return playerFound;
  }

  async deletePlayer(_id: string): Promise<any> {
    await this.findPlayerById(_id);
    return this.playerModel.deleteOne({ _id }).exec();
  }
}
