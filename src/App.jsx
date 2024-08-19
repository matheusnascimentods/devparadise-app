import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Components
import Header from './components/header/Header';
import Container from './components/container/Container';
import { ToastContainer } from 'react-toastify';

//Pages
import Home from './components/pages/Home/Home';
import Login from './components/pages/Auth/Login';
import DevRegister from './components/pages/Auth/DevRegister';

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
          </Routes>
        </Container>
      </UserProvider>
    </Router>
  )
}

export default App
