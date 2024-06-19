// apiServices.js
import { TENANAT_LOGIN_URL } from './ApiUrls';



export const loginUser = async (username, password, loginCallback, errorCallback, navigate) => {
  try {
    const response = await fetch(TENANAT_LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({
        tenant_email: username,
        password: password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();

    if (data[0].Message.response === 'error') {
      console.log(data[0].Message.response);
      errorCallback("Please Check Your Credentials");
    } else {
      const tenant = {
        building_name: data[0].Message.building_name,
        manager_email: data[0].Message.manager_email,
        manager_mobile_no: data[0].Message.manager_mobile_no,
        username: data[0].Message.tenant_name,
        email: data[0].Message.tenant_email,
        mobile: data[0].Message.tenant_mobile,
        floor_no: data[0].Message.floor_no,
        room_no: data[0].Message.room_no,
        bed_no: data[0].Message.bed_no,
        id: data[0].Message.id,
      };

      loginCallback(tenant);
      navigate('/dashboard'); // Navigate after successful login
    }
  } catch (error) {
    console.error('Error:', error);
    errorCallback("An error occurred while processing your request. Please try again later.");
  }
};



