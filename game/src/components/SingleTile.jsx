import '../css/SingleTile.css';
import x from '../icons/x.png';
import o from '../icons/o.png';
import square from '../icons/square.png';

export default function SingleTile({ tile, tileClick }) {

    function handleClick() {
        tileClick(tile);
    }

    return (
        <div className='tile' >
            <img 
                className={tile.mark === 'e' ? 'active' : 'inactive'} 
                src={square} onClick={handleClick}  
                alt="empty" 
            />
            <img className={tile.mark === 'x' ? 'active' : 'inactive'} src={x} alt="x" />
            <img className={tile.mark === 'o' ? 'active' : 'inactive'} src={o} alt="o" />
        </div>
    )
}