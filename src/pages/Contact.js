import React,{useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import {doc, getDoc} from 'firebase/firestore'
import { db } from '../firebase.config'
import {useParams, useSearchParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import "../styles/contact.css";

const Contact = () => {
    const [message, setMessage] = useState('')
    const [landlord, setLandlord] = useState('')
    const [searchParams, setsearchParams] = useSearchParams()
    const params = useParams()

    useEffect(() => {
        const getlandlord = async () => {
            const docRef = doc(db,'users',params.landlordId)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                setLandlord(docSnap.data())

            }else{
                toast.error('Unable to fetch data')
            }
        }
        getlandlord()
    },[params.landlordId])

  return (
    <Layout>
        <div className="container  mt-4">
            <h3>Contact Details</h3>
            <div>
            {landlord !== " " && (
                    <main>
                        <h3>Name: {landlord?.name}</h3>
                        <form>
                            <div className="form-floating">
                                <textarea className="form-control" placeholder="Leave a comment here" value={message} id="message"
                                onChange={(e) => {setMessage(e.target.value)}}/>
                                <label htmlFor="floatingTextarea2">send your message here</label>
                            </div>
                            
                            <a href={`mailto:${landlord.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
                                <button className='btn btn-primary mt-2'>
                                    Send Message
                                </button>
                            </a>
                            
                        </form>

                    </main>
                )
            }
            </div>
        </div>
    </Layout>
  )
}

export default Contact