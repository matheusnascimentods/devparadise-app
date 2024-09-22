import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Components
import Header from './components/header/Header';
import Container from './components/container/Container';
import { ToastContainer } from 'react-toastify';

//Pages
import Home from './components/pages/Home/Home';
import Search from './components/pages/Search/Search';
import Login from './components/pages/Auth/Login';
import Signup from './components/pages/Auth/Signup';
import Me from './components/pages/Me/Me';
import UpdateUser from './components/pages/UpdateUser/UpdateUser';
import DeleteUser from './components/pages/DeleteUser/DeleteUser';
import Changepassword from './components/pages/ChangePassword/Changepassword';
import MyProjects from './components/pages/MyProjects/MyProjects';
import AddProject from './components/pages/AddProject/AddProject';
import EditProject from './components/pages/EditProject/EditProject';
import ProjectView from './components/pages/ProjectView/ProjectView';
import User from './components/pages/User/User';

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
            <Route path='/search' element={ <Search /> }/>
            <Route path='/login' element={ <Login /> }/>
            <Route path='/signup' element={ <Signup /> }/>
            <Route path='/me' element={ <Me /> }/>
            <Route path='/me/update' element={ <UpdateUser /> }/>
            <Route path='/me/delete' element={ <DeleteUser /> }/>
            <Route path='/me/changePassword' element={ <Changepassword /> }/>
            <Route path='/me/projects' element={ <MyProjects /> }/>
            <Route path='/me/projects/new' element={ <AddProject /> }/>
            <Route path='/me/projects/update/:id' element={ <EditProject /> }/>
            <Route path='/projects/:id' element={ <ProjectView /> }/>
            <Route path='/user/:username' element={<User /> }/>
          </Routes>
        </Container>
      </UserProvider>
    </Router>
  )
}

export default App
