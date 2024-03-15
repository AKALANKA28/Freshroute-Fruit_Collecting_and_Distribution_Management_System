import React, { useEffect, useState} from 'react'
import CardFilter from './CardFilter';
import NewsPostItem from './NewsPostItem';

const News = () => {

    const [news, setNews] = useState([])
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter => {
        setFilter(filter)
    };


    const fetchData = () => {
        fetch("")
         .then(res => res.json())
         .then(data => {
            setNews(data);
         })
         .catch(e => console.log(e.message))
    };

    useEffect(() => {
        fetchData();
    }, [])


  return (
    <div>
      <div className='card'>
      <CardFilter filterChange={handleFilterChange} />

      <div className="card-body pb-0">
        <h5 className="card-title">
          News &amp; Updates <span>| {filter}</span>
        </h5>

        <div className='news'>
            {
                news &&
                news.length > 0 &&
                news.map(item => <NewsPostItem key={item._id} item={item}/>)
            }
        </div>
        
      </div>
    </div>
    </div>
  )
}

export default News
