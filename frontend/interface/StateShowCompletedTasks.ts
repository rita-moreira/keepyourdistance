export interface StateShowCompletedTasks {
  _id: string;
  title: string;
  share: boolean;
  description: string;
  createdAt: string;
  comment: string;
  comments: string[];
  completedBy: any;
  [key: string]: boolean | string | string[];
}
