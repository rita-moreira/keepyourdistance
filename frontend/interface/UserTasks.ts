export interface UserTasks {
  _id: string;
  updatedAt: string;
  title: string;
  postedBy: { _id: string; username: string; photo: string };
  description: string;
  date: string;
  createdAt: string;
  completed: boolean;
  comments: [];
  acceptedBy: { _id: string; username: string; country: string; photo: string };
}
