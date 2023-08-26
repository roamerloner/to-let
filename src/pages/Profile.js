import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../components/Layout/Layout';
import {getAuth, updateProfile} from 'firebase/auth';
import {db} from "../firebase.config";
import {doc, updateDoc, collection, getDocs, query, where, orderBy, deleteDoc} from 'firebase/firestore';
import {FaArrowAltCircleRight} from 'react-icons/fa';
import ListingItem from '../components/ListingItem';
import "../styles/profile.css";


const Profile = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);


    useEffect(() => {
    const fetchUserListings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("useRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      console.log(querySnap);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      console.log(listings);
      setListings(listings);
      setLoading(false);
    };
    fetchUserListings();
  }, [auth.currentUser.uid]);

    const [changeDetails, setChangeDetails] = useState(false);

    const [formData, setFormData] = useState({
      name:auth.currentUser.displayName,
      email:auth.currentUser.email
    })

    const {name, email} = formData;

    const logoutHandler = () => {
      auth.signOut();
      toast.success("Logout Successfull!");
      navigate("/");
    }

    //on update details submit handler
    const onSubmit = async() => {
      try{
        if(auth.currentUser.displayName !== name){
          await updateProfile(auth.currentUser, {
            displayName:name
          })
          const userRef = doc(db, 'users', auth.currentUser.uid);
          await updateDoc(userRef, {name});
          toast.success("Update Successfull!");
        }
      }catch(error){
        console.log(error);
        toast("something went wrong");
      }
    }

    //edit enable/disable through icon
    const onChange = (e) => {
      setFormData(prevState => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
    
    // delete handler
    const onDelete = async (listingId) => {
    if (window.confirm("Are You Sure  want to delete ?")) {
      // await deleteDoc(doc, (db, "listings", listingId));
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success("Listing Deleted Successfully");
    }
  };

  //edit handler
  const onEdit = (listingId) => {
    navigate(`/editlisting/${listingId}`);
  };
  
  return (
    <Layout>
        <div className="container mt-4 d-flex justify-content-between">
            <h4>Profile Details</h4>
            <button className="btn btn-danger" onClick={logoutHandler}>Logout</button>
        </div>
        <div className=" container mt-4 card" style={{width: '18rem'}}>
        <div className="card-header">
          <div className="container mt-4 d-flex justify-content-between">
            <h5>User Personal Details</h5>
          </div>
        </div> 
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={name} onChange={onChange} disabled={!changeDetails}/>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={onChange} disabled={!changeDetails}/>
              </div>
            </form>
            <span style={{cursor:'pointer'}} onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails(prevState => !prevState)}}> 
              {changeDetails ? <button type="button" className="btn btn-danger">Update profile</button> : <button type="button" class="btn btn-primary">Edit Profile</button> }
            </span>
          </div>
        </div>
        <div className='container mt-4 d-flex justify-content-between'>
          <Link to="/create-post"><FaArrowAltCircleRight/>&nbsp;Create Rent/Sale Post</Link>
        </div>
         <div className="container-fluid mt-4 your-listings">
        {listings && listings?.length > 0 && (
          <>
            <h3 className="mt-4">Your Listings</h3>
            <div>
              {listings.map((listing) => (
                <ListingItem
                  className="profile-listing"
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Profile;