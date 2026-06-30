import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { UpdateUserGoalInput } from '../validators/user.validator';

const EXCLUDED_FIELDS = '-password -otpCode -resetToken';

export const updateUserGoal = async (req: Request, res: Response) => {
  const userId = req.user?.sub;
  const { careerId, goal, careerTitle, note } = req.body as UpdateUserGoalInput;

  const user = await UserModel.findByIdAndUpdate(
    userId,
    {
      goal: {
        careerId: careerId ?? goal,
        careerTitle,
        note,
        updatedAt: new Date()
      }
    },
    { new: true, runValidators: true }
  ).select(EXCLUDED_FIELDS);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({
    message: 'User goal updated successfully',
    user
  });
};
