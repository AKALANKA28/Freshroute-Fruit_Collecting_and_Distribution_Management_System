import React from 'react'


const TopSellingItem = ({item}) => {
  return (
    <div>
      <tr>
        <th className="row">
            <a href="#">
                <img src={item.preview} alt="" />
            </a>
        </th>
        <td>
            <a href="#" className="text-primary fw-bold">
                {item.name}
            </a>
        </td>
        <td>${item.price.toFixed(2)}</td>
        <td className='fw-bold'>{item.sold}</td>
        <td>${(item.price * item.sold).toLocaleString('eb-US')}</td>

      </tr>
    </div>
  )
}

export default TopSellingItem
