import React, {useState, useEffect} from 'react'
import Card from  './Card'

const Cards = () => {

    const [cards, setCards] = useState([])

    const fetchData = () => {
        fetch("")
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
    <div>
      {cards && cards.length > 0 && 
        cards.map(card => <Card key={card._id} card={card} />)}
    </div>
  )
}

export default Cards
