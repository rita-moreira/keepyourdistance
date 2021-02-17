export interface CompletedAdminTasksProps {
  comment: string;
  createdAt: string;
  description: string;
  share: boolean;
  title: string;
  _id: string;
  comments: [];
  completedBy: {
    country: string;
    photo: string;
    username: string;
    _id: string;
  };
  [key: string]: any;
}
