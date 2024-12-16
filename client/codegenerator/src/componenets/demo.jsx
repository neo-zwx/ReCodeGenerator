import React, { useState ,useEffect } from "react";
import { EXAbstractFactoryPattern, CDAbstractFactoryPattern, HTAbstractFactoryPattern } from "../../window/CSWindow/AbstractFactoryModal.js";
import "../../css/pre.css";
import TableRow from "../TableRow.js";
//初始化表單數據
const initialFormData = {
  IAbstractProductA: "IAbstractProductA",
  PerformActionA: "PerformActionA",
  IAbstractProductB: "IAbstractProductB",
  PerformActionB: "PerformActionB",
  ConcreteProductA1: "ConcreteProductA1",
  ConcreteProductB1: "ConcreteProductB1",
  ConcreteProductA2: "ConcreteProductA2",
  ConcreteProductB2: "ConcreteProductB2",
  CreateProductA:"CreateProductA",
  CreateProductB:"CreateProductB",
  ConcreteFactory1:"ConcreteFactory1",
  ConcreteFactory2:"ConcreteFactory2",
  IAbstractFactoryAdd:"IAbstractFactoryAdd",
  ConcreteProductA1Des:"ConcreteProductA1Des",
  ConcreteProductB1Des:"ConcreteProductB1Des",
  ConcreteProductA2Des:"ConcreteProductA2Des",
  ConcreteProductB2Des:"ConcreteProductB2Des",
};

