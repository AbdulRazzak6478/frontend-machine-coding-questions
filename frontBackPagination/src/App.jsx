import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
//   fetch('https://dummyjson.com/products?limit=100')
// .then(res => res.json())
// .then(console.log);
fetch('https://dummyjson.com/products?limit=10&skip=0')
.then(res => res.json())
.then(console.log);          

useEffect(() => {

  async function fetchProducts(){
    // const data = await axios('https://dummyjson.com/products?limit=100');
    // setProducts(data.data.products);
    // console.log('fetched products : ',data);
    const data = await axios.get(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
    setProducts(data.data.products);
    setTotal(data.data.total);
    console.log('fetched products : ',data.data.total);
  }
  fetchProducts();
}, [page])

  const selectPageHandler = (selectedPage)=>{
    
    // if(selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage !== page)
    // {
    //   setPage(selectedPage);
    // }
    if(selectedPage >= 1 && selectedPage <= total / 10 && selectedPage !== page)
    {
      setPage(selectedPage);
    }
  }
  
  return (
    <>
     <div className="products-container">
      {
        products.length == 0 && <h1>no products have fetched</h1>
      }
      {
        products.length > 0 && products.map((product,index)=>{
          return <div className="product" key={index}>
            <img src={product.thumbnail} alt={product.title} />
            <div className="title">{product.title}</div>
            <div className="brand">{product.brand}</div>
            <div className="rate-price-wrapper">
              <span>Price : ${product.price}</span>
              <span>Rating : {product.rating}</span>
            </div>
            <button className='add-to-cart'>Add To Cart</button>
          </div>
        })
      }
     </div>
     {
      products.length > 0 &&
     <div className="pagination-container">
      <div className="pagination">
        <button className={`prev ${page ==1 ? 'prev-disabled': ''}`} onClick={()=>selectPageHandler(page-1)}>prev</button>
        {
          [...Array(total / 10)].map((_,i)=>{
            return <div className={`${page-1==i ? 'current':''} page`} onClick={()=>selectPageHandler(i+1)}>{i+1}</div>
          })
        }
        <button className={`next ${page < total / 10 ? '': 'next-disabled'}`} onClick={()=>selectPageHandler(page+1)}>next</button>
      </div>
     </div>
     }
    </>
  )
}

export default App
