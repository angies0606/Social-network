import { useAuthContext } from "@features/auth/auth.context";
import { Route } from "react-router-dom";

function UnauthedRoute ({...props}) {
  const {state: {isAuthed}} = useAuthContext();

  return (
    <>
      {!isAuthed && <Route {...props} />}
    </>
  )
}

export default UnauthedRoute;