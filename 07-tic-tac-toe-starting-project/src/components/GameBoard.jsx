export default function GameBoard({ onSelectSquare, board }) {
  // commented this out to lift turns state to App component for log component
// export default function GameBoard({ onSelectSquare,  activePlayerSymbol }) {
//   const [gameBoard, setGameBoard] = useState(initialGameBoard);

//   function handleSelectSquare(rowIndex, colIndex) {
//     setGameBoard((prevGameBoard) => {
//       const updatedBoard = [...prevGameBoard.map(row => [...row])];
//       updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
//       return updatedBoard;
//     })
//     onSelectSquare();
//   }

  return (
    <ol id="game-board">
      {/* {gameBoard.map((row, rowIndex) => <li key={rowIndex}> */}
      {board.map((row, rowIndex) => <li key={rowIndex}>
        <ol>
          {row.map((playerSymbol, colIndex) => 
          (<li key={colIndex}>
            {/* <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button></li>))} */}
            <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button></li>))}
        </ol>
      </li>)}
    </ol>
  )
}
