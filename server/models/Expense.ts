import mongoose, { Schema } from "mongoose";

export interface ExpenseDoc extends mongoose.Document {
  title: string;
  amount: number;
  category: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema = new Schema<ExpenseDoc>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    amount: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true, maxlength: 100 },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export const ExpenseModel =
  (mongoose.models.Expense as mongoose.Model<ExpenseDoc>) ||
  mongoose.model<ExpenseDoc>("Expense", ExpenseSchema);
