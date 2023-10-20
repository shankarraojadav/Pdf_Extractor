import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../auth/firebaseConfig";
import { googleSignIn } from "../../state/api";
import {theme} from "../../theme";

export default function Login() {
  const dispatch = useDispatch();
  const {user, isLoading, isLoggedIn, error} = useSelector((state) => state.signin) || {};

  if (user && user.jwtToken) {
    localStorage.setItem("jwt", user.jwtToken);
  }
  
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { uid, displayName, email, photoURL } = result.user;
      const userData = {
        uid: uid,
        displayName: displayName,
        email: email,
        photoURL: photoURL,
      };

      dispatch(googleSignIn(userData));

    
    
    } catch (error) {
      console.log(error);
    }
  };

  if(isLoading) {
    return <Box sx={{
      display:"flex", justifyContent:"center", mt:"40vh"
    }}>
      <CircularProgress />
    </Box>
  }
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "40vh",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "4vh",
          fontWeight: "bold",
          color: "#6499E9",
          [theme.breakpoints.down('ms3')]: {
            fontSize: "3vh",
          }
        }}
      >
        Want to get in? Sign in
        <img
          src="https://res.cloudinary.com/dflhxdxgb/image/upload/v1696849779/hand_kpn0xq.png"
          width="20vh"
        />
      </Typography>

      <Button
        variant="contained"
        sx={{
          background: "#fff",
          color: "#363062",
          width: "fit-content",
          marginTop: "5vh",
        }}
        onClick={signInWithGoogle}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "4vh",
            fontWeight: "bold",
            [theme.breakpoints.down('ms3')]: {
              fontSize: "3vh",
            }
          }}
        >
          <Google sx={{ fontSize: "4vh" }} />
          Sign in with Google
        </Typography>
      </Button>
    </Box>
  );
}
