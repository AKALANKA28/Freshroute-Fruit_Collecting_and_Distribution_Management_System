import React from 'react'

const NavMessage = () => {
  return (
    <div>
       <li className='nav-item dropdown'>
        <a className='nav-link nav-icon' href='#' data-bs-toggle='dropdown'>
            <i className='bi bi-chat-left-text'>
            </i>
            <span className='badge bg-success badge-number'>3</span>
        </a>

        <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow messages'>
            <li className='dropdown-header'>
                You have 3 new messages
                <a href='#'>
                    <span className='badge rounded-pill bg-primary p-2 ms-2'>
                        View all
                    </span>
                </a>
            </li>
            <li>
                <hr className='dropdown-divider'/>
            </li>

            <li className='message-item'>
                <a href='#'>
                  <img src='#' className='rounded-circle'/>
               
                <div>
                  <h4>Maria Hudson</h4>
                  <p> hjk sjd cncbbhch equyhusahjk ahkjsahaghjasg...</p>
                  <p>4hrs.ago</p>
                </div>
                </a>
            </li>

            <li>
                <hr className='dropdown-divider'/>
            </li>

            <li className='message-item'>
                <a href='#'>
                  <img src='#' className='rounded-circle'/>
               
                <div>
                  <h4>Maria Hudson</h4>
                  <p> hjk sjd cncbbhch equyhusahjk ahkjsahaghjasg...</p>
                  <p>4hrs.ago</p>
                </div>
                </a>
            </li>

            <li>
                <hr className='dropdown-divider'/>
            </li>

            <li className='message-item'>
                <a href='#'>
                  <img src='#' className='rounded-circle'/>
               
                <div>
                  <h4>Maria Hudson</h4>
                  <p> hjk sjd cncbbhch equyhusahjk ahkjsahaghjasg...</p>
                  <p>4hrs.ago</p>
                </div>
                </a>
            </li>


            

            <li>
                 <hr className='dropdown-divider'/>
            </li>
            <li className='dropdown-footer'>
                <a href='#'>Show all messages</a>
            </li>

        </ul>
      </li>
    </div>
  )
}

export default NavMessage
