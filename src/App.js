import "./App.css";
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
var formData = new FormData();

function App() {
  const fileTypes = ["html", "html5"];
  const [file, setFile] = useState(null);

  function DragDrop(file) {
    const handleChange = (file) => {
      setFile(file);
    };
    return (
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    );
  }
  // useEffect(() => {
  //   formData.append("value", file);
  // }, [file]);
  const handleUpload = async () => {
    formData.append("value", file);
    console.log(JSON.stringify(formData));
    const data = await fetch("https://api.sinbad.cloud/api/html_to_pdf/", {
      method: "POST",
      body: formData,
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };
  console.log(file);
  return (
    <div className="App">
      <h1>Html 2 Pdf</h1>
      <div className="uploadSection">
        <DragDrop file={file} />
        <Button variant="contained" onClick={handleUpload}>
          Upload
        </Button>
      </div>
      {file && (
        <div>
          <h3>File Added => {file.name}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
