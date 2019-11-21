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
  render() {
    return (
      <div>
       <form>
         <label>Name</label>
         <input type='text'></input>
         <label>Content</label>
         <textarea></textarea>
         <label>Folder</label>
         <select></select>
         <button type='submit'>Add Note</button>
       </form> 
      </div>
    );
  }
}
AddNote.contextType=ApiContext
export default AddNote;
