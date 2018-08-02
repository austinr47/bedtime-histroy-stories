INSERT INTO episodes
( title, date_posted, description, story, audio_url, video_url ) 
VALUES 
( $2, $1, $3, $4, $5, $6 )
RETURNING *;