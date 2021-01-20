import './App.css';

const App = () => {
  return (
    <div className="app-wrapper">
      <header className="header">
        <img src='https://www.pinclipart.com/picdir/big/526-5262236_transparent-falling-png-phoenix-egg-png-clipart.png'/>
      </header>
      <nav className="nav">
        <div>
         <a> Profile</a>
        </div>
        <div>
          <a> Messages</a>
        </div>
        <div>
          <a> News</a>
        </div>
        <div>
          <a> Music </a>
        </div>
        <div>
          <a> Settings</a>
        </div>
      </nav>
      <div className="content">
        Main content
      </div>
    </div>
  );
}

export default App;
