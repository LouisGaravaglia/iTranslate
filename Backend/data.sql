DROP DATABASE IF EXISTS itranslatedb;

CREATE DATABASE itranslatedb;

\c itranslatedb;

DROP TABLE IF EXISTS tracks;

CREATE TABLE tracks(
    spotify_id TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    explicit BOOLEAN,
    popularity INT,
    preview_url TEXT,
    spotify_uri TEXT NOT NULL,
    danceability FLOAT,
    tempo FLOAT,
    valence FLOAT,
    duration INT 
);

DROP TABLE IF EXISTS artists;

CREATE TABLE artists(
    spotify_id TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    genre TEXT NOT NULL,
    spotify_uri TEXT NOT NULL,
    img_url TEXT,
    popularity INT
);

DROP TABLE IF EXISTS albums;

CREATE TABLE albums(
    spotify_id TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    release_date TEXT,
    spotify_uri TEXT NOT NULL,
    img_url TEXT NOT NULL
);

DROP TABLE IF EXISTS discography;

CREATE TABLE discography (
  id SERIAL PRIMARY KEY,
  track_id TEXT NOT NULL REFERENCES tracks ON DELETE CASCADE,
  album_id TEXT NOT NULL REFERENCES albums ON DELETE CASCADE,
  artist_id TEXT NOT NULL REFERENCES artists ON DELETE CASCADE
);

