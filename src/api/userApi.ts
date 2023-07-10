import axiosClient from './axiosClient';

export interface User {
  id?: number; // readonly;
  email?: string;
  password?: string;
  name?: string;
  role?: string;
  avatar?: string;
  creationAt?: string;
  updatedAt?: string;
}

const userApi = {
  updateUser: (data: User) => {
    return axiosClient.put<User, any>(`/users/${data.id}`, data);
  },
};

export default userApi;
