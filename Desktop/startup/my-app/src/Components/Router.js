import {Routes, Route} from "react-router-dom"
import Home from "../Pages/Home"
import Search from "../Pages/Search"

export default function Router(){
    return(
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/search" element={<Search/>}/>
        </Routes>
    )
}