DROP DATABASE IF EXISTS iTranslateDB;

CREATE DATABASE iTranslateDB;

\c iTranslateDB;

DROP TABLE IF EXISTS tracks;

CREATE TABLE tracks(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    explicit TEXT,
    popularity TEXT,
    preview_url TEXT NOT NULL,
    spotify_id TEXT NOT NULL,
    spotify_uri TEXT NOT NULL,
    danceablity TEXT,
    tempo TEXT,
    valence TEXT,
    duration TEXT 
);

INSERT INTO tracks (name, type) VALUES ('', '');

DROP TABLE IF EXISTS artists;

CREATE TABLE artists(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    genre TEXT NOT NULL
);

INSERT INTO artists (name, type) VALUES ('', '');

DROP TABLE IF EXISTS albums;

CREATE TABLE albums(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    release_date TEXT NOT NULL,
    spotify_id TEXT NOT NULL,
    spotify_uri TEXT NOT NULL,
    img_url TEXT NOT NULL
);

INSERT INTO albums (name, type) VALUES ('', '');

DROP TABLE IF EXISTS discography;

CREATE TABLE discography (
  id SERIAL PRIMARY KEY,
  track_id INT NOT NULL REFERENCES tracks ON DELETE CASCADE,
  album_id INT NOT NULL REFERENCES albums ON DELETE CASCADE,
  artist_id INT NOT NULL REFERENCES artists ON DELETE CASCADE
);

INSERT INTO discography (name, type) VALUES ('', '');
