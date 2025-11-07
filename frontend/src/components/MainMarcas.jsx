import { Link } from 'react-router-dom';

const MainMarcas = () => {
  return (
    <div>
      <div className='card-container'>
        <div className='card'> 
          <h5>Marca 1</h5>
          <Link to="/marcas/toyota" className="btn">Toyota</Link>
        </div>
        <div className='card'> 
          <h5>Marca 2</h5>
          <Link to="/marcas/gr" className="btn">Gazoo Racing</Link>
        </div>
        <div className='card'> 
          <h5>Marca 3</h5>
          <Link to="/marcas/lexus" className="btn">Lexus</Link>
        </div>
      </div>
    </div>
  )
}

export default MainMarcas