import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home'
import Feeds from './components/Feeds'
import About from './components/About'
import Login from './components/Login'
import Signup from './components/Signup'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Userdashboard from './Userservice/Userdashboard';
import Privateroute from './Userservice/Privateroute';
import Postpage from './components/Postpage';
import Footer from './components/Footer';
import CategoryFeeds from './components/CategoryFeeds';
import UpdatePost from './components/UpdatePost';

function App() {
  return (
    
    <>
    <BrowserRouter>
    <Navbar />
    <ToastContainer position='bottom-center' />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/feeds" element={<Feeds />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/post/:postId" element={<Postpage />}></Route>
      <Route path="/category/:categoryId" element={<CategoryFeeds/>}></Route>
      
      <Route path="/user" element={<Privateroute />}>
        <Route path="dashboard" element={<Userdashboard />}></Route>
        <Route path="updatepost/:postId" element={<UpdatePost />}></Route>
      </Route>

    </Routes>
    <Footer />
  </BrowserRouter>
    </>
  );
}

export default App;
