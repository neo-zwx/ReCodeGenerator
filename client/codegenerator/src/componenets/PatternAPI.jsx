// api/patternApi.js
//條件式渲染

import { EXFactoryPattern, HTFactoryPattern,CDFactoryPattern } from "../modal/FactoryModal";

//數據原是定義在patterns物件中的靜態數據，模擬了設計模式資料庫
const patterns = {
  factory: {
    csharp: {
      title: "Factory Pattern",
      templateId: "5",
      exampleId: "6",
      initialFormData: {
        IProduct: "IProduct",
        Operation: "Operation",
        ConcreteProductA: "ConcreteProductA",
        ConcreteProductAOperation: "ConcreteProductAOperation",
        ConcreteProductB: "ConcreteProductB",
        ConcreteProductBOperation: "ConcreteProductBOperation",
        IFactory: "IFactory",
        ConcreteFactoryA: "ConcreteFactoryA",
        ConcreteFactoryB: "ConcreteFactoryB",
        factoryA: "factoryA",
        productA: "productA",
        factoryB: "factoryB",
        productB: "productB",
      },
      modalComponents:{
        HT: HTFactoryPattern,
        EX: EXFactoryPattern,
        CD: CDFactoryPattern,
      }
    },
    java :{
      title: "Factory Pattern",
      templateId: "67",
      exampleId: "68",
      initialFormData: {
        use: "use",
        Operation: "Operation",
        ConcreteProductA: "ConcreteProductA",
        ConcreteProductB: "ConcreteProductB",
      },
      modalComponents:{
        HT: HTFactoryPattern,
        EX: EXFactoryPattern,
        CD: CDFactoryPattern,
      }
    },
  },
  flyweight: {
    csharp:{
    title: "Flyweight Pattern",
    templateId: "2",
    exampleId: "3",
    initialFormData: {
      Operation: "Operation",
      extrinsicState: "extrinsicState",
      intrinsicState: "intrinsicState",
    },
    modalComponents:{
      HT: HTFlyweightPattern,
      EX: EXFactoryPattern,
      CD: CDFactoryPattern,
    }
  },
  java:{
    title: "Flyweight Pattern",
    templateId: "80",
    exampleId: "81",
    initialFormData: {
      Operation: "Operation",
      externalState:"extrnalState",
      intrinsicState:"intrinsicState",
    },
    modalComponents:{
      HT: HTFactoryPattern,
      EX: EXFactoryPattern,
      CD: CDFactoryPattern,
    }

  },
  },
  builder:{
    csharp:{
      title: "Builder Pattern",
      templateId: "11",
      exampleId: "12",
      initialFormData: {
        BuilderPartA: "BuilderPartA",
        BuilderPartB: "BuilderPartB",
        ConcreteBuilder: "ConcreteBuilder",
        PartA:"PartA",
        PartB:"PartB",
        ConcreteBuilder2:"ConcreteBuilder2",
        PartX:"PartX",
        PartY:"PartY"
      },
  
    },
    java:{
      title: "Builder Pattern",
      templateId: "74",
      exampleId: "75",
      initialFormData: {
        partA: "partA",
        partB:"partB",
        partC:"partC",
        PartA: "PartA",
        PartB:"PartB",
        PartC:"PartC"
      },
  
    },

  },
};

//fetchpatterndata是模擬api的調用，他會根據選擇的模式名稱和語言，從patterns這個靜態對象中返回對應的數據
export const fetchPatternData = async (patternName,language) => {
  // 在實際應用中，這裡可能會是一個 API 調用
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(patterns[patternName]?.[language]);
    }, 100);
  });
};
