import "./style.css";
import { useEffect, useState } from "react";
const fakeData = [
{
    name: "jerusalem",
    delivery: "haneviim street",
    day: new Date(28 / 7 / 2022),
  },
  { name: "jaffo", delivery: "begin street", day: new Date(20 / 8 / 2022) },
  { name: "jamayka", delivery: "begin street", day: new Date(20 / 8 / 2022) },
  {
    name: "eylat",
    delivery: "melachim street",
    day: new Date(25 / 7 / 2022),
  },
  { name: "tlv", delivery: "ben yehuda street", day: new Date(3 / 8 / 2022) },
];

export default function Search() {
  const [result, setResult] = useState(fakeData);
  const [search, setSearch] = useState("");
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");


  useEffect(() => {
    setResult(
      fakeData
        .filter((v) => v.name.toLowerCase().startsWith(search.toLowerCase()))
        .filter((v) => v.day >= sdate && v.day <= edate)
    );
  }, [search, sdate, edate]);

  return (
    <>
      <div>Where do you need delivery:</div>
      <input name="search" onInput={(e) => setSearch(e.target.value)} />
      <p>from when do you need your delivery:</p>
      <input
        name="startDate"
        type="date"
        onInput={(e) => setSdate(new Date(e.target.value))}
      />
      <p>until when do you need your delivery:</p>
      <input
        name="endDate"
        type="date"
        onInput={(e) => setEdate(new Date(e.target.value))}
      />
      <div className="compContainer">
        {/* {result.map((res) => (
          <div className="comp" key={res.name}>
            <div>{res.name}</div>
            <div>{res.delivery}</div>
            <div>{res.day}</div>
          </div>
        ))} */}
      </div>
    </>
  );
}
