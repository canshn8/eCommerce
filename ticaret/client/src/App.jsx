import { BrowserRouter as Router,  Routes, Route, Switch, Redirect } from "react-router-dom";
import EditProfile from "./UserEvent/EditProfile/EditProfile";
import NewComment from "./pages/CommnentEvent/NewComment";
import Comment from "./pages/CommnentEvent/Comment";
import Profile from "./UserEvent/Profile/Profile";
import ProductList from "./pages/ProductList";
import NotFound from "./NotFound/ErrorPage";
import Favorites from "./pages/Favorites";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Success from "./pages/Success";
import Product from "./pages/Product";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

const App = () => {

  const user = useSelector((state) => state.user.isLoggedIn)
  console.log(user);
  
  return (
     <Router>
      <Switch>
        
        <Route path="/" exact>
          <Home/>
        </Route>

        <Route path="/search">
          <Search/>
        </Route>

        <Route path="/products/:category">
          <ProductList />
        </Route>
        
        <Route path="/product/:id">
          <Product />
        </Route>

        <Route path="/success">
          {user ? <Success/> : <Login />}
        </Route>
        
        <Route path="/profile">
          {user ? <Profile/> : <Login />}
        </Route>

        <Route path="/editProfile">
          {user ? <EditProfile/> : <Login />}
        </Route>
        
        <Route path="/cart">
          {user ? <Cart/> : <Login />}
        </Route>

        <Route path="/favorites">
          {user ? <Favorites/> : <Login />}
        </Route>
        
        <Route path="/comment">
          {user ? <Comment/> : <Login />}
        </Route>
        
        <Route path="/newComment">
          {user ? <NewComment/> : <Login />}
        </Route>

        <Route path="/login">
          {user ? <Home/> : <Login />}
        </Route>

        <Route path="/register">
          {user ? <Home/> : <Register />}
        </Route>

        <Route path="*" >
          <NotFound/>
        </Route>

      </Switch>
    </Router>
  )
};

export default App;