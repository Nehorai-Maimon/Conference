import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./categoryList.css"

export default function CategoryList() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => { setCategories(json) })
  }, [])

  

  return (<div>
    <h1 id="head-category">Categories</h1>
    <div className="categories">
      {categories?.map((v) => <div
        className="category"
        key={v}>
        <Link to={'products/category/prodactList/'+{v}} >{v}</Link>
      </div>)}
    </div>
  </div>)
}
