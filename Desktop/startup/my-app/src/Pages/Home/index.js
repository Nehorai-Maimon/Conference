import "./style.css";

export default function Home() {
  return (
    <div className="allHome">
      <form>
        <input name="email" type="email" placeholder="Email"></input>
        <input name="password" type="password" placeholder="Password"></input>
        <br />
        <button onClick={bbb}>submit</button>
      </form>
    </div>
  );
}

function bbb() {
  alert("Welcome to");
}
