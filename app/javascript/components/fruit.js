import React from 'react';

class Fruit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editable: false
    }
    this.handleEdit = this.handleEdit.bind(this)
  }
  
  handleEdit(){
    if(this.state.editable){
      let name = this.name.value
      let description = this.description.value 
      let id = this.props.fruit.id
      let created_at = this.props.fruit.created_at
      let fruit = {id: id, name: name, description: description, created_at: created_at}
      this.props.handleUpdate(fruit)
    }
    this.setState({
      editable: !this.state.editable
    })
  }
  render(){
    let name = this.state.editable ? <input className='input-h3' type='text' ref={input => this.name = input} 
      defaultValue={this.props.fruit.name}/> : <h3>{this.props.fruit.name}</h3>
    let description = this.state.editable ? <input className='input-p' type='text' ref={input => this.description = input} 
      defaultValue={this.props.fruit.description}/> : <p>{this.props.fruit.description}</p>
    
    return(
      <div className="input-wrapper">
        {name}
        {description}
        <button id='submit_edit' onClick={() => this.handleEdit()}>{this.state.editable ? 'Submit' : 'Edit'}</button>
        <button id='delete' onClick={() => this.props.handleDelete(this.props.fruit.id)}>Delete</button>
      </div>
    )
  }
  
}

export default Fruit
