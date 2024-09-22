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
import AddProject from './components/pages/AddProject/AddProject';
import MyProjects from './components/pages/MyProjects/MyProjects';
import EditProject from './components/pages/EditProject/EditProject';
import UserProfile from './components/pages/UserProfile/UserProfile';
import ProjectView from './components/pages/ProjectView/ProjectView';
import Searchpage from './components/pages/Searchpage/Searchpage';
import DeleteUser from './components/pages/DeleteUser/DeleteUser';

//Context 
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <ToastContainer />
        <Header/>
        <Container>
          <Routes>
            <Route path='/' element={ <Home /> }/>
            <Route path='/search' element={ <Searchpage /> }/>
            <Route path='/login' element={ <Login /> }/>
            <Route path='/register' element={ <DevRegister /> }/>
            <Route path='/me' element={ <MyProfile /> }/>
            <Route path='/me/update' element={ <EditProfileDev /> }/>
            <Route path='/me/delete' element={ <DeleteUser /> }/>
            <Route path='/me/changePassword' element={ <Changepassword /> }/>
            <Route path='/me/projects' element={ <MyProjects /> }/>
            <Route path='/me/projects/new' element={ <AddProject /> }/>
            <Route path='/me/projects/update/:id' element={ <EditProject /> }/>
            <Route path='/projects/:id' element={ <ProjectView /> }/>
            <Route path='/user/:username' element={<UserProfile /> }/>
          </Routes>
        </Container>
      </UserProvider>
    </Router>
  )
}

export default App
