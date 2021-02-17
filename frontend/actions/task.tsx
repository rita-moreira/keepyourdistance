import { API_BASE_URL } from '../config';
import axios from "axios";

interface TaskState {
  title: string;
  description: string;
  currentTime: string
}
export const createTask = async (task: TaskState, token: string) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/api/task`,
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


export const removeTask = async (title: string, token: string) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/api/task/${title}`,
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return err.response.data
  }
}