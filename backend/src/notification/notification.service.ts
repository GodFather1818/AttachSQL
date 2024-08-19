// notification.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<Notification>,
  ) {}

  async createNotification(notificationData: Partial<Notification>): Promise<Notification> {
    const newNotification = new this.notificationModel(notificationData);
    return newNotification.save();
  }

  async getNotificationsForUser(userId: string): Promise<Notification[]> {
    return this.notificationModel.find({ user: userId }).sort({ createdAt: -1 }).exec();
  }

  async markAsRead(notificationId: string): Promise<Notification> {
    return this.notificationModel.findByIdAndUpdate(notificationId, { read: true }, { new: true }).exec();
  }
  // In your notifications service
  async getUnreadCount(userId: string): Promise<number> {
    return this.notificationModel.countDocuments({ user: userId, read: false });
}
}