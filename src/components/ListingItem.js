import React from 'react';
import { Link } from 'react-router-dom';
import {GiBed, GiBathtub} from "react-icons/gi";

const ListingItem = ({listing, id, onDelete}) => {
  return (
    <div className='d-flex align-item-center justify-content-center'>
        <div className='card listing-link mb-2' style={{width: "800px"}}>
          <Link to={`/category/${listing.type}/${id}`}>
            <div className='row container p-2'>
                <div className='col-md-5'>
                    <img className='img-thumbnail' src={listing.imgUrls[0]} alt={listing.name} />
                </div>
                <div className='col-md-5'>
                  <h1>{listing.name}</h1>
                  <p>{listing.location}</p>
                  <p>
                    {listing.offer ? listing.discountedPrice : listing.regularPrice}Tk{listing.type === "rent" && "/month"}
                  </p>
                  <p>
                    <GiBed/>&nbsp;{listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : "1 Bedroom"}
                  </p>
                  <p>
                    <GiBathtub/>&nbsp;{listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : "1 Bathroom"}
                  </p>
                  {onDelete && (
              <button
                className="btn btn-danger"
                onClick={() => onDelete(listing.id, listing.name)}
              >
                Delete Listing
              </button>
            )}
                </div>
            </div>
          </Link>
        </div>
    </div>
  )
}

export default ListingItem