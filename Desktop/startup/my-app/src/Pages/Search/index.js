import "./style.css";
import { useState } from "react";

export default function Search() {
  const list = ["jerusalem", "eylat", "jafa"];
  const betterList = [
    { name: "jerusalem", delivery: "jsfa street", day: "28/07/2022" },
    { name: "eylat", delivery: "melachim street", day: "28/07/2022" },
    { name: "tlv", delivery: "ben yehuda street", day: "28/07/2022" }
  ];

  const [result, setResult] = useState("");

  function changeInput(searchValue) {
    setResult(list.filter((v) => v.startsWith(searchValue)));
  }

  return (
    <>
      <p>Where do you need delivery:</p>
      <input name="city" onInput={(e) => changeInput(e.target.value)} />
      <p>from when do you need your delivery:</p>
      <input name="startDate" type="date" />
      <p>until when do you need your delivery:</p>
      <input name="endDate" type="date" />
      <div>{result}</div>
    </>
  );
}
