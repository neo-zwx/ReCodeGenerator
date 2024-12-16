import React from "react";

//使用者可以點擊不同的範本，並顯示對應的內容

//displayContent包含範本資料和要顯示的內容
//onFestchContent函數，用於在使用者點擊範本時加載對應的內容
const TemplateContent = ({
  templateId,
  exampleId,
  displayContent,
  fetchAndUpdateDisplayContent,
  fetchExampleDisplayContent,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="navigation">
          <ul>
            <li
              className="list active"
              onClick={() =>
                fetchAndUpdateDisplayContent(templateId)
              } // 调用传入的回调函数
            >
              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-clipboard2-minus-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                  <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M6 8h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1" />
                </svg>
              </span>
              <span className="text">Template</span>
            </li>
            <li
              className="list"
              onClick={() =>
                fetchExampleDisplayContent(exampleId)
              } // 调用传入的回调函数
            >
              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-card-text"
                  viewBox="0 0 16 16"
                >
                  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                  <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
                </svg>
              </span>
              <span className="text">Example</span>
            </li>
            <div className="indicator"></div>
          </ul>
        </div>
      </div>
      <div className="card-body">
        {/* 渲染 HTML 字符串，确保内容是安全的 */}
        <pre
          dangerouslySetInnerHTML={{ __html: displayContent }}
          className="excode"
        />
      </div>
    </div>
  );
};

export default TemplateContent;
