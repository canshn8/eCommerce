import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import ProductList from "./pages/productList/ProductList";
import NewProduct from "./pages/newProduct/NewProduct";
import Product from "./pages/product/Product";

import NewUser from "./pages/newUser/NewUser";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";

import Comment from "./pages/comment/Comment";
import CommentList from "./pages/commentList/CommentList";

import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import './app.css';

import ErrorPage from "./components/NotFound/ErrorPage";

function App() {
  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user);

  return (
    <Router>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      {admin && (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/user/:userId">
              <User />
            </Route>
            <Route path="/newUser">
              <NewUser />
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route path="/product/:productId">
              <Product />
            </Route>
            <Route path="/newproduct">
              <NewProduct />
            </Route>
            <Route path="/comments">
              <CommentList/>
            </Route>
            <Route path="/comment/:commentId">
              <Comment/>
            </Route>
          </div>
        </>
      )}
      <Route path="*" >
        <ErrorPage/>
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
