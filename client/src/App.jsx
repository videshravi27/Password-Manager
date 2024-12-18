import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Display from './pages/Display'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar';
import PostPass from './components/PostPass';
import UpdatePass from './components/UpadatePass'
import { Toaster } from 'react-hot-toast';

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              marginTop: '52px',
              marginRight: '20px',
            },
          },
          error: {
            style: {
              marginTop: '52px',
              marginRight: '20px',
            },
          },
        }}
      />

      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={user ? <Display /> : <Navigate to="/login" />} />
            <Route path="/updatepassword/:id" element={<UpdatePass />} />
            <Route path="/post" element={user ? <PostPass /> : <Navigate to="/login" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
