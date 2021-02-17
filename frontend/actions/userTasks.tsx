import { API_BASE_URL } from '../config';
import axios from "axios";
import { headers } from "./global"

export const acceptTask = async (taskId: { _id: string }, token: string) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/api/userTask`,
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(taskId),
    })
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}


export const removeTask = async (title: string, token: string) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/api/userTask/${title}`,
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}

interface UpdateState {
  _id: string;
  title: string;
  share: boolean;
  description: string;
  completed: boolean;
  comment: string
}

export const update = async (task: UpdateState) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/api/userTask/update`,
      method: "PUT",
      headers,
      data: JSON.stringify(task),
    })
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

// add comment

interface AddCommentState {
  task_id: string;
  comment: string;
}
export const addComment = async (comment: AddCommentState, token: string) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/api/userComments`,
      method: "PUT",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(comment),
    })
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}

