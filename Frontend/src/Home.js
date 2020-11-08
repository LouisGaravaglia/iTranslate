import React, {useState} from 'react';
import SpotifyAPI from "./SpotifyAPI";
import LyricsAPI from "./LyricsAPI";

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
    const [artist, album, track, image] = await SpotifyAPI.requestSearch(formData.artist, formData.track);
    console.log("WOOT WOOT!: ", artist, album, track, image);
    const lyrics = await LyricsAPI.requestLyrics(artist, track)
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