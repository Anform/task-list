import React from "react";
import FileUploadPage from "./components/FileUploadPage";
import FirebaseTable from "./FirebaseTable";
import {useState} from "react"
import "./App.css"

function App() {
  const [currentOption, setOption] = useState(false)
  return (
    <div>
      <rect>
      <svg className = "symbol"></svg>
      <p className = "title">Resume Parser</p>
      <button className = "button1" onClick = {() => setOption(false)}>Submit Resume</button>
      <button className = "button2" onClick = {() => setOption(true)}>Database View</button>
      </rect>
      {currentOption === false ? (
        <>
        <h1>Upload Resume</h1>
        <FileUploadPage />
        </>
      ) : (
        <>
        <FirebaseTable />
        </>
      )}
    </div>
  );
}

export default App;

