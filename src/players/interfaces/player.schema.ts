import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    phoneNumber: { type: String },
    nome: { type: String },
    ranking: { type: String },
    rankingPosition: { type: Number },
    urlPlayerPhoto: { type: String },
  },
  { timestamps: true, collection: 'players' },
);
