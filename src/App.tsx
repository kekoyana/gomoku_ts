import { useState } from 'react';
import './index.css';
import Board from './Board';
import { checkWinner, isForbiddenMove  } from './utils'; // checkWinner関数をインポート

function App() {
    const [board, setBoard] = useState(Array(225).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<'black' | 'white'>('black');
    const [winner, setWinner] = useState<string | null>(null); // 勝者

    const handleClick = (index: number) => {
        if (board[index] !== null || winner !== null) {
            return;
        }

        if (currentPlayer === 'black' && isForbiddenMove(board, index, currentPlayer, 15)) {
            setWinner('白');
            return;
        }

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        const newWinner = checkWinner(newBoard, 15); // 勝者判定
        if (newWinner) {
            setWinner(newWinner);
            return;
        }

        setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
    };

    return (
        <div className="game">
            <div className="status">
                {winner ? (
                    <h2>{winner}の勝ち！</h2>
                ) : (
                    <h2>次の手番: {currentPlayer === 'black' ? '黒' : '白'}</h2>
                )}
            </div>
            <Board board={board} onClick={handleClick} />
        </div>
    );
}

export default App;
