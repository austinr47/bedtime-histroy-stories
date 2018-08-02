CREATE TABLE episodes (
  id SERIAL PRIMARY KEY,
  date_posted TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  story TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  video_url TEXT NOT NULL,
);

CREATE TABLE featured (
  id SERIAL PRIMARY KEY,
  episode_id INTEGER REFERENCES episodes(id),
);