// useMeals.js
import { useQuery } from 'react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as necessary

export const useMeals = () => {
  const { user } = useAuth();

  const fetchMeals = async () => {
    if (!user) throw new Error('User is not authenticated');
    console.log('Fetching meals with:', {
      manager_email: user.manager_email,
      building_name: user.building_name,
      tenant_mobile: user.mobile,
    });
    const { data } = await axios.post('https://iiiqbets.com/pg-management/GET-Meals-for-tenant-API.php', {
      manager_email: user.manager_email,
      building_name: user.building_name,
      tenant_mobile: user.mobile,
    });
    return data;
  };

  return useQuery(
    ['meals', user?.manager_email, user?.building_name, user?.mobile],
    fetchMeals,
    {
      enabled: !!user?.manager_email && !!user?.building_name && !!user?.mobile,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};
