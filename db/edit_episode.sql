UPDATE episodes
SET date_posted = $1,
  title = $2,
  description = $3,
  story = $4,
  audio_url = $5,
  video_url = $6
WHERE id = $7
RETURNING *;