import axios from "axios";
import { VITE_APP_URL } from "@/config/config";

const axiosInstance = axios.create({
  baseURL: `${VITE_APP_URL}/api`, // ✅ Removed extra trailing slash
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const createNewResume = async (data) => {
  try {
    const response = await axiosInstance.post("/resumes/createResume", data.data); // ✅ Fixed endpoint
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error?.message || "Something Went Wrong");
  }
};

const getAllResumeData = async () => {
  try {
    const response = await axiosInstance.get("/resumes/getAllResume"); // ✅ Fixed endpoint
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error?.message || "Something Went Wrong");
  }
};

const getResumeData = async (resumeID) => {
  try {
    const response = await axiosInstance.get(`/resumes/getResume?id=${resumeID}`); // ✅ Fixed endpoint
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error?.message || "Something Went Wrong");
  }
};

const updateThisResume = async (resumeID, data) => {
  try {
    const response = await axiosInstance.put(`/resumes/updateResume?id=${resumeID}`, data.data); // ✅ Fixed endpoint
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error?.message || "Something Went Wrong");
  }
};

const deleteThisResume = async (resumeID) => {
  try {
    const response = await axiosInstance.delete(`/resumes/removeResume?id=${resumeID}`); // ✅ Fixed endpoint
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error?.message || "Something Went Wrong");
  }
};

export { getAllResumeData, deleteThisResume, getResumeData, updateThisResume, createNewResume };
