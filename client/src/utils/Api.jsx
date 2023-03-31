import React,{useState} from "react";


export default function Api() {
  const [data, setData] = useState([]);
  function callApi() {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => setData(res));
  }

  return (
    <div>
        <button onClick={callApi}>Get Data</button>
        <p>{data}</p>
    </div>
  );
}