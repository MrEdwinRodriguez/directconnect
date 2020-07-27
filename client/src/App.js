import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions'
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import EditAccount from './components/edit-credentials/edit-account/EditAccount';
import EditExperience from './components/edit-credentials/edit-experience/EditExperience';
import EditEducation from './components/edit-credentials/edit-education/EditEducation';
import EditBusiness from './components/edit-credentials/edit-business/EditBusiness';
import AddEducation from './components/add-credentials/AddEducation';
import AddBusiness from './components/add-credentials/AddBusiness';
import AddHiring from './components/hiring/AddHiring';
import EditHiring from './components/hiring/EditHiring';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import EditPost from './components/post/EditPost';
import EditComment from './components/post/EditComment';
import Positions from './components/positions/Positions';
import Busineseses from './components/businesses/Businesses';
import Blogs from './components/blogs/Blogs';
import Blog from './components/blogs/Blog';
import Podcasts from './components/podcasts/Podcasts';
import Podcast from './components/podcasts/Podcast';
import Business from './components/businesses/Business';
import Position from './components/positions/Position';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
 
import './App.css';
 
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
 
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}
 
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgot_password" component={ForgotPassword} />
              <Route exact path="/reset/:token" component={ResetPassword} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/account" component={EditAccount} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profile/experience/:exp" component={EditExperience} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profile/education/:edu" component={EditEducation} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profile/business/:bus" component={EditBusiness} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-education" component={AddEducation} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-business" component={AddBusiness} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-hiring" component={AddHiring} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profile/edit-hiring/:hire" component={EditHiring} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profiles" component={Profiles} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profiles/orginization/phi_beta_sigma" component={Profiles} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profiles/orginization/zeta_phi_beta" component={Profiles} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profile/search/:criteria" component={Positions} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profile/:handle" component={Profile} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/edit/:id" component={EditPost} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/comment/edit/:id" component={EditComment} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/hiring" component={Positions} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/hiring/search/:criteria" component={Positions} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/businesses" component={Busineseses} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/businesses/search/:criteria" component={Busineseses} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/blogs" component={Blogs} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/content/blog/:blog" component={Blog} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/podcasts" component={Podcasts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/content/podcast/:podcast" component={Podcast} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/business/:business" component={Business} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/position/:id" component={Position} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
 
export default App;