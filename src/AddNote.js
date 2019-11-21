import React, { Component } from 'react';
import ApiContext from './ApiContext';
import config from './config';


class AddNote extends Component {
  constructor(props) {
    super(props);
      this.state = {
        name: {
          value: '',
          touched: false
        } ,
        content: {
          value: '',
          touched: false
        },
        folder: {
          value: '',
          touched: false
        }
      }
  }
  validateName = () => {
    const name  = this.state.name.value.trim()
    if(name.length===0)return 'Name cannot be empty'
  }
  validateContent = () => {
    const content = this.state.content.value.trim()
    if(content.length===0)return 'Did you forget something?'
  }
  
  handleAddNote = () => {
    const bodyContent = {
      name: this.state.name.value,
      folderId: this.state.folder.value,
      content: this.state.content.value
    }
  const options = {
    method:'POST',
    headers: {
      'content-type': 'application/json'
    },
    body:JSON.stringify(bodyContent)
  }
  fetch(config.API_ENDPOINT+'/notes',options)
    .then(rsp=> {
      if (!rsp.ok) throw new Error('Whoops')
      else return rsp.json()
    } )
    .then(note=> {
      this.context.addNote(note);
      this.props.history.push(`/`);
    })
    .catch(e => {
      console.log(e)
    })
  } 

  updateName(name) {
    this.setState({
      name: {
          value: name,
          touched: true
      }
  });
}

  updateContent(content){
    this.setState({
      content: {
          value: content,
          touched: true
      }
  });
}
  updateSelect(folder){
    this.setState({
      folder: {
          value: folder,
          touched: true
      }
  });

}

selectOptions = () => {
  const folderOptions = this.context.folders.map(folder => {
    return (
      <option value={folder.id} key={folder.id}>{folder.name}</option>
    )
  })
  return folderOptions
}

  render() {
    const nameError = this.validateName()
    const contentError = this.validateContent()
    return (
      <div>
       <form
       onSubmit= {(e) =>{
        e.preventDefault();
        this.handleAddNote()} }>
      <div className='name-group'>          
         <label htmlFor='noteName'>Name</label>
         <input type='text' id='noteName' onChange={e => this.updateName(e.target.value)}></input>
         <p>{this.state.name.touched && nameError}</p>
      </div>

<div className='content-group'>        
   <label htmlFor='noteContent'>Content</label>
         <textarea id='noteContent' onChange={e => this.updateContent(e.target.value)}></textarea>
         <p>{this.state.content.touched && contentError}</p>
</div>

<div className='folder-group'>         
  <label htmlFor='noteFolder'>Folder</label>
        <select id='noteFolder' onChange={e => this.updateSelect(e.target.value)}>{this.selectOptions()}</select>
</div>
         <button 
          type='submit'
          disabled= {nameError||contentError}
         >Add Note</button>
       </form> 
      </div>
    );
  }
}
AddNote.contextType=ApiContext
export default AddNote;
