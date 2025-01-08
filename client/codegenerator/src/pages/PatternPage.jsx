import React, { useState, useEffect, useReducer } from "react";
import ModalButtonGroup from "../componenets/ModalButtonGroup";
import TemplateContent from "../componenets/TemplateContent";
import FormInputTable from "../componenets/FormInputTable";
import TableRow from "../componenets/TableRow";
import CodePreview from "../componenets/CodePreview";

import { HTFactoryPattern, EXFactoryPattern, CDFactoryPattern } from "../modal/FactoryModal";

//當patterndata傳入patternpage後，該組件會根據數據進行條件渲染
const PatternPage = ({ patternData }) => {
  const modalState = {
    htShow: false,
    exShow: false,
    cdShow: false,
  };

  const [formData, setFormData] = useState(patternData.initialFormData);
  const [generatedCode, setGeneratedCode] = useState("");
  const [displayContent, setDisplayContent] = useState("");

  console.log("Received patternData in PatternPage:", patternData);
  console.log("initialFormData", patternData.initialFormData);
  console.log("formdata", formData);

  //當patternData存在，則顯示數據的標題、id以及初始表單數據，否則顯示加載中
  if (!patternData) {
    return <div>Loading...</div>;
  }

  //取得templateID和exampleId來更新顯示內容
  //在useeffect中，我們會調用fetchpatterndata並處理返回的promise(由於fetchpatterndata是一個異步函數)
  //當數據加載完成後，會更新patternData狀態，並將最新的數據傳遞給patternpage
  useEffect(() => {
    if (patternData.templateId) {
      fetchAndUpdateDisplayContent(patternData.templateId);
    }
    if (patternData.exampleId) {
      fetchAndUpdateDisplayContent(patternData.exampleId);
    }
  }, [patternData]);

  //todo
  //根據templateId獲取模板替換佔位符
  const fetchAndUpdateDisplayContent = async (templateId) => {
    if (!templateId || typeof templateId !== "string") {
      console.error("Imvalid templateId", templateId);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/templates/custom_id/${templateId}`
      );
      const data = await response.json();

      if (!data || !data.template_data) {
        console.error("No template data found");
        return;
      }

      let codeTemplate = data.template_data;
      Object.entries(formData).forEach(([key, value]) => {
        const regex = new RegExp(`\\$\\{${key}\\}`, "g");
        codeTemplate = codeTemplate.replace(
          regex,
          `<span class="highlight">${value}</span>`
        );
      });

      setDisplayContent(codeTemplate);
    } catch (error) {
      console.error("Error fetching template data:", error);
    }
  };
  const fetchExampleDisplayContent = async (exampleId) => {
    if (!exampleId || typeof exampleId !== "string") {
      console.error("Imvalid templateId", templateId);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/templates/custom_id/${exampleId}`
      );
      const data = await response.json();

      if (!data || !data.template_data) {
        console.error("No template data found");
        return;
      }

      let codeTemplate = data.template_data;

      setDisplayContent(codeTemplate);
    } catch (error) {
      console.error("Error fetching template data:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  //生成代碼
  const handleGenerateCode = async (templateId) => {
    console.log("templateId:", templateId);
    if (typeof templateId !== "string") {
      console.error("Invalid templateId:", templateId);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/api/templates/custom_id/${templateId}`
      );
      const data = await response.json();

      if (!data || !data.template_data) {
        console.error("No template data found");
        return;
      }

      let codeTemplate = data.template_data;
      Object.entries(formData).forEach(([key, value]) => {
        const regex = new RegExp(`\\$\\{${key}\\}`, `g`);
        codeTemplate = codeTemplate.replace(
          regex,
          `<span class="highlight">${value}</span>`
        );
      });

      setGeneratedCode(codeTemplate);
    } catch (error) {
      console.error("Error fetching template data:", error);
    }
  };

  const exportCodeToFile = () => {
    const blob = new Blob(
      [
        generatedCode
          .replace(/<span class="highlight">/g, "")
          .replace(/<\/span>/g, ""),
      ],
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
    const code = generatedCode
      .replace(/<span class="highlight">/g, "")
      .replace(/<\/span>/g, "");
    navigator.clipboard.writeText(code);
  };

  //redcer函數:根據acction.type來更新state
  //state:當前的狀態，包含所有屬性狀態
  //action:描述要執行的操作對象，具有type屬性來指定操作類型
  const modalReducer = (state, action) => {
    //根據action.type來更新state
    switch (action.type) {
      //如果action.type為TOGGLE_HT，則返回一個新的對象，並將htShow的值取反(即true變false，false變true)
      case 'TOGGLE_HT':
        return { ...state, htShow: !state.htShow };
      case 'TOGGLE_EX':
        return { ...state, exShow: !state.exShow };
      case 'TOGGLE_CD':
        return { ...state, cdShow: !state.cdShow };
      //默認情況下，返回當前狀態
      default:
        return state;
    }
  };

  //使用useReducer來管理modal的狀態,usereducer接受兩個參數，第一個參數是reducer函數，第二個參數是初始狀態
  const [state, dispatch] = useReducer(modalReducer, modalState); //定義modal的初始狀態物件
  const { htShow, exShow, cdShow } = state; //從state中解構出htShow,exShow,cdShow
  // const buttons2 = [
  //   {
  //     label: "Introduce",
  //     onClick: () => dispatch({ type: "TOGGLE_HT" }),
  //     modal: htShow
  //       ? {
  //           component: modalComponents.HT,
  //           show: htShow,
  //           onHide: () => setHTShow(false),
  //         }
  //       : null,
  //   },
  //   {
  //     label: "Implementation steps",
  //     onClick: () => setEXShow(true),
  //     modal: exShow
  //       ? {
  //           component: modalComponents.EX,
  //           show: exShow,
  //           onHide: () => setEXShow(false),
  //         }
  //       : null,
  //   },
  //   {
  //     label: "Template Example",
  //     onClick: () => setCDShow(true),
  //     modal: cdShow
  //       ? {
  //           component: modalComponents.CD,
  //           show: cdShow,
  //           onHide: () => setCDShow(false),
  //         }
  //       : null,
  //   },
  // ];

  const buttons = [
    {
      label: "Introduce",
      onClick:()=>dispatch({type:'TOGGLE_HT'}),
      //當用戶點擊按鈕時，會調用dispatch函數，並傳遞一個action對象，該對象包含type屬性，用來指定操作類型
      //modal屬性:每個按鈕的 modal 屬性定義了是否顯示 modal，及其對應的組件和事件處理。當 htShow 為 true 時，Introduce 按鈕會關聯到 HTFactoryPattern 彈窗，並將其顯示。
      modal: htShow
      ? {
          component: HTFactoryPattern,
          //
          show: htShow,
          onHide: () => dispatch({ type: "TOGGLE_HT" }),
        }
      : null,
    },
    {
      label: "Implementation steps",
      onClick:()=>dispatch({type:'TOGGLE_EX'}),modal: exShow
      ? {
          component: EXFactoryPattern,
          show: exShow,
          onHide: () => dispatch({ type: "TOGGLE_EX" }),
        }
      : null,
    },
    {
      label: "Template Example",
      onClick:()=>dispatch({type:'TOGGLE_CD'}),modal: cdShow
      ? {
          component: CDFactoryPattern,
          show: cdShow,
          onHide: () => dispatch({ type: "TOGGLE_CD" }),
        }
      : null,
    }
  ];

  return (
    <div className="patterns-container">
      <div className="row">
        <div className="col-md-12">
          <div className="cardt">
            <div className="cardt-info">
              <p className="titlet">{patternData.title}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <h5 className="card-header">
              IntroduceWindow
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-aspect-ratio"
                viewBox="0 0 16 16"
              >
                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" />
                <path d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0z" />
              </svg>
            </h5>
            <div className="card-body">
              <ModalButtonGroup buttons={buttons} />
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-7">
          <TemplateContent
            templateId={patternData.templateId}
            exampleId={patternData.exampleId}
            displayContent={displayContent}
            fetchAndUpdateDisplayContent={() =>
              fetchAndUpdateDisplayContent(patternData.templateId)
            }
            fetchExampleDisplayContent={() =>
              fetchExampleDisplayContent(patternData.exampleId)
            }
          />
        </div>
        <div className="col-md-5">
          <div className="card-body">
            <p>Input</p>
            {Object.entries(formData).map(([key, value]) => (
              <TableRow
                key={key}
                label={key}
                value={value === patternData.initialFormData[key] ? "" : value} // 如果值等於初始值，將其設置為空字符串
                onChange={(value) => handleInputChange(key, value)}
              />
            ))}
          </div>

          <div className="card-footer">
            <button
              className="generatedcode-button"
              onClick={() => handleGenerateCode(patternData.templateId)}
            >
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

      <div className="row">
        <CodePreview generatedCode={generatedCode} />
      </div>
    </div>
  );
};

export default PatternPage;
