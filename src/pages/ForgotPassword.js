import React, {useState} from 'react';
import Layout from '../components/Layout/Layout';
import {Link, useNavigate} from 'react-router-dom';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';
import {toast} from 'react-toastify';

const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset Successfull!");
      navigate('/signin');
    }catch(error){
      toast.error('Something went wrong!');
    }
  }

  return (
    <Layout>
      <div className="container">
        <h1>Reset Password</h1>
        <div className="d-flex align-items-center justify-content-center w-100 mt-4">
          <form onSubmit={onSubmitHandler}>
            <div className="container mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">Reset</button>
              <Link to="/signup">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>

    </Layout>
  )
}

export default ForgotPassword;
