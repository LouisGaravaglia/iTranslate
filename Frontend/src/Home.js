import React, {useState} from 'react';
import SpotifyAPI from "./SpotifyAPI";

const Home = () => {
  const INITIAL_VALUE = {artist:"", track:""}
  const [formData, setFormData] = useState(INITIAL_VALUE)



  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(data => ({
      ...data,
      [name]:value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit: ", formData.artist, formData.track);
    const res = await SpotifyAPI.requestSearch(formData.artist, formData.track);
    console.log("WOOT WOOT!: ", res);
    setFormData(INITIAL_VALUE)
  }

  return (
    <div className="Home">

      <form onSubmit={handleSubmit}>
      <label forHtml="artist">Artist</label>
        <input
          type="text"
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
        />
      <label forHtml="artist">Track</label>
        <input
          type="text"
          id="track"
          name="track"
          value={formData.track}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Home;