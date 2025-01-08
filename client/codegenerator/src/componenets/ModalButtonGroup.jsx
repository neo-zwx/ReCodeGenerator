import React from "react";

//這個組件負責顯示一組按鈕，每個按鈕對應一個彈出框（Modal）。我們可以將按鈕和彈出框的邏輯抽取出來，並通過 props 傳遞不同的 Modal 組件。

// 根據buttons陣列動態生成按鈕和對應的視窗，如果某個按鈕具有modal屬性，則會附帶一個可顯示和隱藏的modal建

//箭頭函式，會接收一個參數buttons，是一個包含按鈕資料的物件或陣列，用來告訴組件要渲染那些按鈕以及按鈕的行為
const ModalButtonGroup=({buttons})=>{


    return(
        <div className="btn-card-body">
            {/* map迴圈:讓陣列中每個元素執行完該函式後，將每個元素的執行結果回傳到一個新的陣列 */}
            {/* map(function (value正在處理的元素,index正在處理的元素索引,array舊陣列) {};) */}
            {buttons.map((button,index)=>(                 
                // TODO: 解決使用索引的問題
                <div className="button-contanier" key={index}>   {/*key是一個建立陣列時，必須使用的字串屬性，react會用key來分辨陣列裡元素，辨別元素的改變或增減，不建議使用索引作為key*/}                 
                    <button className="introducewindow-button" onClick={button.onClick}> {/* 當使用者點及該按鈕時，會觸發button.onClick函數 */}
                        <span>{button.label}</span>                        {/* 表示按鈕上的顯示文本式button.label，來自buttons陣列中的每個按鈕物件 */}
                    </button>
                    {/* 條件渲染modal，&&運算符，當條件為true時渲染元素*/}
                    {/* 如果button.modal存在，則渲染一個modal組件 */}
                    {/* button.modal.component是modal彈窗組件 */}
                    {/* show={button.modal.show}決定是否顯示modal */}
                    {/* onhide=當modal關閉時會觸發的事件處理器 */}
                    {/*將state屬性傳遞給modal組件 */}
                    {button.modal&&(
                        <button.modal.component
                        show={button.modal.show}
                        onHide={button.modal.onHide}
                        state="editing"
                        />
                    )}
                </div>
            ))}
        </div>
    );

};

export default ModalButtonGroup;