SELECT * FROM featured
LEFT JOIN episodes on featured.episode_id = episodes.id;