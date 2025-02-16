import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();

  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to="/?sign-in=true" />;
  }

  if (
    user !== undefined &&
    !user.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" />;
  }

  return children;
}

export default ProtectedRoute;

//cleark se hook milta hai to check weather user is logged in or not
//and global variable bhi milte hai like issignedin,user,isloaded
//children

//if user is loaded and is not signed in and issigned in undefined nahi hona chahiye woh false hona chahiye
//  if (Search.get("sign-in")) {
//   setshowSignIn(true);
