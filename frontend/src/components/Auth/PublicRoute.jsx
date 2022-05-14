import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const PublicRoute = (props) => {
  const { children } = props;
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/home", { replace: true, state: { from: location } });
    }
  }, [auth.isAuthenticated, location, navigate]);

  return <>{children}</>;
};
