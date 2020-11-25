process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");

const trackOne = {
    spotify_id: "test_track_id_1",
    name: "test_track_name_1",
    spotify_uri: "test_spotify_uri_1",
    album_id: "test_album_id_1",
    artist_id: "test_artist_id_1",
    preview_url: "test_preview_url_1"
};

const trackTwo = {
    spotify_id: "test_track_id_2",
    name: "test_track_name_2",
    spotify_uri: "test_spotify_uri_2",
    album_id: "test_album_id_2",
    artist_id: "test_artist_id_2",
    preview_url: "test_preview_url_2"
};

const trackThree = {
    spotify_id: "test_track_id_3",
    name: "test_track_name_3",
    spotify_uri: "test_spotify_uri_3",
    album_id: "test_album_id_3",
    artist_id: "test_artist_id_1",
    preview_url: "test_preview_url_3"
};


const artistOne = {
  spotify_id: "test_artist_id_1",
  name: "test_artist_name_1",
  genre: "test_genre_1",
  spotify_uri: "test_spotify_uri_1",
  img_url: "test_img_url_1",
  popularity: 45
};

const artistTwo = {
  spotify_id: "test_artist_id_2",
  name: "test_artist_name_2",
  genre: "test_genre_2",
  spotify_uri: "test_spotify_uri_2",
  img_url: "test_img_url_2",
  popularity: 89
};

const albumOne = {
  spotify_id: "test_album_id_1",
  name: "test_album_name_1",
  release_date: "test_release_date_1",
  spotify_uri: "test_spotify_uri_1",
  img_url: "test_img_url_1",
  artist_id: "test_artist_id_1"
};

const albumTwo = {
  spotify_id: "test_album_id_2",
  name: "test_album_name_2",
  release_date: "test_release_date_2",
  spotify_uri: "test_spotify_uri_2",
  img_url: "test_img_url_2",
  artist_id: "test_artist_id_2"
};

const albumThree = {
  spotify_id: "test_album_id_3",
  name: "test_album_name_3",
  release_date: "test_release_date_3",
  spotify_uri: "test_spotify_uri_3",
  img_url: "test_img_url_3",
  artist_id: "test_artist_id_1"
};

beforeEach(async function() {
  await request(app).post("/artist").send(artistOne);
  await request(app).post("/album").send(albumOne);
  await request(app).post("/track").send(trackOne);
  await request(app).post("/artist").send(artistTwo);
  await request(app).post("/album").send(albumTwo);
  await request(app).post("/track").send(trackTwo);
  await request(app).patch("/track").send({lyrics: "No Lyrics", track_id: "test_track_id_2"});
  await request(app).patch("/track").send({lyrics: "test_lyrics_1", track_id: "test_track_id_1"});
});

afterEach(async function() {
  await request(app).delete("/artist").send({spotify_id: "test_artist_id_1"});
  await request(app).delete("/album").send({spotify_id: "test_album_id_1"});
  await request(app).delete("/track").send({spotify_id: "test_track_id_1"});
  await request(app).delete("/artist").send({spotify_id: "test_artist_id_2"});
  await request(app).delete("/album").send({spotify_id: "test_album_id_2"});
  await request(app).delete("/track").send({spotify_id: "test_track_id_2"});
});


describe('GET /album', () => {

  it('gets back albums array of artist with matching id, and that contains songs in DB that have lyrics.', async () => {
    const res = await request(app).get("/album").query({artistId: "test_artist_id_1"});
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual([{albumId:"test_album_id_1", albumImg:"test_img_url_1", albumName:"test_album_name_1", release_date:"test_release_date_1"}]);
  });
});

describe('POST /album', () => {

  it('successfully adds an album to the database.', async () => {
    const res = await request(app).post("/album").send(albumThree);
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual("test_album_id_3");
    await request(app).delete("/album").send({spotify_id: "test_album_id_3"});
  });
});

describe('DELETE /album', () => {

  it('successfully deletes an album from the database.', async () => {
    const res = await request(app).post("/album").send(albumThree);
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual("test_album_id_3");
    const deleteRes = await request(app).delete("/album").send({spotify_id: "test_album_id_3"});
    expect(deleteRes.statusCode).toBe(201);
    expect(deleteRes.body.response).toEqual([{spotify_id: "test_album_id_3"}]);
  });
});