import { connectDb } from '../config/db';
import { UserModel } from '../models/user.model';
import { UserProgressModel } from '../models/user-progress.model';

const testStats = async () => {
  try {
    await connectDb();
    console.log('Connected to DB');

    const totalUsers = await UserModel.countDocuments();
    console.log('Total Users:', totalUsers);

    const careerDistribution = await UserProgressModel.aggregate([
      {
        $group: {
          _id: '$careerId',
          value: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'careers',
          localField: '_id',
          foreignField: 'careerId',
          as: 'careerInfo'
        }
      },
      {
        $unwind: {
          path: '$careerInfo',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 0,
          name: { $ifNull: ['$careerInfo.title', 'Unknown'] },
          value: 1
        }
      }
    ]);

    console.log('Career Distribution Stats:');
    console.log(JSON.stringify(careerDistribution, null, 2));

    process.exit(0);
  } catch (error) {
    console.error('Test error:', error);
    process.exit(1);
  }
};

testStats();
