import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import {  toast } from 'react-toastify';
import {BsFillEyeFill} from 'react-icons/bs'
import {getAuth, createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {db} from '../firebase.config'
import {doc, setDoc, serverTimestamp} from 'firebase/firestore'
import OAuth from '../components/OAuth';
import "../styles/signup.css";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
     email: '',
     name: '',
     password: ''
  });

  const {name, email, password} = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData(prevState =>({
      ...prevState,
      [e.target.id]: e.target.value,

    }))
  }; 

  const onSubmitHndler = async(e) => {
    e.preventDefault()
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      updateProfile(auth.currentUser, {displayName:name});
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      toast.success("SignUp Successful");
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!");
    }
  }
  return (
    <Layout>
        <div className='d-flex align-items-center justify-content-center w-100 mt-4'>
            <form className='bg-light p-4' onSubmit={onSubmitHndler}>
              <h4 className='bg-dark p-2 mt-2 text-light text-center'>Sign Up</h4>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Enter Name</label>
                  <input type="text" value={name} className="form-control" id="name" onChange={onChange} aria-describedby="nameHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" value={email} onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={onChange} className="form-control" id="password" />
                  <span>Show Password <BsFillEyeFill className='text-danger' style={{ cursor:"pointer" }} 
                  onClick={() => {setShowPassword((prevState) => !prevState);}}/></span>
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
                <div>
                  <OAuth/>
                  <span>Already User?</span> <Link to="/signin">Login</Link>
                </div>
            </form>

        </div>
    </Layout>
  );
};

export default SignUp