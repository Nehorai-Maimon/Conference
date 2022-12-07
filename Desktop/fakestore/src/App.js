import Cart from "./Components/Cart/Cart";
import Header from "./Components/Header/Header";
import Main from "./layout/Main";
import "./App.css"

function App() {
  return (
    <div className="app">
      <div className="pre-header"><Header/></div>
      <div className="container-mn-ca">
      <div className="pre-cart"><Cart/></div>
      <div className="pre-main"><Main/></div>
      </div>
    </div>
  );
}

export default App;

// git remote add origin https://github.com/Nehorai-Maimon/Fake-Store.git
// git branch -M main
// git push -u origin main
