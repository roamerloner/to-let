import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../components/Layout/Layout';
import {getAuth, updateProfile} from 'firebase/auth';
import {db} from "../firebase.config"
import {doc, updateDoc} from 'firebase/firestore'

const Profile = () => {
    const auth = getAuth();
    const navigate = useNavigate();

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
    
  return (
    <Layout>
        <div className="container mt-4 d-flex justify-content-between">
            <h4>Profile Details</h4>
            <button className="btn btn-danger" onClick={logoutHandler}>Logout</button>
        </div>
        <div className=" container mt-4 card" style={{width: '18rem'}}>
        <div calssName="card-header">
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
              {changeDetails ? <button type="button" class="btn btn-danger">Update profile</button> : <button type="button" class="btn btn-primary">Edit Profile</button> }
            </span>
          </div>
        </div>

    </Layout>
  );
};

export default Profile;