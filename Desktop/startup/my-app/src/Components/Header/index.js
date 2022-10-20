import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router";

export default function Header() {
  const [logged, setLogged] = useState();

  const navigate = useNavigate();
  function bbb() {
    setLogged(true);
    navigate("/Search");
  }

  return<div className="header">
    <div className="textHeder">smart delivery </div>
   {(logged) ? <div> welcome userName</div> :<form>
          <input name="email" type="email" placeholder="Email"/>
          <input name="password" type="password" placeholder="Password" autoComplete="current"/>
          <button onClick={bbb}>login</button>
        </form> 
    } 
    </div>
};

