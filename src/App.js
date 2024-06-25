import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyB9sI3GOJUC1vvMy-B_djXFEp8nvz-RbDU",
  authDomain: "pg-tenant-new.firebaseapp.com",
  projectId: "pg-tenant-new",
  storageBucket: "pg-tenant-new.appspot.com",
  messagingSenderId: "30772425",
  appId: "1:30772425:web:9ce648a92590dc60bc5118"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, getFirestore, auth };

const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/" replace />;
};

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