import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProdactList() {
  const [list, setList] = useState([])
  const {catName} = useParams()

  useEffect(()=>{
    fetch(`https://fakestoreapi.com/products/category/${catName}`)
      .then(res => res.json())
      .then(json => setList(json))
  },[] )

  return (
    <div><h1>ProdactList</h1>
      {list?.map(v=>{
        <div>{v.id}</div> && console.log(v)
      })}
    </div>
  )
}
