import React, {useState, useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import ListingItem from '../components/ListingItem';
import "../styles/offers.css";

export const Offers = () => {
  
  const [listing, setListing] = useState(null);
   const [loading, setLoading] = useState(true);
  const [lastFetchListing, setLastFetchListing] = useState(null);

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
            const lastVisible = querySnap.docs[querySnap.docs.length - 1];
            setLastFetchListing(lastVisible);
            const listings = [];
            querySnap.docs.forEach((doc) => {
              return listings.push({
                id:doc.id,
                data:doc.data()
              })
            });
            setListing(listings);
            setLoading(false);
          } catch (error) {
            console.log(error);
            toast.error("Unble to fetch data");
          }
        };
        //function call
        fetchListing();
      }, []);



      //loadmore pagination func
      const fetchLoadMoreListing = async () => {
    try {
      //refrence
      const listingsRef = collection(db, "listings");
      //query
      const q = query(
        listingsRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchListing),
        limit(10)
      );
      //execute query
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListing((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Unble to fetch data");
    }
  };
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

        <div className="d-flex align-items-center justify-content-center mb-4 mt-4">
        {lastFetchListing && (
          <button
            className="btn btn-primary text-center"
            onClick={fetchLoadMoreListing}
          >
            load more
          </button>
        )}
      </div>
    </Layout>
  )
}

export default Offers