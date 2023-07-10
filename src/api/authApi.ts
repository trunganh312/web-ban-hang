import axiosClient from './axiosClient';

export interface DataAuthType {
  email: string;
  password: string;
  name?: string;
  avatar?: string;
}

export interface DataProfile {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  cartList: any[];
}

interface AuthState {
  access_token: string;
  refresh_token: string;
}

const authApi = {
  login: (data: DataAuthType) => {
    return axiosClient.post<AuthState, any>('/auth/login', data);
  },
  addUser: (data: DataAuthType) => {
    return axiosClient.post<AuthState, any>('/users', data);
  },

  getUserProfile: (token: string | null) => {
    return axiosClient.get<DataProfile, any>('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default authApi;
