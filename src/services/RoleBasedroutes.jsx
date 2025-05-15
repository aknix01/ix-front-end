// RoleBasedRoute.js
import React from "react";

const RoleBasedRoutes = ({ allowedRoles, children }) => {
  const userRole = sessionStorage.getItem("Role");

  if (allowedRoles.includes(userRole)) {
    return children;
  } else {
    return <div>⛔ Access Denied</div>;
  }
}

export default RoleBasedRoutes;