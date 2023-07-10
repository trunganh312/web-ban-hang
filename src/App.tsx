import { Routes, Route } from 'react-router-dom';
import LayoutDefault from './layout/LayoutDefault';
import SignUp from './components/signup/SignUp';
import LayoutAuthentication from './layout/LayoutAuthentication';
import SignIn from './components/signin/SignIn';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProfilePage from './modules/ProfilePage/ProfilePage';

function App() {
  return (
    <>
      <Routes>
        <Route element={<LayoutDefault></LayoutDefault>}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/product/:id" element={<DetailPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Route>
        <Route element={<LayoutAuthentication />}>
          <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
          <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
