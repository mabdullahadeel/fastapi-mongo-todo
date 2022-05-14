import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Authenticated = (props) => {
  const { children } = props;
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login", { replace: true, state: { from: location } });
    } else {
      setVerified(true);
    }
  }, [auth.isAuthenticated, location, navigate]);

  if (!verified) {
    return null;
  }

  return <>{children}</>;
};
