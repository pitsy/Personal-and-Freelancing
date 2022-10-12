import { useState } from 'react';
import './App.css';
import SingleTile from './components/SingleTile';

function App() {

  const [tiles, setTiles] = useState([
    {id: 0, mark: 'e'},
    {id: 1, mark: 'e'},
    {id: 2, mark: 'e'},
    {id: 3, mark: 'e'},
    {id: 4, mark: 'e'},
    {id: 5, mark: 'e'},
    {id: 6, mark: 'e'},
    {id: 7, mark: 'e'},
    {id: 8, mark: 'e'}
  ]);

  const [playerTurn, setPlayerTurn] = useState(true);
  const [playerMark, setPlayerMark] = useState('x');
  const [turn, setTurn] = useState(1);
  const [message, setMessage] = useState('X starts');

  // handle a choice (player clicked on a square)
  function tileClick(tile) {
    !playerTurn ? setPlayerMark('x') : setPlayerMark('o');
    const index = tiles.findIndex(element => element.id === tile.id);
    tiles[index].mark = playerMark;
    setPlayerTurn(!playerTurn);
    const temp = turn + 1;
    setTurn(temp);
    checkWinner();
  }

  function reset() {
    for (let i=0; i<tiles.length; i++) {
      tiles[i].mark = 'e';
    }
    setTiles(tiles.slice());
    setMessage('');
    setTurn(0);
    setPlayerMark('x');
    setPlayerTurn(true);
  }

  function checkWinner() {
    if (turn >= 3) {
      if (tiles[0].mark === tiles[1].mark && tiles[1].mark === tiles[2].mark && tiles[2].mark !== 'e') {
        setMessage(tiles[0].mark + ' wins!');
      } else if (tiles[3].mark === tiles[4].mark && tiles[4].mark === tiles[5].mark && tiles[5].mark !== 'e') {
        setMessage(tiles[3].mark + ' wins!');
      } else if (tiles[6].mark === tiles[7].mark && tiles[7].mark === tiles[8].mark && tiles[8].mark !== 'e') {
        setMessage(tiles[6].mark + ' wins!');
      } else if (tiles[0].mark === tiles[3].mark && tiles[3].mark === tiles[6].mark && tiles[6].mark !== 'e') {
        setMessage(tiles[0].mark + ' wins!');
      } else if (tiles[1].mark === tiles[4].mark && tiles[4].mark === tiles[7].mark && tiles[7].mark !== 'e') {
        setMessage(tiles[1].mark + ' wins!');
      } else if (tiles[2].mark === tiles[5].mark && tiles[5].mark === tiles[8].mark && tiles[8].mark !== 'e') {
        setMessage(tiles[2].mark + ' wins!');
      } else if (tiles[0].mark === tiles[4].mark && tiles[4].mark === tiles[8].mark && tiles[8].mark !== 'e') {
        setMessage(tiles[0].mark + ' wins!');
      } else if (tiles[2].mark === tiles[4].mark && tiles[4].mark === tiles[6].mark && tiles[6].mark !== 'e') {
        setMessage(tiles[2].mark + ' wins!');
      } else if (turn === 9) {
        setMessage('It is a tie!')
      } else {
        return;
      }
    }        
  }

  return (
    <div className='game-board'>
      <h1>Tik-Tak-Toe</h1>
      <h3>{message}</h3>
      <button onClick={reset}>Reset</button>

      <div className='game-grid'>
        {tiles.map(tile => 
          <SingleTile 
            key={tile.id} 
            tile={tile}
            tileClick={tileClick}
          />
        )}
      </div>
    </div>
  );
}

export default App;
