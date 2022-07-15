import * as mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema(
  {
    challengeDateTime: { type: Date },
    solicitationDateTime: { type: Date },
    acceptDateTime: { type: Date },
    category: { type: String },
    status: { type: String },
    challenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
    },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
    },
  },
  { timestamps: true, collection: 'challenges' },
);
