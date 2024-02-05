import axios from 'axios';
import { DiaryEntry, NewDiaryEntry, ValidationError } from '../types';

const baseURL = 'http://localhost:3000/api/diaries/';

export const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseURL);
  return response.data;
};

export const createDiaryEntry = async (object: NewDiaryEntry) => {
  try{
    const response = await axios.post<DiaryEntry>(baseURL, object);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      console.log("error:", error.response?.request.responseText);
    } else {
      console.error(error);
    }
  }
};