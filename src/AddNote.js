import React, { Component } from 'react';
import ApiContext from './ApiContext';
import config from './config';


class AddNote extends Component {
  constructor(props) {
    super(props);
      this.state = {
        name: {
          value: ''
        } ,
        content: {
          value: ''
        },
        folder: {
          value: '' 
        }
      }
  }
  handleAddNote = noteName => {
    const bodyContent = {
      name:noteName
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
      this.context.addNote(note)
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

  render() {
    return (
      <div>
       <form>
         <label htmlFor='noteName'>Name</label>
         <input type='text' id='noteName' onChange={e => this.updateName(e.target.value)}></input>

         <label htmlFor='noteContent'>Content</label>
         <textarea id='noteContent' onChange={e => this.updateContent(e.target.value)}></textarea>

         <label htmlFor='noteFolder'>Folder</label>
         <select id='noteFolder' onChange={e => this.updateSelect(e.target.value)}></select>

         <button type='submit'>Add Note</button>
       </form> 
      </div>
    );
  }
}
AddNote.contextType=ApiContext
export default AddNote;
