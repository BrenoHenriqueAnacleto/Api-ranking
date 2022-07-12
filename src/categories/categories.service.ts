import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interfaces/category.interface';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {

    }

    async createCategory(createCategoryDto) : Promise<Category> {

        const { category } = createCategoryDto;

        const foundCategory = await this.categoryModel.findOne({category}).exec();

        if (foundCategory) {
            throw new BadRequestException(`Category ${category} already exists`);
        }

        const createdCategory = new this.categoryModel(createCategoryDto);
        return await createdCategory.save();

    }
}
