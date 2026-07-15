import { Router } from 'express';
import multer, { memoryStorage } from 'multer';
import {
  createPortfolio,
  deletePortfolio,
  updatePortfolio,
  updateProfile,
  uploadAvatar,
  uploadCv,
  deleteCv
} from '../controllers/profile.controller';
import { authGuard } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import { createPortfolioSchema, updatePortfolioSchema, updateProfileSchema } from '../validators/profile.validator';

export const profileRouter = Router();

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const upload = multer({
  storage: memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, WebP, and GIF images are allowed'));
    }
  },
});

const portfolioUpload = multer({
  storage: memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    if ([...ALLOWED_MIME_TYPES, 'application/pdf'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG, WebP, GIF, and PDF files are allowed'));
    }
  },
});

const cvUpload = multer({
  storage: memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
});

profileRouter.patch('/', authGuard, validateBody(updateProfileSchema), updateProfile);
profileRouter.post('/avatar', authGuard, upload.single('avatar'), uploadAvatar);
profileRouter.post(
  '/portfolios',
  authGuard,
  portfolioUpload.single('file'),
  validateBody(createPortfolioSchema),
  createPortfolio
);
profileRouter.patch(
  '/portfolios/:portfolioId',
  authGuard,
  portfolioUpload.single('file'),
  validateBody(updatePortfolioSchema),
  updatePortfolio
);
profileRouter.delete('/portfolios/:portfolioId', authGuard, deletePortfolio);
profileRouter.post('/cv', authGuard, cvUpload.single('cv'), uploadCv);
profileRouter.delete('/cv', authGuard, deleteCv);
