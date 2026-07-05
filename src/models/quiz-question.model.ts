import mongoose, { Schema, Document } from 'mongoose';

export interface IQuizQuestion extends Document {
  stepId: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const QuizQuestionSchema = new Schema<IQuizQuestion>(
  {
    stepId: { type: String, required: true, index: true },
    questionText: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswerIndex: { type: Number, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true }
  },
  { timestamps: true }
);

export const QuizQuestionModel = mongoose.model<IQuizQuestion>('QuizQuestion', QuizQuestionSchema);
