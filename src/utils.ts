export const checkWinner = (board: (string | null)[], size: number): string | null => {
    const checkLine = (line: (string | null)[]): string | null => {
        if (line.length < 5) return null;
        for (let i = 0; i <= line.length - 5; i++) {
            if (line[i] && line[i] === line[i + 1] && line[i] === line[i + 2] && line[i] === line[i + 3] && line[i] === line[i + 4]) {
                return line[i];
            }
        }
        return null;
    };

    // 横方向のチェック
    for (let i = 0; i < size; i++) {
        const row = board.slice(i * size, (i + 1) * size);
        const winner = checkLine(row);
        if (winner) return winner;
    }

    // 縦方向のチェック
    for (let j = 0; j < size; j++) {
        const col = board.filter((_, i) => i % size === j);
        const winner = checkLine(col);
        if (winner) return winner;
    }

    // 斜め方向のチェック (右上から左下)
    for (let i = 0; i <= size - 5; i++) {
        for (let j = 0; j <= size - 5; j++) {
            const diag: (string | null)[] = [];
            for (let k = 0; k < 5; k++) {
                diag.push(board[i * size + j + k * (size + 1)]);
            }
            const winner = checkLine(diag);
            if (winner) return winner;
        }
    }

    // 斜め方向のチェック (左上から右下)
    for (let i = 0; i <= size - 5; i++) {
        for (let j = 4; j < size; j++) {
            const diag: (string | null)[] = [];
            for (let k = 0; k < 5; k++) {
                diag.push(board[i * size + j + k * (size - 1)]);
            }
            const winner = checkLine(diag);
            if (winner) return winner;
        }
    }

    return null;
};

// 線をチェックして、指定した石がいくつ連続しているかを返す関数
const countStonesInLine = (line: (string | null)[], color: string): number[] => {
    const counts: number[] = [];
    let currentCount = 0;
    for (const stone of line) {
        if (stone === color) {
            currentCount++;
        } else {
            if (currentCount > 0) {
                counts.push(currentCount);
                currentCount = 0;
            }
        }
    }
    if (currentCount > 0) {
        counts.push(currentCount);
    }
    return counts;
};

export const isForbiddenMove = (board: (string | null)[], index: number, color: string, size: number): boolean => {
    if (color !== 'black') return false; // 黒以外は禁じ手なし

    const tempBoard = [...board];
    tempBoard[index] = color;

    const row = tempBoard.slice(Math.floor(index / size) * size, (Math.floor(index / size) + 1) * size);
    const col = tempBoard.filter((_, i) => i % size === index % size);

    const checkDiagonal = (i:number,j:number,size:number,offset:number)=>{
        const diag: (string | null)[] = [];
        for (let k = 0; k < size; k++) {
            const index2 = i * size + j + k * offset
            if(index2 < 0 || index2 >= board.length) break
            diag.push(tempBoard[index2]);
        }
        return diag
    }

    const diag1 = checkDiagonal(Math.floor(index / size), index % size, size, size + 1)
    const diag2 = checkDiagonal(Math.floor(index / size), index % size, size, size - 1)

    const rowCounts = countStonesInLine(row, color);
    const colCounts = countStonesInLine(col, color);
    const diag1Counts = countStonesInLine(diag1, color);
    const diag2Counts = countStonesInLine(diag2, color);

    const countOccurrences = (counts: number[], target: number): number => {
        return counts.filter(count => count === target).length;
    };

    const threeCount = countOccurrences(rowCounts, 3) + countOccurrences(colCounts, 3) + countOccurrences(diag1Counts, 3) + countOccurrences(diag2Counts, 3);
    const fourCount = countOccurrences(rowCounts, 4) + countOccurrences(colCounts, 4) + countOccurrences(diag1Counts, 4) + countOccurrences(diag2Counts, 4);
    const fiveCount = checkWinner(tempBoard,size) === color

    if (threeCount >= 2 || fourCount >= 2 || fiveCount) {
        return true;
    }

    return false;
};