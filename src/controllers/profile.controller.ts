import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { deleteAsset, deleteImage, uploadImage, uploadPortfolioAsset } from '../services/cloudinary.service';
import { CreatePortfolioInput, UpdatePortfolioInput, UpdateProfileInput } from '../validators/profile.validator';

// Fields excluded from all profile responses
const EXCLUDED_FIELDS = '-password -otpCode -otpExpiresAt -resetToken -resetTokenExpiresAt';
const MOJIBAKE_PATTERN = /Ã|Â|Æ|Ä|áº|á»|â/;

const normalizeUploadedFileName = (fileName: string) => {
  if (!MOJIBAKE_PATTERN.test(fileName)) return fileName;

  try {
    return Buffer.from(fileName, 'latin1').toString('utf8');
  } catch {
    return fileName;
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const userId = req.user?.sub;
  const { displayName, bio, phone, enableStudyReminder } = req.body as UpdateProfileInput;

  const user = await UserModel.findByIdAndUpdate(
    userId,
    { displayName, bio, phone, enableStudyReminder },
    { new: true, runValidators: true }
  ).select(EXCLUDED_FIELDS);

  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json(user);
};

export const uploadAvatar = async (req: Request, res: Response) => {
  const userId = req.user?.sub;

  if (!req.file) return res.status(400).json({ message: 'No file provided' });

  const user = await UserModel.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Delete old avatar from Cloudinary if it exists
  if (user.avatarUrl) {
    // Extract public ID: last two path segments joined by '/' without extension
    const parts = user.avatarUrl.split('/');
    const filename = parts[parts.length - 1].replace(/\.[^/.]+$/, '');
    const folder = parts[parts.length - 2];
    const oldPublicId = `${folder}/${filename}`;
    await deleteImage(oldPublicId).catch(() => {
      // Non-fatal: old image cleanup failure should not block the upload
    });
  }

  const { url, publicId } = await uploadImage(req.file.buffer, 'avatars');
  user.avatarUrl = url;
  await user.save();

  const updated = await UserModel.findById(userId).select(EXCLUDED_FIELDS);
  return res.json({ avatarUrl: url, publicId, user: updated });
};

export const createPortfolio = async (req: Request, res: Response) => {
  const userId = req.user?.sub;
  const { title, url } = req.body as CreatePortfolioInput;

  if (!url && !req.file) {
    return res.status(400).json({ message: 'Provide a project URL or an image/PDF file' });
  }

  const user = await UserModel.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const portfolio = {
    title,
    url,
    createdAt: new Date(),
    ...(req.file
      ? {
          fileName: normalizeUploadedFileName(req.file.originalname),
          fileMimeType: req.file.mimetype
        }
      : {})
  };

  if (req.file) {
    const uploaded = await uploadPortfolioAsset(req.file.buffer, 'portfolios', req.file.mimetype);
    Object.assign(portfolio, {
      fileUrl: uploaded.url,
      filePublicId: uploaded.publicId,
      fileResourceType: uploaded.resourceType
    });
  }

  user.portfolios.unshift(portfolio);
  await user.save();

  const updated = await UserModel.findById(userId).select(EXCLUDED_FIELDS);
  return res.status(201).json(updated);
};

export const updatePortfolio = async (req: Request, res: Response) => {
  const userId = req.user?.sub;
  const { portfolioId } = req.params;
  const { title, url } = req.body as UpdatePortfolioInput;

  const user = await UserModel.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const portfolio = user.portfolios.find((item) => String(item._id) === portfolioId);
  if (!portfolio) return res.status(404).json({ message: 'Portfolio item not found' });

  if (!url && !req.file && !portfolio.fileUrl) {
    return res.status(400).json({ message: 'Provide a project URL or an image/PDF file' });
  }

  const oldFilePublicId = portfolio.filePublicId;
  const oldFileResourceType = portfolio.fileResourceType;

  portfolio.title = title;
  portfolio.url = url;

  if (req.file) {
    const uploaded = await uploadPortfolioAsset(req.file.buffer, 'portfolios', req.file.mimetype);
    portfolio.fileUrl = uploaded.url;
    portfolio.fileName = normalizeUploadedFileName(req.file.originalname);
    portfolio.fileMimeType = req.file.mimetype;
    portfolio.filePublicId = uploaded.publicId;
    portfolio.fileResourceType = uploaded.resourceType;
  }

  await user.save();

  if (req.file && oldFilePublicId) {
    await deleteAsset(oldFilePublicId, oldFileResourceType).catch(() => {
      // Non-fatal: old asset cleanup should not block profile updates
    });
  }

  const updated = await UserModel.findById(userId).select(EXCLUDED_FIELDS);
  return res.json(updated);
};

export const deletePortfolio = async (req: Request, res: Response) => {
  const userId = req.user?.sub;
  const { portfolioId } = req.params;

  const user = await UserModel.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const portfolio = user.portfolios.find((item) => String(item._id) === portfolioId);
  if (!portfolio) return res.status(404).json({ message: 'Portfolio item not found' });

  user.portfolios = user.portfolios.filter((item) => String(item._id) !== portfolioId);
  await user.save();

  if (portfolio.filePublicId) {
    await deleteAsset(portfolio.filePublicId, portfolio.fileResourceType).catch(() => {
      // Non-fatal: stale Cloudinary assets should not block deleting the profile item
    });
  }

  const updated = await UserModel.findById(userId).select(EXCLUDED_FIELDS);
  return res.json(updated);
};

export const uploadCv = async (req: Request, res: Response) => {
  const userId = req.user?.sub;

  if (!req.file) return res.status(400).json({ message: 'No file provided' });

  const user = await UserModel.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Delete old CV from Cloudinary if it exists
  if (user.cvPublicId) {
    await deleteAsset(user.cvPublicId, user.cvResourceType || 'raw').catch(() => {
      // Non-fatal: old asset cleanup failure should not block the upload
    });
  }

  const uploaded = await uploadPortfolioAsset(req.file.buffer, 'cvs', req.file.mimetype);
  user.cvUrl = uploaded.url;
  user.cvName = normalizeUploadedFileName(req.file.originalname);
  user.cvPublicId = uploaded.publicId;
  user.cvResourceType = uploaded.resourceType;
  await user.save();

  const updated = await UserModel.findById(userId).select(EXCLUDED_FIELDS);
  return res.json({ cvUrl: uploaded.url, cvName: user.cvName, user: updated });
};

export const deleteCv = async (req: Request, res: Response) => {
  const userId = req.user?.sub;

  const user = await UserModel.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (user.cvPublicId) {
    await deleteAsset(user.cvPublicId, user.cvResourceType || 'raw').catch(() => {
      // Non-fatal: old asset cleanup failure should not block deleting the CV
    });
  }

  user.cvUrl = undefined;
  user.cvName = undefined;
  user.cvPublicId = undefined;
  user.cvResourceType = undefined;
  await user.save();

  const updated = await UserModel.findById(userId).select(EXCLUDED_FIELDS);
  return res.json(updated);
};
