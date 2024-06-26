import React, { useState, useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { useAuth } from "../../context/AuthContext";
import "../../styles/components/Home.scss";

// Register the required Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const DashboardChart = () => {
  const [data, setData] = useState({
    totalBeds: 0,
    totalComplaints: 0,
    totalPayments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            manager_email: user.manager_email,
            building_name: user.building_name,
            tenant_mobile: user.mobile,
          }),
        };

        const [bedsResponse, complaintsResponse, paymentsResponse] = await Promise.all([
          fetch("https://iiiqbets.com/pg-management/GET-Tenant-API-total-AVAILABLE-Beds.php", requestOptions),
          fetch("https://iiiqbets.com/pg-management/GET-API-total-complaints-for-tenant-dashboard.php", requestOptions),
          fetch("https://iiiqbets.com/pg-management/total-no-of-payments-GET-API-for-Tenant.php", requestOptions),
        ]);

        if (!bedsResponse.ok || !complaintsResponse.ok || !paymentsResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const bedsData = await bedsResponse.json();
        const complaintsData = await complaintsResponse.json();
        const paymentsData = await paymentsResponse.json();

        setData({
          totalBeds: bedsData[0]["Total Available Beds"],
          totalComplaints: complaintsData["Total Complaints"],
          totalPayments: paymentsData[0]["Total Payments"],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    // Destroy the chart instance when the component unmounts to avoid canvas reuse issues
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartData = {
    labels: [`Total Beds:${data.totalBeds}`, `Total Complaints:${data.totalComplaints}`, `Total Payments:${data.totalPayments}`],
    datasets: [
      {
        label: 'Dashboard Data',
        data: [data.totalBeds, data.totalComplaints, data.totalPayments],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="card">
      <h2>Dashboard Overview</h2>
      <Pie
        ref={chartRef}
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
}

export default DashboardChart;
