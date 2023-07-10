import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCategoryList } from '~/components/category/category.slice';
import { RootState, useAppDispatch } from '~/store';
import ProductCategoryLoading from './ProductCategoryLoading';

interface ProductCategoryProp {
  onChange: (value: number) => void;
}

export default function ProductCategory({ onChange }: ProductCategoryProp) {
  const [checked, setChecked] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { categories, loading } = useSelector((state: RootState) => state.category);

  const handleToggle = (value: number) => () => {
    if (checked === value) {
      setChecked(0);
      onChange(0);
    } else {
      setChecked(value);
      onChange(value);
    }
  };

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Danh mục sản phẩm</ListSubheader>}
    >
      {loading && (
        <>
          <ProductCategoryLoading></ProductCategoryLoading>
          <ProductCategoryLoading></ProductCategoryLoading>
          <ProductCategoryLoading></ProductCategoryLoading>
          <ProductCategoryLoading></ProductCategoryLoading>
          <ProductCategoryLoading></ProductCategoryLoading>
          <ProductCategoryLoading></ProductCategoryLoading>
          <ProductCategoryLoading></ProductCategoryLoading>
        </>
      )}
      {!loading &&
        categories.map((item) => {
          return (
            <ListItem key={item.id}>
              <ListItemText id="switch-list-label-wifi" primary={item.name} />
              <Switch
                edge="end"
                onChange={handleToggle(Number(item.id))}
                checked={checked === item.id}
                inputProps={{
                  'aria-labelledby': 'switch-list-label-wifi',
                }}
              />
            </ListItem>
          );
        })}
    </List>
  );
}
