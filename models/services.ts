import { Schema, model } from 'mongoose';
export interface IService {
  id: string,
  name: string
}

const serviceSchema = new Schema<IService>({
  name: { type: String, required: true }
},{
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

export const Service = model('Service', serviceSchema);

