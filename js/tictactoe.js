window.addEventListener('DOMContentLoaded', () => {
    const PLAYERX_WON = 'PLAYERX_WON', PLAYERO_WON = 'PLAYERO_WON', TIE = 'TIE';
    const squares = Array.from(document.querySelectorAll('.tile'));
    const showplayer = document.querySelector('.display-player');
    const resetbtn = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let panel = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const winningplay = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkresult() {
        let iswon = false;
        for (let i = 0; i <= 7; i++) {
            const checkcon = winningplay[i];
            const x = panel[checkcon[0]];
            const y = panel[checkcon[1]];
            const z = panel[checkcon[2]];
            if (x === '' || y === '' || z === '') {
                continue;
            }
            if (x === y && y === z) {
                iswon = true;
                break;
            }
        }

    if (iswon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!panel.includes(''))
        announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> is the Winner';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> is the Winner';
                break;
            case TIE:
                announcer.innerText = 'Draw Match';
        }
        announcer.classList.remove('hide');
    };

    const action = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updatepanel =  (index) => {
        panel[index] = currentPlayer;
    }

    
    const userAction = (tile, index) => {
        if(action(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updatepanel(index);
            checkresult();
            alternateturn();
        }
    }
    const alternateturn = () => {
        showplayer.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        showplayer.innerText = currentPlayer;
        showplayer.classList.add(`player${currentPlayer}`);
    }

    
    const resetpanel = () => {
        panel = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            alternateturn();
        }

        squares.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    squares.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetbtn.addEventListener('click', resetpanel);
});