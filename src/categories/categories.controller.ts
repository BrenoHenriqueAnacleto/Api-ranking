import { CategoriesService } from './categories.service';
import { Category } from './interfaces/category.interface';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('api/v1/categories')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService) {

    }

    @Post()
    @UsePipes(ValidationPipe)
    async createCategorie(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoriesService.createCategory(createCategoryDto);
    }
}
