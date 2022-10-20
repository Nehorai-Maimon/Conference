import './App.css';
import Header from './Components/Header';
import Upload from './Components/Upload';
import User from './Components/User';

function App() {
  return (<>
    <Header/>
    <div className='upload-user'>
    <Upload/>
    <User/>
    </div>
  </>
  );
}

export default App;
