import React, { useEffect, useState } from "react";
import "../css/select-contanier.css";
import Select from "react-select";
import { fetchPatternData } from "../componenets/PatternAPI";
import PatternPage from "./PatternPage";


//下拉選單:通過量個select選擇language和pattern


const languages = [
  { value: "java", label: "java" },
  { value: "csharp", label: "C#" },
];

const Patterns = [
  { value: "flyweight", label: "Flyweight Pattern" },
  { value: "factory", label: "Factory Pattern" },
  // { value: "Command Pattern", label: "Command Pattern" },
  // { value: "Mediator Pattern", label: "Mediator Pattern" },
  // { value: "Observer Pattern", label: "Observer Pattern" },
  // { value: "Bridge Pattern", label: "Bridge Pattern" },
  // { value: "Adapter Pattern", label: "Adapter Pattern" },
  { value: "builder", label: "Builder Pattern" },
  // {
  //   value: "Chain Of Responsibility Pattern",
  //   label: "Chain Of Responsibility Pattern",
  // },
  // { value: "Composite Pattern", label: "Composite Pattern" },
  // { value: "Decorator Pattern", label: "Decorator Pattern" },
  // { value: "Facade Pattern", label: "Facade Pattern" },
  // { value: "Interpreter Pattern", label: "Interpreter Pattern" },
  // { value: "Iterator Pattern", label: "Iterator Pattern" },
  // { value: "Memento Pattern", label: "Memento Pattern" },
  // { value: "Prototype Pattern", label: "Prototype Pattern" },
  // { value: "Proxy Pattern", label: "Proxy Pattern" },
  // { value: "State Pattern", label: "State Pattern" },
  // { value: "Strategy Pattern", label: "Strategy Pattern" },
  // { value: "Template Pattern", label: "Tempalte Pattern" },
  // { value: "Visitor Pattern", label: "Visitor Pattern" },
  // { value: "Abstract Factory Pattern", label: "Abstract Factory Pattern" },
];

const DesignSelect = () => {

  //useState狀態管理被用來管理選項中的selectedlanguage和selectedPattern以及獲取的patternData
  const [selectedPattern, setSelectedPattern] = useState("factory");
  const [selectedLanguage, setSelectedLanguge] = useState("csharp");
  const [patternData, setPatternData] = useState(null);

  //副作用處理的作用是監聽依賴變量selectedpattern和selectedlanguage的變化，並在這些值發生改變時調用fetchPatternData函數，向數據源請求相應的設計模式數據
  //當api返回數據後，useeffect會將數據更新到patternData狀態中，並觸發再次渲染，最終patternpage組件會收到最新數據
  //當選中的pattern或language改變時，更新patternData
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPatternData(selectedPattern, selectedLanguage);
      console.log("Fetched Data:", data); // 檢查是否獲取到數據
      console.log("pattern:",selectedPattern);
      console.log("lang",selectedLanguage);
      setPatternData(data); // 更新patternData狀態
    };
    fetchData();
  }, [selectedPattern, selectedLanguage]); // 當選擇變更時，觸發useEffect
  

  return (
    <div className="body-container">
      <div className="select-contanier">
        <div className="select-card">
          <div className="select-card-header">Design Pattern Selector</div>
          <div className="select-card-body">
            <div className="SelectDesignPattern">
              <p>Select Language:</p>
              <Select
                value={languages.find(lang=>lang.value===selectedLanguage)}
                onChange={(option) => setSelectedLanguge(option.value)}
                // onchange事件會觸發狀態更新(selectedlanguage和selectedpattern)，一旦狀態發生變化，useeffect會再次執行，去獲取新的設計模式數據
                options={languages}
              />
              <p>Select Design Pattern：</p>
              <Select
                value={Patterns.find(pattern => pattern.value === selectedPattern)}
                onChange={(option) => setSelectedPattern(option.value)}
                options={Patterns}
              />
            </div>
          </div>
        </div>
      </div>
      {/* 數據加載patternpage是一個顯示具體設計模式的組件，他接收來自父組件的patterndata作為道具(props) */}
      {/* 當patterndata存在時，會顯示具體的模式名稱、模板ID和初始數據，當數據尚未載入時，會顯示提示文字 */}
      {patternData ? (
  <PatternPage patternData={patternData} />
) : (
  <div>Loading pattern data...</div>
)}
      {/* 將patternData傳遞給PatternPage */}
    </div>
  );
};

export default DesignSelect;
