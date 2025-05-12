import { useEffect, useState } from "react";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [isFilled , setIsFilled] = useState(false);

  const checkIsFilled = () => {
    for (let index = 0; index < board.length; index++) {
      if(board[index] === null){
        return false ;
      }
    }
    return true ;
  }

  useEffect(() => {
    setIsFilled(checkIsFilled())
  } , [board])


  const winner = checkWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-200">
      <h1 className="text-2xl font-bold mb-4 text-purple-600">Tic Tac Toe</h1>

      <div className="grid grid-cols-3 gap-2 text-purple-800 ">
        {board.map((value, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 bg-white flex items-center justify-center text-2xl border-2 border-purple-500 hover:bg-purple-400 cursor-pointer transition rounded-md"
          >
            {value}
          </div>
        ))}
      </div>

      <p className="mt-4 text-lg font-medium text-purple-900">
        {winner ? `Winner: ${winner}` : board.includes(null) ? `Turn: ${isXTurn ? "X" : "O"}` : "It's a Draw!"}
      </p>
      {
        (winner || isFilled) &&
      (<button
        onClick={restartGame}
        className="mt-3 px-4 py-2 bg-purple-600 text-white rounded"
      >
        Restart
      </button>)
      }
    </div>
  );
};

const checkWinner = (board) => {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export default App;
