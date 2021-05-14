import axios from "axios";
import { getAuthorizationHeader } from "../helpers/auth";

export const createWork = (formData) =>
  axios.post(
    '/user/works',
    formData,
    {
      headers: {
        ...getAuthorizationHeader(),
        "Content-Type": "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2),
      },
    },
  );

export const fetchCurrentUserWorks = () =>
  axios.get('/user/works', { headers: { ...getAuthorizationHeader() } });

export const updateWork = (id, formData) =>
  axios.put(
    `/user/works/${id}`,
    formData,
    {
      headers: {
        ...getAuthorizationHeader(),
        "Content-Type": "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2),
      },
    },
  );

export const removeWork = (id) =>
  axios.delete(`/user/works/${id}`, { headers: { ...getAuthorizationHeader() } });
