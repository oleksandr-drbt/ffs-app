import axios from "axios";
import { getAuthorizationHeader } from "../helpers/auth";

export const getSkillsList = () =>
  axios.get(`/skills`, { headers: { ...getAuthorizationHeader() } });

