import React, { useState, useEffect } from 'react';
import CardFilter from './CardFilter';
import NewsPostItem from './NewsPostItem';
import newsData from './newsData.json';

const News = () => {
    const [news, setNews] = useState([]);
    const [filter, setFilter] = useState('Today');

    const handleFilterChange = filter => {
        setFilter(filter);
    };

    useEffect(() => {
        setNews(newsData);
    }, []);

    return (
        <div>
            <div className='card'>
                <CardFilter filterChange={handleFilterChange} />

                <div className="card-body pb-0">
                    <h5 className="card-title">
                        News &amp; Updates <span>| {filter}</span>
                    </h5>

                    <div className='news'>
                        {news &&
                            news.map(item => <NewsPostItem key={item.id} item={item} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;
