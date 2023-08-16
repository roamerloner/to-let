import React, {useState, useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import ListingItem from '../components/ListingItem';

export const Offers = () => {
  
  const [listing, setListing] = useState(null);

  //fetch listing
  useEffect(() => {
      const fetchListing = async () => {
          try {
            //refrence
            const listingsRef = collection(db, "listings");
            //query
            const q = query(
              listingsRef, 
              where("offer", "==", true), 
              orderBy("timestamp", "desc"), 
              limit(10)
              );
            //execute query
            const querySnap = await getDocs(q);
            const listings = [];
            querySnap.docs.forEach((doc) => {
              return listings.push({
                id:doc.id,
                data:doc.data()
              })
            });
            setListing(listings);
          } catch (error) {
            console.log(error);
            toast.error("Unble to fetch data");
          }
        };
        //function call
        fetchListing();
      }, []);
  return (
    <Layout>
        <div className='mt-3 container-fluid'>
          <h1>Offers</h1>
        </div>
        {
          listing && listing.length > 0 ? (
          <>
            <div>
              {listing.map(list => (
                <ListingItem listing={list.data} id={list.id} key={list.id}/>
              ))}
            </div>
          </>
          ) : (<p>No offers available at the moment!</p>)
        }
    </Layout>
  )
}

export default Offers