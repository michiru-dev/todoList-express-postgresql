import React from "react";

function ShowList({ list }: { list: string[] }) {
  return (
    <div>
      {list.map((item: string) => (
        <li key={item}>{item}</li>
      ))}
    </div>
  );
}

export default ShowList;
