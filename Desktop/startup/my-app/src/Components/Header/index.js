import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router";

export default function Header() {
  const [logged, setLogged] = useState(false);

  const navigate = useNavigate();
  function bbb() {
    navigate("/Search");
    setLogged(true);
  }

  return<>
   {(logged) ? <div>welcome</div> :<form>
          <input name="email" type="email" placeholder="Email"/>
          <input name="password" type="password" placeholder="Password"/>
          <button onClick={bbb}>login</button>
        </form> 
    } 
    </>
};

