import React from "react";



const CodePreview = ({ generatedCode }) => {


  const exportCodeToFile = () => {
    const blob = new Blob(
      [generatedCode.replace(/<span class="highlight">/g, "").replace(/<\/span>/g, "")],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "generatedCode.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyGeneratedCode = () => {
    const code = generatedCode.replace(/<span class="highlight">/g, "").replace(/<\/span>/g, "");
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="col-md-12">
          <div className="exportbutton">
      <button onClick={copyGeneratedCode}>Copy to Clipboard</button>
      <button onClick={exportCodeToFile}>Export to File</button>
    </div>

      {generatedCode && (
        <div className="card">
          <div className="card-header">
            <span>Generated Code</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-code-slash codesvd"
              viewBox="0 0 16 16"
            >
              <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0" />
            </svg>
          </div>
          <div className="card-body">
            <pre
              dangerouslySetInnerHTML={{ __html: generatedCode }}
              className="generated-code"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CodePreview;
