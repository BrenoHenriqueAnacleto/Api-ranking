import { Body, Controller, Post, Get, Query, Delete, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';
import { PlayersValidationParametersPipe } from './pipes/players-validation-parameters.pipe';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createPlayer(
        @Body() createPlayerDto: CreatePlayerDto
    ) {
        return await this.playersService.createPlayer(createPlayerDto);
    }

    @Put("'/:_id")
    @UsePipes(ValidationPipe)
    async updatePlayer(
        @Body() updatePlayerDto: UpdatePlayerDto,
        @Param('_id',PlayersValidationParametersPipe) _id: string
    ): Promise<void> {
        return await this.playersService.updatePlayer(_id,updatePlayerDto);
    }


    @Get('/:_id')
    async findPlayerById(
        @Param('_id', PlayersValidationParametersPipe) _id: string
    ): Promise<Player> {
        return await this.playersService.findPlayerById(_id);
    }

    
    @Get()
    async findPlayers(): Promise<Player[]> {
        return await this.playersService.findAllPlayers();
    }

    @Delete('/:_id')
    async deletePlayer(
        @Query('_id', PlayersValidationParametersPipe) _id: string
    ) : Promise<void>{
        return this.playersService.deletePlayer(_id);
    }
}
