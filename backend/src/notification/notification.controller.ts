import { Controller, Get, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getNotifications(@Request() req) {
    return this.notificationService.getNotificationsForUser(req.user.userId);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }
  // In your notifications controller
  @Get('unread-count')
  async getUnreadCount(@Request() req): Promise<number> {
    const userId = req.user.userId; // Assuming you have user information in the request
    return this.notificationService.getUnreadCount(userId);
}
  

}