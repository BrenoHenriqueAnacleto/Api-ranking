import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";
import { Event } from "../interfaces/category.interface";

export class CreateCategoryDto {
    
    @IsNotEmpty()
    @IsString()
    readonly category: String;

    @IsNotEmpty()
    @IsString()
    description: String;

    @IsArray()
    @ArrayMinSize(1)
    events: Array<Event>;
}