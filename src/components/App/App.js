
import './App.css';

function App() {
  return (
    <div className="flex content-center justify-center App bg-primary ">
      <div className="flex-auto w-2/3 justify-self-center max-w-2/3 App-container bg-secondary">
        <header className="App-header">
          <div className="text-8xl tracking-header header-title text-bold text-primary">SUDOKU</div>
        </header>
        <div className="h-screen Game-container ">
          <div className="Board-container"></div>
          <div className="Side-controls-container"></div>
          <div className="Number-Btns"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
