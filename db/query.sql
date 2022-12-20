SELECT movies.movie_name AS movie, reviews.review
FROM reviewsLEFT JOIN movies
on reviews.movie_id = movies.id
ORDER BY movies.movie_name;