import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DetailsContextProvider } from './context/DetailContext.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <DetailsContextProvider>
      <App />
    </DetailsContextProvider>
  </AuthContextProvider>

)
