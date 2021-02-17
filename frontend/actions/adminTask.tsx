import { API_BASE_URL } from '../config';
import axios from "axios";

interface TaskState {
  title: string,
  share: boolean,
  description: string
  comment: string
}
export const completeTask = async (task: TaskState, token: string) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/api/adminTask`,
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(task),
    })
    return response.data
  } catch (err) {
    return err.response.data
  }
}

interface CommentState {
  comment: string;
  task_id: string
}
export const addComment = async (comment: CommentState, token: string) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/api/comments`,
      method: "PUT",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(comment),
    })
    return response.data
  } catch (err) {
    return err.response.data
  }
}