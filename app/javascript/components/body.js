import React from 'react';
import AllFruits from './all_fruits';
import NewFruit from './new_fruit';

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruits: []
      
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewFruit = this.addNewFruit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.removeFruit = this.removeFruit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.updateFruit = this.updateFruit.bind(this)
    this.sortFruit = this. sortFruit.bind(this)
  }
  
  handleFormSubmit(name, description){
    let body = JSON.stringify({fruit: {name: name, description: description }})
    
    fetch('http://localhost:3000/api/v1/fruits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    }).then((response) => {return response.json()}).then((fruit)=>{
      this.addNewFruit(fruit)
    })
  }
  
  addNewFruit(fruit){
    this.setState({
      fruits: this.state.fruits.concat(fruit)
    })
  }
  
  handleDelete(id){
    fetch(`http://localhost:3000/api/v1/fruits/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      this.removeFruit(id)
    })
  }
  
  removeFruit(id){
    let newFruits = this.state.fruits.filter((fruit) => fruit.id != id)
    this.setState({
      fruits: newFruits
    })
  }
  
  handleUpdate(fruit){
    fetch(`http://localhost:3000/api/v1/fruits/${fruit.id}`,
    {
      method: 'PUT',
      body: JSON.stringify({fruit: fruit}),
      headers:  {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      this.updateFruit(fruit)
    })
  }
  
  updateFruit(fruit){
    let newFruits = this.state.fruits.filter((f) => f.id != fruit.id)
    newFruits.push(fruit)
    newFruits.sort(this.orderFruit)
    this.setState({
      fruits: newFruits
    })
  }
  
  orderFruit(a, b){
    if(a.created_at > b.created_at){
      return 1
    }
    else if (a.created_at < b.created_at) {
      return -1
    }
  }
  
  sortFruit(){
    
  }
  
  componentDidMount(){
    fetch('/api/v1/fruits.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ fruits: data }) });
  }
  
  render(){
    return(
      <div>
        <ul>TODO: 
          <li>Create Sort button to order fruit</li>
          <li>Add blue button with '+' to show the new fruit section</li>
        </ul>
        <button onClick={this.sortFruit()}>{this.state.sort}</button>
        <NewFruit handleFormSubmit={this.handleFormSubmit}/>
        <AllFruits fruits={this.state.fruits} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate} />
      </div>
    )
  }
}

export default Body
