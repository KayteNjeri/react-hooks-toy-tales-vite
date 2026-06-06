import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  
    const [formData, setFormData] = useState({
      name: "",
      image: "",
      description: "",
      likes: 0
    });
  
    const handleSubmit = (event) => {
      event.preventDefault();

        fetch("http://localhost:3001/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      .then(r => {
        if (!r.ok) {
          throw new Error("failed to create new toy");
        }
        return r.json();
      })
      .then(createdToy => {
        onAddToy(createdToy);

        setFormData({
          name: "",
          image: "",
          description: "",
          likes: 0
        });
      }
      )
      .catch(error => console.error(error.message));
        // Optionally, you can update the toys list in the parent component here
    }
    const handleChange = (event) => {
      setFormData(previousData => ({
        ...previousData,
        [event.target.name]: event.target.value
      }));
    };
  
    return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="description"
          placeholder="Enter a toy's description..."
          className="input-text"
          value={formData.description}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
