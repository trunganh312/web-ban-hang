import { ParamsType } from '~/types/params.type';
import { ProductItemType, ProductType } from '~/types/product.type';
import axiosClient from './axiosClient';

interface DataType {
  id: string | number;
  price: number;
  title: string;
}

const productApi = {
  getAll(params: ParamsType) {
    const url = '/products';
    return axiosClient.get<ProductItemType[], any>(url, { params });
  },

  get(id: number) {
    const url = `/products/${id}`;
    return axiosClient.get<ProductItemType, any>(url);
  },

  add(data: ProductType) {
    const url = '/products';
    return axiosClient.post(url, data);
  },

  update(data: DataType) {
    const url = `/products/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id: { id: string | number }) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
