import React from 'react'

const BookReviews = props => {
  const {reviews} = props
  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <div>No reviews...</div>
      ) : (
        reviews.map(review => (
          <div key={review.id}>
            <p>User: {review.user.email}</p>
            <p>Review: {review.content}</p>
            <p>Stars: {review.rating}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default BookReviews
