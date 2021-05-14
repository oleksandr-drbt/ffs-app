import axios from "axios";
import { getAuthorizationHeader } from "../helpers/auth";

export const getUserById = (id) =>
  axios.get(`/users/${id}`, { headers: { ...getAuthorizationHeader() } });

export const editCurrentUser = ({ firstName, lastName, phone, position, description, skills }) =>
  axios.put(
    `/user/edit-profile`,
    {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      position: position,
      description: description,
      skills: skills,
    },
    { headers: { ...getAuthorizationHeader() } },
  );

export const uploadAvatar = (formData) =>
  axios.post('/user/upload-avatar', formData, { headers: { ...getAuthorizationHeader() } });

export const changePassword = (oldPassword, newPassword) =>
  axios.put(
    '/user/change-password',
    {
      old_password: oldPassword,
      new_password: newPassword,
    },
    { headers: { ...getAuthorizationHeader() } },
  );

export const deleteCurrentUser = () =>
  axios.delete('/user/delete-account', { headers: { ...getAuthorizationHeader() } });
