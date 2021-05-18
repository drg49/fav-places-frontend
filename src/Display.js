const Display = (props) => {

    const { places } = props

    const loaded = () => {
        return  <div style={{textAlign: "center"}}>
          {places.map((place) => {
            return (
              <article key={place._id}>
                <img src={place.img} alt={place.name}/>
                <h1>{place.name}</h1>
                <h3>{place.description}</h3>
                <button onClick={() => {
                  props.selectPlace(place)
                  props.history.push("/edit") //this just opens the /edit page (.history.push is literally a link, thats all it does, it opens a new)
                }}>Edit</button>
                <button onClick={() => {props.deletePlace(place)}}>Delete</button>
              </article>
            )
          })}
        </div>
      }
    
      const loading = () => {
        return <h1>Loading</h1>
      }
      
      return places.length > 0 ? loaded() : loading()
}

export default Display