import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../utils/AuthContext";
import { getPersonalData, getSleepData, getAllSleepData } from "../utils/data";
import { fetchResponse } from "../utils/ChatGPT";
import { parseSleepData } from "../utils/DataParse";

function ChatBox() {
    const { accessToken,setAccessToken } = React.useContext(AuthContext);
    const [personalData, setPersonalData] = useState(null);
    
    const [startDate, setStartDate] = useState("2023-03-01");
    const [endDate, setEndDate] = useState("2023-03-07");
    const [sleepData, setSleepData] = useState(null);

    const [input, setInput] = useState("");
    const [userMessages, setUserMessages] = useState([]);
    const [response, setResponse] = useState([]);
    const chatContainerRef = useRef(null);
    const [ouraData, setOuraData] = useState(null);

    useEffect(() => {
        // Check if the URL contains an access token
        // const urlParams = new URLSearchParams(window.location.hash.substr(1));
        // const accessToken = urlParams.get("access_token");
        const accessToken = "YPJMGUJF3IGYDNH5JBITXGP23HW23NT3"
        if (accessToken) {
          // Save the access token in the state
          setAccessToken(accessToken);
          console.log("accessToken set from chatbox", accessToken);
        }
      }, []);
    

    function sendMessage() {
        const timestamp = new Date().toISOString();
        setUserMessages((prevMessages) => [...prevMessages, { text: input, timestamp, type: "user" }]);
        getResponse();
        setInput(""); // Clear the input after sending the message
    }

    useEffect(() => {
        async function fetchPersonalData() {
            try {
                const data = await getPersonalData(accessToken);
                setPersonalData(data);
                const timestamp = new Date().toISOString();
                setResponse((prevResponse) => [
                    ...prevResponse,
                    {
                        text: `Welcome to Oura.ai, ${data.email}! How can I help you with your lifestyle, health, and sleep? Please ask me a question and I'll do my best to provide an answer.`,
                        timestamp,
                        type: "response",
                    },
                ]);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
        async function fetchSleep() {
            try {
                const data = await getAllSleepData(accessToken, startDate, endDate);
                setSleepData(data);
                const ouraData = parseSleepData(data);
                setOuraData(ouraData);
            } catch (error) {
                console.error(error);
            }
        }
        // Call fetchPersonalData and fetchSleep only if accessToken is available
        if (accessToken) {
            fetchPersonalData();
            fetchSleep();
        }
    }, [accessToken]);

    useEffect(() => {
        scrollToBottom();
    }, [userMessages, response]);

    async function getResponse() {
        try {
            const responseText = await fetchResponse(input, ouraData);
            const timestamp = new Date().toISOString();
            setResponse((prevResponse) => [...prevResponse, { text: responseText, timestamp, type: "response" }]);
        } catch (error) {
            console.error(error);
        }
    }

    function combineAndSortMessages() {
        const combinedMessages = [...userMessages, ...response];
        combinedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        return combinedMessages;
    }

    function scrollToBottom() {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }

    return (
        <>
            <div className="flex h-screen antialiased text-gray-800">
                <div className="flex flex-row h-full w-full overflow-x-hidden">
                    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                        <div className="flex flex-row items-center justify-center h-12 w-full">
                            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10" >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg" >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                    ></path>
                                </svg>
                            </div>
                            <div className="ml-2 font-bold text-2xl">Oura AI</div>
                        </div>

                        <div className="flex flex-col mt-8">

                            <div className="flex flex-row items-center justify-between text-xs mt-6">
                                <span className="font-bold">Your Info</span>
                                <span
                                    className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
                                >{accessToken}</span>
                            </div>
                            <div className="flex flex-col space-y-1 mt-4 -mx-2">
                                <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2" >
                                    <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full" > A </div>
                                    <div className="ml-2 text-sm font-semibold">{personalData?.age}</div>
                                </button>
                            </div>
                            <div className="flex flex-col space-y-1 mt-4 -mx-2">
                                <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2" >
                                    <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full" > W </div>
                                    <div className="ml-2 text-sm font-semibold">{personalData?.weight}</div>
                                </button>
                            </div>
                            <div className="flex flex-col space-y-1 mt-4 -mx-2">
                                <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2" >
                                    <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full" > H </div>
                                    <div className="ml-2 text-sm font-semibold">{personalData?.height}</div>
                                </button>
                            </div>
                            <div className="flex flex-col space-y-1 mt-4 -mx-2">
                                <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2" >
                                    <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full" > S </div>
                                    <div className="ml-2 text-sm font-semibold">{personalData?.biological_sex}</div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col flex-auto h-full p-6">
                        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4" >
                            <div className="flex flex-col h-full overflow-x-auto mb-4" ref={chatContainerRef}>
                            <div className="flex flex-col h-full">
                                    {combineAndSortMessages().map((item, index) => (
                                        <div key={index}>
                                            {item.type === "response" ? (
                                                <div className="ml-3 text-sm bg-gray-200 mt-4 py-2 px-4 shadow rounded-xl min-w-fit">
                                                    <div>
                                                        <strong>Oura AI: </strong>
                                                        {item.text}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="relative ml-auto text-sm bg-indigo-200 mt-4 py-2 px-4 shadow rounded-xl min-w-fit">
                                                    {item.text}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4" >
                                <div>
                                    <button className="flex items-center justify-center text-gray-400 hover:text-gray-600" >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg" >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex-grow ml-4">
                                    <div className="relative w-full">
                                    <input
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                                sendMessage();
                                            }
                                        }}
                                        value={input}
                                        type="text"
                                        id="chat-input"
                                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" />
                                        <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600" >
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg" >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <button
                                        onClick={sendMessage}
                                        type="button"
                                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0" >
                                        <span>Send</span>
                                        <span className="ml-2">
                                            <svg
                                                className="w-4 h-4 transform rotate-45 -mt-px"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg" >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                ></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChatBox;