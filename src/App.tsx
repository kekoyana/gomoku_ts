import React, { useState } from 'react';
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
            alert('禁じ手です！');
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
            <h1>五目並べ</h1>
            <Board board={board} onClick={handleClick} />
            {winner && <h2>{winner}の勝ち！</h2>} {/* 勝者を表示 */}
        </div>
    );
}

export default App;