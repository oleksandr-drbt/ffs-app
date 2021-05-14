import axios from "axios";
import { getAuthorizationHeader } from "../helpers/auth";

export const createProject = (formData) =>
  axios.post(
    '/user/projects',
    formData,
    {
      headers: {
        ...getAuthorizationHeader(),
        "Content-Type": "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2),
      },
    },
  );

export const fetchCurrentUserProjects = () =>
  axios.get('/user/projects', { headers: { ...getAuthorizationHeader() } });

export const updateProject = (id, formData) =>
  axios.put(
    `/user/projects/${id}`,
    formData,
    {
      headers: {
        ...getAuthorizationHeader(),
        "Content-Type": "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2),
      },
    },
  );

export const removeProject = (id) =>
  axios.delete(`/user/projects/${id}`, { headers: { ...getAuthorizationHeader() } });
