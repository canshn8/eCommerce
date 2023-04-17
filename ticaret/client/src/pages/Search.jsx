import React, {useEffect, useState} from 'react'
import  {Link} from 'react-router-dom'
import Navbar from '../components/Navbar'
import "./search.css"

export default function Search() {
  const [data, setData] = useState([])
  const [searchApiData, setSearchApiData] = useState([])
  const [filterVal, setFilterVal] = useState('')

  useEffect(() => {
      const fetchData = () => {
        fetch('http://localhost:5000/api/products')
          .then(response => response.json())
          .then(json => {
            setData(json)
            setSearchApiData(json)
          })
      }
      fetchData()
  }, [])

  const handleFilter = (e) => {
    if(e.target.value === ''){
      setData(searchApiData)
    }else{
      const filterResult = searchApiData.filter(item=> item.title.toLowerCase().includes(e.target.value.toLowerCase() || item.desc.toLowerCase().includes(e.target.value.toLowerCase())))
      if(filterResult.length > 0){
        setData(filterResult)
      }else{
        setData([{"title":"Ürün Bulunamadı!"}])
      }
    }
    setFilterVal(e.target.value)
  }

  return (
    <div>
      <Navbar/>
      <div className='searchContainer'>
        <div className='searchFilter'>
          <input className='search' placeholder='Ürün Adı Girin' value={filterVal} onInput={(e) =>handleFilter(e)}/>
        </div>
      <table className='searchResult'>
        <th>Ürün Adı</th>
        <th>Ürün Açıklaması</th>
        <th>Ürün Fiyatı</th>
        {
          data.map(item=>{
            return(
              <tr className='value'>
                  <Link to={`/product/${item._id}`}>
                    <td className='searchTitle'>{item.title}</td>
                  </Link>
                  <td className='searchDesc'>{item.desc}</td>
                  <td className='searchPrice'>{item.price}</td>
              </tr>
            )
          })
        }
      </table>
      </div>
    </div>
  )
}
