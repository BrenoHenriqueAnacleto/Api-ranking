import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {v4 as uuidv4 } from 'uuid';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';


@Injectable()
export class PlayersService {

    private players: Player[] = [];
    private readonly logger = new Logger(PlayersService.name)
    
    async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
        const { email } = createPlayerDto
        const playerFound = this.players.find(player => player.email === email);

        if (playerFound) {
            this.update(playerFound,createPlayerDto);
        } else {
            this.create(createPlayerDto);
        }
    }

    async findAllPlayers(): Promise<Player[]> {
        return this.players;
    }

    async findPlayerByEmail(email: string): Promise<Player> {
        const playerFounnd = this.players.find(player => player.email === email);
        if (!playerFounnd) {
            throw new NotFoundException(`Player with email: ${email} not found`);
        }
        return playerFounnd;
    }

    async deletePlayer(email: string): Promise<void> {
        const playerFound = this.players.find(player => player.email === email);
        this.players = this.players.filter(player => player.email !== playerFound.email);
    }

    private update(playerFound: Player, createPlayerDto: CreatePlayerDto): void {
        const { name } = createPlayerDto;
        playerFound.name = name;
    }

    private create(createPlayerDto: CreatePlayerDto): void {
        const { name, email, phoneNumber } = createPlayerDto;

        const player: Player = {
            _id: uuidv4(),
            name,
            phoneNumber,
            email,
            ranking:"A",
            rankingPosition:1,
            urlPlayerPhoto:""
        };

        this.logger.log(`createPlayerDTO: ${JSON.stringify(createPlayerDto)}`)

        this.players.push(player);
    }
}
