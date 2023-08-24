import React, {useState, useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import {getDoc, doc} from 'firebase/firestore';
import { db } from '../firebase.config';
import {getAuth} from 'firebase/auth'
import {useNavigate, Link, useParams} from 'react-router-dom'
import { Spinner } from "react";



const Postings = () => {
    const [postings, setPostings] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchPosting = async () => {
            const docRef = doc(db, 'listings', params.postingId)
            const docSnap =  await getDoc(docRef)
            if(docSnap.exists()){
                console.log(docSnap.data())
                setPostings(docSnap.data())
                setLoading(false)
            }
        }
        fetchPosting()
    },[params.postingId])
    
  if(loading){
    return <Spinner />
  }  
  return (
    <Layout>
        <div className='container d-flex align-items-center justify-content-center mt-4'>
          <div className="card" style={{width: 600}}>
            <div className="card-body">
                <h3>{postings.name}</h3>
                <h6>Price : TK {" "}{postings.offer ? postings.discountedPrice : postings.regularPrice}</h6>
                <p>Property for : {postings.type === "rent" ? "Rent" : "Sale"}</p>
                <p>{postings.offer && (
                    <span>{postings.regularPrice - postings.discountedPrice} Discount</span>
                )}</p>
                <p>{postings.bedrooms > 1 ? `${postings.bedrooms} Bedrooms` : '1 Bedroom'}</p>
                <Link className="btn btn-success" to={`/contact/${postings.useRef} ? postingsName=${postings.name}`}>
                    Contact Landlord
                </Link>
          </div>
        </div>

        </div>
    </Layout>
  )
}

export default Postings