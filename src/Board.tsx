import React from 'react';

interface BoardProps {
    board: (string | null)[];
    onClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onClick }) => {
    const cells = board.map((value, index) => (
        <div
            key={index}
            className="cell"
            onClick={() => onClick(index)}
        >
            {value === 'black' && <div className="stone-black"></div>}
            {value === 'white' && <div className="stone-white"></div>}
        </div>
    ));

    return <div id="game-board">{cells}</div>;
};

export default Board;