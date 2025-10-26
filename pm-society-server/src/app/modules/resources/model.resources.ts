import mongoose from 'mongoose';
import { IResource } from './interface.resources';

const resourceSchema = new mongoose.Schema<IResource>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fileUrl: { type: String },
  tags: { type: [String], default: [] },
}, { timestamps: true });

export const Resource = mongoose.model('Resource', resourceSchema);
