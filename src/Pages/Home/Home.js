import React, { useEffect } from "react";
import WelcomeMessage from "./WelcomeMessage";
import TotalPayments from "./TotalPayments";
import TotalBeds from "./TotalBeds";
import TotalComplaints from "./TotalComplaints";
import TotalMeals from "./TotalMeals";

import DashboardChart from "./DashboardChart";
import Sidebar from "../../shared/Sidebar";
import "../../styles/components/Home.scss";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  useEffect(() => {
    // This effect will run on component mount and whenever the user state changes
    if (!user) {
      // If there's no user, handle accordingly, maybe redirect to login
    }
  }, [user]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Sidebar />
        </div>
        <main className="col-md-10 ms-sm-auto col-lg-10 px-md-4">
          <div className="container" style={{ marginTop: "20px" }}>
            <WelcomeMessage />
            <div className="dashboard">
              <TotalPayments/>
              <TotalBeds/>
              <TotalComplaints/>
            </div>
            <div className="dashborad-meal-card" >
            <TotalMeals/>
            </div>
            <div className="chart">
            <DashboardChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
