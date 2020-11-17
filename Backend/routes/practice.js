      const trackData = {spotify_id: trackId};
      const artistData = {spotify_id: artistId};
      const albumData = {spotify_id: albu};

      albumData["name"] = res.data.name;
      albumData["release_date"] = res.data.release_date;
      albumData["spotify_uri"] = res.data.uri;
      albumData["img_url"] = res.data.images[1]

      trackData["name"] = res.data.name;
      trackData["spotify_uri"] = res.data.uri;
      trackData["explicit"] = res.data.explicit;
      trackData["popularity"] = res.data.popularity;
      trackData["preview_url"] = res.data.preview_url;
      trackData["danceability"] = songAnalysis.data.danceability;
      trackData["tempo"] = songAnalysis.data.tempo;
      trackData["valence"] = songAnalysis.data.valence;
      trackData["duration"] = songAnalysis.data.duration_ms;

      artistData["name"] = res.data.name;
      artistData["spotify_uri"] = res.data.uri;
      artistData["genre"] = artistDetails.data.genres;
      artistData["img_url"] = artistDetails.data.images[1].url;
      artistData["popularity"] = artistDetails.data.popularity;

      const partialAlbumData = { spotify_id: base.id, name: base.name, release_date: base.release_date, spotify_uri: base.uri, img_url: base.images[1].url};

 

  



        return [trackData, artistData];