export type NotificationKind = 'maintenance' | 'access-request' | 'views' | 'ready' | 'changes' | 'moderation';

export type Notification = {
  id: string;
  kind: NotificationKind;
  title: string;
  text: string;
  createdAt: string;
  read: boolean;
};
