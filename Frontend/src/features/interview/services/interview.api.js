import axios from "axios";

const API_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

export async function getInterview(interviewId) {
  const response = await axiosInstance.get(`/api/interview/${interviewId}`);
  return response.data;
}

/**
 *
 * @param {*} jobDescription
 * @param {*} selfDescription
 * @param {*} resumeFile
 * @returns
 */
export async function generateInterviewReport({
  jobDescription,
  selfDescription,
  resumeFile,
}) {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resumeFile);
  const response = await axiosInstance.post(
    `/api/interview/generate-interview-report`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data;
}

export async function getAllInterviewReportsOfUser() {
  const response = await axiosInstance.get(`/api/interview/all`);
  return response.data;
}

export async function getInterviewReportById(interviewId) {
  const response = await axiosInstance.get(`/api/interview/${interviewId}`);
  return response.data;
}
