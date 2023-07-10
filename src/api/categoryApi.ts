import { ParamsType } from './../types/params.type';
import axiosClient from './axiosClient';
import { CategoryType } from '~/types/category.type';

interface CategoryDataType {
  id: string | number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

const categoryApi = {
  getAll(params: ParamsType) {
    const url = '/categories';
    return axiosClient.get<CategoryType[], any>(url, { params });
  },

  get(id: { id: string | number }) {
    const url = `/categories/${id}`;
    return axiosClient.get<CategoryType, any>(url);
  },

  add(data: CategoryDataType) {
    const url = '/categories';
    return axiosClient.post(url, data);
  },

  update(data: CategoryDataType) {
    const url = `/categories/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id: { id: string | number }) {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
