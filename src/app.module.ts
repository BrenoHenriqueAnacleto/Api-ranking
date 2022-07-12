import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';  
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ranking'),
    PlayersModule,
    CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
 