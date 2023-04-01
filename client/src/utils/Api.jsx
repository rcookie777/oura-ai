import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export default function Api() {
  const {accessToken} = React.useContext(AuthContext);
  console.log("accessToken", accessToken);

  return (
    <div>
      {accessToken && (
        <div>
          <p>Access Token: {accessToken}</p>
        </div>
      )}
    </div>
  );
}


























  // function callApi() {
  //   // Make a GET request to the server-side API endpoint
  //   fetch("https://us-central1-oura-ai.cloudfunctions.net/app/OuraAuth/data")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // Update the state with the data returned from the server-side API
  //       setData(data);
  //     })
  //     .catch((error) => {
  //       console.error("There was a problem fetching the data: ", error);
  //     });
  // }

  // useEffect(() => {
  //   // Check if the URL contains an access token
  //   const urlParams = new URLSearchParams(window.location.hash.substr(1));
  //   const accessToken = urlParams.get("access_token");
  //   if (accessToken) {
  //     // Save the access token in the state
  //     setAccessToken(accessToken);
  //     console.log("accessToken", accessToken);
  //   }
  // }, []);