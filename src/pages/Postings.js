import React, {useState, useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import {getDoc, doc} from 'firebase/firestore';
import { db } from '../firebase.config';
import {getAuth} from 'firebase/auth'
import {useNavigate, Link, useParams} from 'react-router-dom'

const Postings = () => {
    const [postings, setPostings] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchPosting = async () => {
            const docRef = doc(db, 'postings', params.postingId)
            const docSnap =  await getDoc(docRef)
            if(docSnap.exists()){
                console.log(docSnap.data())
                setPosting(docSnap.data())
                setLoading(false)
            }
        }
        fetchPosting
    },[params.postingId])
  return (
    <Layout>
        <div className='container d-flex align-items-center justify-content-center mt-4'>
            <div className="card" style={{width: '600px'}}>
                
                <div className="card-body">
                    
                </div>
            </div>
          
        </div>
    </Layout>
  )
}

export default Postings