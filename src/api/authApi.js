import axios from 'axios';
import { getAuthorizationHeader } from "../helpers/auth";

export const login = (email, password) =>
  axios.post('/auth/login', { email, password });

export const register = (firstName, lastName, email, role, password, passwordConfirm) =>
  axios.post('/auth/register', {
    first_name: firstName,
    last_name: lastName,
    email: email,
    role: role,
    password: password,
    password_confirmation: passwordConfirm,
  });

export const logout = () =>
  axios.get('/auth/logout', { headers: { ...getAuthorizationHeader() } });
