import { useState, useRef } from "react";
import classes from "./UploadView.module.css";

const UploadView = () => {
  const [error, setError] = useState();
  const inputFileRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();

    formData.append("file", file);

    fetch(`http://localhost:8080/upload-file`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        runCleanAndTrain();
      });
  };
  const openBrowseDialog = () => {
    if (!inputFileRef.current) return;

    inputFileRef.current.click();
  };

  const runCleanAndTrain = () => {
    console.log("runClearAndTrain");

    fetch(`http://localhost:8080/clean-and-train`, { method: "POST" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })
      .then((data) => {
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className={classes.wrapper}>
      <input
        type="file"
        id="upload-file-input"
        style={{ display: "none" }}
        multiple={false}
        accept=".csv"
        ref={inputFileRef}
        onChange={(e) => handleFileSelect(e)}
      />
      <button className={classes.buttonUpload} onClick={openBrowseDialog}>
        Select file to upload
      </button>
    </div>
  );
};

export default UploadView;
