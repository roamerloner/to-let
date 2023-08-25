import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { useNavigate, Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import SwipeCore,{EffectCoverflow, Navigation, Pagination} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'

import 'swiper/css/bundle';

import {
  FaBed,
  FaBath,
  FaParking,
  FaHouseDamage,
  FaArrowCircleRight,
} from "react-icons/fa";

//config
SwipeCore.use([EffectCoverflow, Pagination]);

const Postings = () => {
  const [postings, setPostings] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); //eslint-disable-line
  const params = useParams();
  const auth = getAuth(); //eslint-disable-line

  useEffect(() => {
    
    const fetchPostings = async () => {
      const docRef = doc(db, "listings", params.postingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setPostings(docSnap.data());
        setLoading(false);
      }
    };
    fetchPostings();
  }, [params.postingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout title={postings.name}>
      <div className="row listing-container">
        <div className="col-md-8 listing-container-col1">
          {postings.imgUrls === undefined ? (
            <Spinner />
          ) : (
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              className="mySwipe"
            >
              {postings.imgUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <img src={postings.imgUrls[index]} alt={postings.name} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <div className="col-md-4 listing-container-col2">
          <h3>{postings.name}</h3>
          <h6>
            Price :{" "}
            {postings.offer ? postings.discountedPrice : postings.regularPrice} /
            RS
          </h6>
          <p>Property For : {postings.type === "rent" ? "Rent" : "Sale"}</p>
          <p>
            {postings.offer && (
              <span>
                {postings.regularPrice - postings.discountedPrice} Discount
              </span>
            )}
          </p>
          <p>
            <FaBed size={20} /> &nbsp;
            {postings.bedrooms > 1
              ? `${postings.bedrooms} Bedrooms`
              : "1 Bedroom"}
          </p>
          <p>
            <FaBath size={20} /> &nbsp;
            {postings.bathrooms > 1
              ? `${postings.bathrooms} bathrooms`
              : "1 Bathroom"}
          </p>
          <p>
            <FaParking size={20} /> &nbsp;
            {postings.parking ? `Parking spot` : "no spot for parking"}
          </p>
          <p>
            <FaHouseDamage size={20} /> &nbsp;
            {postings.furnished ? `furnished house` : "not furnished"}
          </p>
          <Link
            className="btn btn-success"
            to={`/contact/${postings.useRef}?listingName=${postings.name}`}
          >
            Contact Landlord <FaArrowCircleRight size={20} />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Postings;