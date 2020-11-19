DROP DATABASE IF EXISTS itranslatedb;

CREATE DATABASE itranslatedb;

\c itranslatedb;

DROP TABLE IF EXISTS tracks;

CREATE TABLE tracks(
    id SERIAL PRIMARY KEY,
    spotify_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    explicit BOOLEAN,
    popularity INT,
    preview_url TEXT,
    spotify_uri TEXT NOT NULL,
    danceability FLOAT,
    tempo FLOAT,
    valence FLOAT,
    duration INT,
    lyrics TEXT,
    album_id INT NOT NULL REFERENCES albums ON DELETE CASCADE,
    artist_id INT NOT NULL REFERENCES artists ON DELETE CASCADE,
);

DROP TABLE IF EXISTS artists;

CREATE TABLE artists(
    id SERIAL PRIMARY KEY,
    spotify_id TEXT UNIQUE NOT NULL UNIQUE,
    name TEXT NOT NULL,
    genre TEXT,
    spotify_uri TEXT,
    img_url TEXT,
    popularity INT
);

DROP TABLE IF EXISTS albums;

CREATE TABLE albums(
    id SERIAL PRIMARY KEY,
    spotify_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    release_date TEXT,
    spotify_uri TEXT,
    img_url TEXT NOT NULL,
    artist_id INT NOT NULL REFERENCES artists ON DELETE CASCADE,
);



DROP TABLE IF EXISTS translation;

CREATE TABLE translation (
  id SERIAL PRIMARY KEY,
  track_id TEXT NOT NULL REFERENCES tracks ON DELETE CASCADE,
  language TEXT NOT NULL,
  translation TEXT NOT NULL
);

