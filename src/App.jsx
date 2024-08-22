import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Components
import Header from './components/header/Header';
import Container from './components/container/Container';
import { ToastContainer } from 'react-toastify';

//Pages
import Home from './components/pages/Home/Home';
import Login from './components/pages/Auth/Login';
import DevRegister from './components/pages/Auth/DevRegister';
import MyProfile from './components/pages/MyProfile/MyProfile';
import EditProfileDev from './components/pages/EditProfileDev/EditProfileDev';
import Changepassword from './components/pages/ChangePassword/Changepassword';

//Context 
import { UserProvider } from './context/UserContext';
//Components

function App() {
  return (
    <Router>
      <UserProvider>
        <ToastContainer />
        <Header/>
        <Container>
          <Routes>
            <Route path='/' element={ <Home /> }/>
            <Route path='/login' element={ <Login /> }/>
            <Route path='/register' element={ <DevRegister /> }/>
            <Route path='/me' element={ <MyProfile /> }/>
            <Route path='/dev/edit-profile' element={ <EditProfileDev /> }/>
            <Route path='/dev/change-password' element={ <Changepassword /> }/>
          </Routes>
        </Container>
      </UserProvider>
    </Router>
  )
}

export default App
