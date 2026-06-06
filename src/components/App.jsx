import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then(r => {
        if (!r.ok) {
          throw new Error("failed to get toys list");
        }
        return r.json();
      })
      .then((setToys))
      .catch((error) => console.error(error.message));
  }, []);

  const [showForm, setShowForm] = useState(false);

  const addNewToy = (newToy) => {
    setToys((prev) => [...prev, newToy]);
  };

  const updateToyLikes = (updatedToy) => {
    setToys(previousToys => previousToys.map(toy => toy.id === updatedToy.id ? updatedToy : toy));
  };

  const deleteToy = (id) => {
    setToys(previousToys => previousToys.filter(toy => toy.id !== id));
  };

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm 
      onAddToy={addNewToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onUpdateLikes={updateToyLikes} onDeleteToy={deleteToy} />
    </>
  );
}

export default App;
