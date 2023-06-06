import React from "react";
import Button from "./Button";

function ShowList({ list }: { list: string[] }) {
  return (
    <div>
      {list.map((item: string) => (
        <li key={item}>
          {item}
          <Button text={"削除"} onClick={() => console.log("deleted")} />
          <Button text={"編集"} onClick={() => console.log("edited")} />
        </li>
      ))}
    </div>
  );
}

export default ShowList;
