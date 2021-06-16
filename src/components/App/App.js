
import './App.css';

function App() {
  return (
    <div className="flex content-center justify-center App bg-primary ">
      <div className="flex-auto w-3/5 justify-self-center max-w-3/5 App-container bg-secondary">
        <header className="App-header">
          <div className="header-title text-bold text-primary">SUDOKU</div>
        </header>
        <div className="Game-container">
          <div className="Board-container"></div>
          <div className="Side-controls-container"></div>
          <div className="Number-Btns"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
