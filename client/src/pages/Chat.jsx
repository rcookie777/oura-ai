import React,{useEffect} from "react";

import Banner from "../partials/Banner";
import Header from "../partials/Header";
import ChatBox from "../partials/Chatbox";
import { AuthContext } from "../utils/AuthContext";


export default function Chat() {
    const { accessToken,setAccessToken } = React.useContext(AuthContext);

    useEffect(() => {
        // Check if the URL contains an access token
        // const urlParams = new URLSearchParams(window.location.hash.substr(1));
        // const accessToken = urlParams.get("access_token");
        const accessToken = "YPJMGUJF3IGYDNH5JBITXGP23HW23NT3"
        if (accessToken) {
          // Save the access token in the state
          setAccessToken(accessToken);
          console.log("accessToken set", accessToken);
        }
      }, []);
      
    return (
        <>
        <Header />
        <ChatBox />
        </>
    );
}