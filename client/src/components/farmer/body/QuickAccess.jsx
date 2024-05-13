
const QuickAccess = () => {

    
 
  return (
    <div className='card'>
      <div className="card-body">
        <h5 className="card-title">
          Quick Access
        </h5>

        <a href='/PredictionDetails'>
          <button style={{width: "100%"}} className='btn btn-primary'>
          <i className="bi bi-file-text"></i> See Previous Predictions
          </button>
        </a>

       
      </div>
    </div>
  )
}

export default QuickAccess
