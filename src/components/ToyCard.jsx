import React from "react";

function ToyCard({ name, image, description, likes, onUpdateLikes, onDeleteToy, id }) {

  const handleLike = () => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        likes: likes + 1 })
    })
    .then(r => {
      if (!r.ok) {
        throw new Error("failed to update toy likes");
      }
      return r.json();
    })
    .then((updatedToy) => {onUpdateLikes(updatedToy);
  })
    .catch(error => console.error(error.message));
  };

    const handleDelete = () => {
      fetch(`http://localhost:3001/toys/${id}`, {
        method: "DELETE"
      })
      .then(r => {
        if (!r.ok) {
          throw new Error("failed to delete toy");
        }
        onDeleteToy(id);
      })
      .catch(error => console.error(error.message));
      // Optionally, you can remove the toy from the parent component's state here
    }
    return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={description}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button onClick={handleLike} className="like-btn">Like {"<3"}</button>
      <button onClick={handleDelete} className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
