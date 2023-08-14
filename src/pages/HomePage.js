import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'

const HomePage = () => {

  const navigate = useNavigate();

  const rentImg = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  const sellImg = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"

  return (
    <Layout>
        <div className='container mt-3'>
          <div className='row'>
            <h1>Category</h1>
            <div className='col-md-5'>
              <div className="img-container">
                <img src={rentImg} alt="Rent" style={{width: '100%'}} />
                <button className="btn" onClick={() => navigate('/category/rent')}>To Rent</button>
              </div>
            </div>
            <div className='col-md-5'>
              <div className="img-container">
                <img src={sellImg} alt="Sale" style={{width: '100%'}} />
                <button className="btn" onClick={() => navigate('/category/sale')}>To Sale</button>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default HomePage