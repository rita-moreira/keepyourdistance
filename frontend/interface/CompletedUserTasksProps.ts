export interface CompletedUserTasksProps {
  _id: string;
  updatedAt: string;
  title: string;
  share: boolean;
  postedBy: { _id: string; username: string; country: string; photo: string };
  description: string;
  completed: boolean;
  comments: [];
  comment: string;
  acceptedBy: { _id: string; username: string; country: string; photo: string };
  [key: string]: any;
}
