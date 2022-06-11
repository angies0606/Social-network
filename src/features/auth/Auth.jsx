import useAuth from "./useAuth";
import { AuthContext } from "./auth.context";

function Auth ({
  children
}) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export default Auth;