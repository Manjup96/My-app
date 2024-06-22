import React, { useEffect } from "react";
import WelcomeMessage from "./WelcomeMessage";
import Dashboard from "./Dashboard";
// import Logout from "./Logout";
import { useAuth } from "../../context/AuthContext";
// import UserDetails from "../Profile/UserDetails";
import Sidebar from "../../shared/Sidebar";
import "../../styles/components/Home.scss";

const Home = () => {
  const { user } = useAuth();
  useEffect(() => {
    // This effect will run on component mount and whenever the user state changes
    if (!user) {
      // If there's no user, handle accordingly, maybe redirect to login
    }
  }, [user]);
  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-md-12">
          <Sidebar />
        </div>
        <main className="col-md-10 ms-sm-auto col-lg-10 px-md-4">
          {" "}
          {/* This is your main content */}
          <div className="container" style={{ marginTop: "20px" }}>
            <WelcomeMessage />
            {/* <Logout /> */}
            <Dashboard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
