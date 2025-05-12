import './App.css'
import Board from "./components/Board";
import useMinesweeperGame from './hooks/useMineSweeperGame';
import Header from "./components/Header"

function App() {
  const { gameBoard, handleCellLeftClick, handleCellRightClick, timeDiff } = useMinesweeperGame();

  return (
    <div className="game">
      <Header timeDiff={timeDiff}/>
      <Board gameBoard={gameBoard} handleCellLeftClick={handleCellLeftClick} handleCellRightClick={handleCellRightClick}/>
      
    </div>
  )
}

export default App
