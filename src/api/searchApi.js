import axios from "axios";
import { getAuthorizationHeader } from "../helpers/auth";

export const searchForUsers = (value = '', skills = []) =>
  axios.get(
    `/search/users/?value=${encodeURIComponent(value.trim())}&skills=${encodeURIComponent(JSON.stringify(skills))}`,
    { headers: { ...getAuthorizationHeader() } },
  );

export const searchForProjects = (value = '', skills = []) =>
  axios.get(
    `/search/projects/?value=${encodeURIComponent(value.trim())}&skills=${encodeURIComponent(JSON.stringify(skills))}`,
    { headers: { ...getAuthorizationHeader() } },
  );
