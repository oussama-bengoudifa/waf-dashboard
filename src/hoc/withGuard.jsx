import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//hooks
import { useAuth } from "../hooks";

//mantine
import { Loader } from "@mantine/core";

export const withGuard = (WrappedComponent) => {
  return function GuardedComponent(props) {
    const [permissions, setPermissions] = useState(false);
    const navigate = useNavigate();
    const token = useAuth();

    useEffect(() => {
      if (token !== null) {
        if (token === "expired") {
          navigate("/login");
        } else {
          setPermissions(true);
        }
      }
    }, [token]);

    if (!permissions)
      return (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loader variant="dots" color="#2A564E" />
        </div>
      );
    return <WrappedComponent {...props} />;
  };
};
