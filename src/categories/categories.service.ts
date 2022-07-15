import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interfaces/category.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { PlayersService } from 'src/players/players.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playerService: PlayersService,
  ) {}

  async createCategory(createCategoryDto): Promise<Category> {
    const { category } = createCategoryDto;

    const foundCategory = await this.categoryModel.findOne({ category }).exec();
    CategoriesService.verifyIfCategoryExists(foundCategory, category);

    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.find().populate('players').exec();
  }

  async getCategoryById(category: string): Promise<Category> {
    const foundCategory = await this.categoryModel.findOne({ category }).exec();
    CategoriesService.verifyIfCategoryExists(foundCategory, category);
    return foundCategory;
  }

  async getCategoryByPlayer(playerId: any): Promise<Category[]> {
    return this.categoryModel.find().where('players').in(playerId);
  }

  async updateCategory(
    category: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    const foundCategory = await this.categoryModel.findOne({ category }).exec();
    CategoriesService.verifyIfCategoryExists(foundCategory, category);

    await this.categoryModel
      .findOneAndUpdate({ category }, { $set: updateCategoryDto })
      .exec();
  }

  async updateCategoryPlayers(params: string[]): Promise<void> {
    const category = params['category'];
    const playerId = params['playerId'];

    const foundCategory = await this.categoryModel.findOne({ category }).exec();

    await this.playerService.findPlayerById(playerId);

    const playerAlreadyInList = await this.categoryModel
      .find({ category })
      .where('players')
      .in(playerId);

    CategoriesService.verifyIfCategoryExists(foundCategory, category);

    if (playerAlreadyInList.length > 0) {
      throw new BadRequestException(
        `Player with id: ${playerId} already in category ${category}`,
      );
    }

    foundCategory.players.push(playerId);
    await this.categoryModel
      .findOneAndUpdate({ category }, { $set: foundCategory })
      .exec();
  }

  private static verifyIfCategoryExists(
    foundCategory: Category & { _id: any },
    category: any,
  ) {
    if (!foundCategory) {
      throw new BadRequestException(`Category ${category} already exists`);
    }
  }
}
