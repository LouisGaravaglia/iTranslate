import React  from 'react';
import './App.css';



function Album({image, name, releaseDate, albumType, id, handleAlbumClick}) {

  const handleClick = () => {
    handleAlbumClick(id);
  }



  return (
    <div className="Album">
       <img onClick={handleClick} src={image} alt=""/>
       {/* <p>Album Name: {name}</p>
      <p>Album Type: {albumType}</p>
       <p>Release Date: {releaseDate}</p>
              <p>Album ID: {id}</p>
       */}

      
    

    </div>
  );
}

export default Album;
