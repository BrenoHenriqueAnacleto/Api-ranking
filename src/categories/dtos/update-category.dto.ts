import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";
import { Event } from "../interfaces/category.interface";

export class UpdateCategoryDto {

    @IsOptional ()
    @IsString()
    description: String;

    @IsArray()
    @ArrayMinSize(1)
    events: Array<Event>;
}