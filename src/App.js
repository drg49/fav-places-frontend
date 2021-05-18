import React, {useEffect, useState} from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {

  const url = "https://fav-places-dg.herokuapp.com"

  const [places, setPlaces] = useState([])

  const getPlaces = () => {
    fetch(url + "/places/")
    .then((response) => response.json())
    .then((data) => {
      setPlaces(data)
    })
  }

  useEffect(() => {getPlaces()}, [])

  const handleCreate = (newPlace) => {
    fetch(url + "/places/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlace)
    })
    .then(() => getPlaces())
  }

    //handleUpdate - function for when the edit form is submitted
    const handleUpdate = (place) => {
      fetch(url + "/places/" + place._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(place)
      })
      .then(() => getPlaces())
    }
  
    //deleteDog to delete individual placess
    const deletePlace = (place) => {
      fetch(url + "/places/" + place._id, {
        method: "delete"
      })
      .then(() => {
        getPlaces()
      })
    }

    // Empty Place - For the Create Form
    const emptyPlace = {
      name: "",
      img: "",
      description: ""
    }

  const [selectedPlace, setSelectedPlace] = useState(emptyPlace)
  
    //function to specify which dog we are updating
  const selectPlace = (place) => {
    setSelectedPlace(place)
  }

  return (
    <div className="App">
      <h1>My Favorite Places</h1>
      <hr />
      <Link to="/create">
        <button>Add Location</button>
      </Link>
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => 
              <Display {...rp} places={places} selectPlace={selectPlace} deletePlace={deletePlace} />} />
          <Route exact path="/create" render={(rp) => (
              <Form {...rp} label="create" place={emptyPlace} handleSubmit={handleCreate} />
          )}/>
          <Route exact path="/edit" render={(rp) => (
              <Form {...rp} label="update" place={selectedPlace} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
