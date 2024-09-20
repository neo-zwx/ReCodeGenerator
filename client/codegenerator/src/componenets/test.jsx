import App from "../App";

function Test() {
  const listItem = [
    { content: "張三", id: "abc" },
    { content: "李四", id: "xyz" },
    { content: "王武", id: "qaz" },
  ];

  const filterItems = listItem.filter((item) => {
    if (item.content !== "李四") {
      return true;
    }
  });

  return (
    <div className={true ? "a c" : "b c"}>
      {true ? <h1>hello</h1> : <h1>world</h1>}
    </div>
  );
}
export default Test;
