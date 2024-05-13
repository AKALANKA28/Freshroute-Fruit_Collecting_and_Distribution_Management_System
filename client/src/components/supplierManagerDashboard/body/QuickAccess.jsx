
const QuickAccess = () => {

    
 
  return (
    <div className='card'>
      <div className="card-body">
        <h5 className="card-title">
          Quick Access
        </h5>

        <a href='/SupplierRequests'>
          <button style={{width: "100%"}} className='btn btn-primary'>
            <i class="fas fa-user-plus"></i> Manage Supplier Requests
          </button>
        </a>

<hr/>
        <a href='/SupplyRequests'>
          <button style={{width:"100%"}} className='btn btn-primary'>
          <i class="fas fa-shopping-basket"></i> Manage Supply Requests </button>
        </a>

       
      </div>
    </div>
  )
}

export default QuickAccess