const demo = () => {
  const [htShow, setHTShow] = useState(false);
  const [exShow, setEXShow] = useState(false);
  const [cdShow, setCDShow] = useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const [generatedCode, setGeneratedCode] = useState("");
  const [displayContent, setDisplayContent] = useState('');

  const fetchAndUpdateDisplayContent = async (templateId) => {
    try {
      const response = await fetch(`http://localhost:3002/api/templates/${templateId}`);
      const data = await response.json();
  
      if (!data || !data.template_data) {
        console.error('No template data found');
        return;
      }
  
      let codeTemplate = data.template_data;
      Object.entries(formData).forEach(([key, value]) => {
        const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
        codeTemplate = codeTemplate.replace(regex, `<span class="highlight">${value}</span>`);
      });
  
      setDisplayContent(codeTemplate);
    } catch (error) {
      console.error('Error fetching template data:', error);
    }
  };
  
  // 使用 useEffect 鉤子在組件加載時自動執行
  useEffect(() => {
    fetchAndUpdateDisplayContent(7); // 初始渲染時加載 templateId 為 5 的模板
  }, []); // 空依賴數組表示這個 effect 只在組件首次渲染時執行
  










  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  const handleGenerateCode = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/templates/8`);
      const data = await response.json();
  
      if (!data || !data.template_data) {
        console.error('No template data found');
        return;
      }
  
      let codeTemplate = data.template_data;
  
      // 遍历 formData 对象，对每个属性进行替换操作
      Object.entries(formData).forEach(([key, value]) => {
        const regex = new RegExp(`\\$\\{${key}\\}`, 'g'); // 构建正则表达式，匹配形如 ${key} 的模式
        codeTemplate = codeTemplate.replace(regex, `<span class="highlight">${value}</span>`); // 替换并添加高亮
      });
  
      setGeneratedCode(codeTemplate); // 使用替换后的模板更新状态或其他操作
  
    } catch (error) {
      console.error('Error fetching template data:', error);
    }
  };
  
  const exportCodeToFile = () => {
    const blob = new Blob(
      [
        generatedCode
          .replace(/<span class="highlight">/g, "")
          .replace(/<\/span>/g, ""),
      ],
      {
        type: "text/plain",
      }
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
    const code = generatedCode
      .replace(/<span class="highlight">/g, "")
      .replace(/<\/span>/g, "");
    navigator.clipboard.writeText(code);
  };

  let list = document.querySelectorAll(".list");
  function activeLink() {
    list.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
  }
  list.forEach((item) => item.addEventListener("click", activeLink));


  return (
    <div className="patterns-container">
      <div class="row">
        <div class="col-md-12">
          <div class="cardt">
            <div class="cardt-info">
              <p class="titlet">Abstract Factory Pattern</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <h5 class="card-header">
              IntroduceWindow
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-aspect-ratio"
                viewBox="0 0 16 16"
              >
                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" />
                <path d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0z" />
              </svg>
            </h5>
            <div class="card-body" className="btn-card-body">
              <div className="button-container">
                <button
                  className="introducewindow-button"
                  onClick={() => setHTShow(true)}
                >
                  <span>Introduce</span>
                </button>
                {htShow && (
                  <HTAbstractFactoryPattern
                    show={htShow}
                    onHide={() => setHTShow(false)}
                    state="editing"
                  />
                )}
              </div>
              <div className="button-container">
                <button
                  className="introducewindow-button"
                  onClick={() => setEXShow(true)}
                >
                  <span>Implementation steps</span>
                </button>
                {exShow && (
                  <EXAbstractFactoryPattern
                    show={exShow}
                    onHide={() => setEXShow(false)}
                    state="editing"
                  />
                )}
              </div>
              <div className="button-container">
                <button
                  className="introducewindow-button"
                  onClick={() => setCDShow(true)}
                >
                  <span>Template Example</span>
                </button>
                {cdShow && (
                  <CDAbstractFactoryPattern
                    show={cdShow}
                    onHide={() => setCDShow(false)}
                    state="editing"
                  />
                )}
              </div>
            </div>

            <div class="card-footer"></div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-7">
          <div class="card">
            <div class="card-header">
              <div class="navigation">
                <ul>
                  <li
                    class="list active"
                    onClick={() =>fetchAndUpdateDisplayContent(8)} >
                    <span class="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-clipboard2-minus-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                        <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M6 8h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1" />
                      </svg>{" "}
                    </span>
                    <span class="text">Template</span>
                  </li>
                  <li
                    class="list"
                    onClick={() =>fetchAndUpdateDisplayContent(9)} > 
                    <span class="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-card-text"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                        <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
                      </svg>
                    </span>
                    <span class="text">Example</span>
                  </li>
                  <div class="indicator"></div>
                </ul>
              </div>{" "}
            </div>
            <div class="card-body">
            {/* 這裡使用 dangerouslySetInnerHTML 是為了渲染 HTML 字符串，請確保您的內容是安全的，以防止 XSS 攻擊。 */}
            <pre dangerouslySetInnerHTML={{ __html: displayContent }} className="excode" />                         
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div class="card">
            <h5 class="card-header">
              InputTable
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-input-cursor-text"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 2a.5.5 0 0 1 .5-.5c.862 0 1.573.287 2.06.566.174.099.321.198.44.286.119-.088.266-.187.44-.286A4.17 4.17 0 0 1 10.5 1.5a.5.5 0 0 1 0 1c-.638 0-1.177.213-1.564.434a3.5 3.5 0 0 0-.436.294V7.5H9a.5.5 0 0 1 0 1h-.5v4.272c.1.08.248.187.436.294.387.221.926.434 1.564.434a.5.5 0 0 1 0 1 4.17 4.17 0 0 1-2.06-.566A5 5 0 0 1 8 13.65a5 5 0 0 1-.44.285 4.17 4.17 0 0 1-2.06.566.5.5 0 0 1 0-1c.638 0 1.177-.213 1.564-.434.188-.107.335-.214.436-.294V8.5H7a.5.5 0 0 1 0-1h.5V3.228a3.5 3.5 0 0 0-.436-.294A3.17 3.17 0 0 0 5.5 2.5.5.5 0 0 1 5 2"
                />
                <path d="M10 5h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4v1h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4zM6 5V4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
              </svg>
            </h5>
            <div class="card-body">
              <table>
                <tbody>
                  {Object.entries(formData).map(([key, value]) => (
                    <TableRow
                      key={key}
                      label={key}
                      value={value === initialFormData[key] ? "" : value} // 如果值等於初始值，將其設置為空字符串
                      onChange={(value) => handleInputChange(key, value)}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div class="card-footer">
              <button class="generatedcode-button" onClick={handleGenerateCode}>
                <span>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  Generate Code
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div>
                {" "}
                <span>Generated Code</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-code-slash"
                  viewBox="0 0 16 16"
                  className="codesvd"
                >
                  <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0" />
                </svg>
              </div>
              <div className="exportbutton">
                <ul class="wrapper">
                  <li class="icon black" onClick={copyGeneratedCode}>
                    <span class="tooltip">Copy to Clipboard</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-copy"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                        />
                      </svg>{" "}
                    </span>
                  </li>
                  <li class="icon black" onClick={exportCodeToFile}>
                    <span class="tooltip">Export to file</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-cloud-arrow-down-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708" />
                      </svg>{" "}
                    </span>
                  </li>
                  <li class="icon black" onClick={exportCodeToFile}>
                    <span class="tooltip">Save</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-floppy2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v3.5A1.5 1.5 0 0 1 11.5 6h-7A1.5 1.5 0 0 1 3 4.5V1H1.5a.5.5 0 0 0-.5.5m9.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
                      </svg>{" "}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              {generatedCode && (
                <pre
                  dangerouslySetInnerHTML={{ __html: generatedCode }}
                  className="generated-code"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default demo;
