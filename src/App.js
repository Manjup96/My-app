import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Complaints from './Pages/Complaints/ComplaintsDetails';
import Profile from './Pages/Profile/Profile'
import News from './Pages/News/News';
import Meals from './Pages/Meals/Meals';
// import Payments from './Pages/Payments/Payments';
import PaymentsDetails from './Pages/Payments/PaymentsDetails';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App() {
    const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>

    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Home/>} />
        <Route path="/complaints" element={<Complaints/>} />
        
        <Route path="/profile" element={<Profile/>} />
        <Route path="/news" element={<News/>} />
        <Route path="/meals" element={<Meals/>} />
        <Route path="/payments" element={<PaymentsDetails/>} />
      
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </QueryClientProvider>
  );
}