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
            <Route path='/login' element={ <Login /> }/>
            <Route path='/register' element={ <DevRegister /> }/>
            <Route path='/me' element={ <MyProfile /> }/>
            <Route path='/search' element={ <Searchpage /> }/>
            <Route path='/dev/:username' element={<UserProfile /> }/>
            <Route path='/dev/edit-profile' element={ <EditProfileDev /> }/>
            <Route path='/dev/change-password' element={ <Changepassword /> }/>
            <Route path='/dev/delete-account' element={ <DeleteUser /> }/>
            <Route path='/dev/create-project' element={ <AddProject /> }/>
            <Route path='/dev/project/:id' element={ <ProjectView /> }/>
            <Route path='/dev/edit-project/:id' element={ <EditProject /> }/>
            <Route path='/dev/my-projects' element={ <MyProjects /> }/>
          </Routes>
        </Container>
      </UserProvider>
    </Router>
  )
}

export default App
