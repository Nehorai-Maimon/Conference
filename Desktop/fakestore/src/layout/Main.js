import { Route, Routes } from "react-router-dom";
import CategoryList from "../Pages/CategoryList/CategoryList";
import ProdactList from "../Pages/ProdactList";

export default function Main() {
  return (<div>
    <Routes>
      <Route path="/" element={<CategoryList/>}/>
      <Route path="products/category/prodactList/:catName" element={<ProdactList/>} />
      <Route path="" element/>
    </Routes>
    
    </div>
  )
}
