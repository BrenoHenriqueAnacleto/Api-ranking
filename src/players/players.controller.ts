import { Body, Controller, Post, Get, Query, Delete } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) {}

    @Post()
    async createUpdatePlayer(
        @Body() createPlayerDto: CreatePlayerDto
    ) {
        await this.playersService.createUpdatePlayer(createPlayerDto);
    }

    @Get()
    async findPlayers(
        @Query('email') email: string
    ): Promise<Player[] | Player>{
        if (email) {
            return await this.playersService.findPlayerByEmail(email);
        }

        return await this.playersService.findAllPlayers();
    }

    @Delete()
    async deletePlayer(
        @Query('email') email: string
    ) : Promise<void>{
        return this.playersService.deletePlayer(email);
    }
}
