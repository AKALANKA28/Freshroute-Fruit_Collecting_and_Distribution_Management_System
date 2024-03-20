import React, {useState, useEffect} from 'react'
import Card from  './Card'

const Cards = () => {
    const [cards, setCards] = useState([])

    const fetchData = () => {
       fetch("http://localhost:8070/cards/")
         .then(res => res.json())
         .then(data => {
            setCards(data);

         })
         .catch(e => console.log(e.message))
    };

    useEffect(() => {
        fetchData();
    }, [])


  return (

   
     <div className='col-12'>   
        <div className="row">
        {
                cards && cards.length > 0 && 
                cards.map(card => <Card key={card._id} card={card} />)
          }    
        </div>       
    </div>
  )
}

export default Cards
