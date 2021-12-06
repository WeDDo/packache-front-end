import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  
  const navigate = useNavigate();

  useEffect(() => {
    deleteToken();
    navigate('/login');
  })

  function deleteToken(){
    localStorage.removeItem('token');
  }

  return(
    <div>
      
    </div>
  )
}
export default Logout;