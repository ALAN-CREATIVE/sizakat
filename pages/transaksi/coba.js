import React from "react"
import CatInputs from "./CatInputs.js"
class Form extends React.Component {
  state = {
    cats: [{name:"", age:""}],
    owner: "",
    description: ""
  }

addCat = (e) => {
    this.setState((prevState) => ({
      cats: [...prevState.cats, {name:"", age:""}],
    }));
  }
handleSubmit = (e) => { e.preventDefault() }
render() {
    let {owner, description, cats} = this.state
    return (
      <form onSubmit={this.handleSubmit} >
        <label htmlFor="name">Owner</label> 
        <input type="text" name="owner" id="owner" value={owner} />
        <label htmlFor="description">Description</label> 
        <input type="text" name="description" id="description" value={description} />
        <button onClick={this.addCat}>Add new cat</button>
        <CatInputs cats={cats} />
        <input type="submit" value="Submit" /> 
      </form>
    )
  }
}
export default Form