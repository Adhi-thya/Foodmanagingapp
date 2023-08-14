import React from 'react'
import "./styles.css"
const FavouriteItem = (props) => {

    const {id,image,title,removeFromFavourites}=props;

    

    return (
        <div key={id} className='favourite-item'>
            <div>
                <img src={image} alt="image of recipe" />
            </div>
            <p>{title}</p>
            <button type='button' onClick={removeFromFavourites}>Remove from favourites</button>
        
        </div>
    )
}

export default FavouriteItem
