export const getToken = () => {
  const token = localStorage.getItem('token');

  return token || null;
};

export const getUser = () => {
  const user = localStorage.getItem('user');

  return user ? JSON.parse(user) : null;
};

export const getAuthorizationHeader = () => {
  const token = localStorage.getItem('token');

  return { Authorization: `Bearer ${token}` };
};
