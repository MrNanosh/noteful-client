import React, { Component } from 'react';
import config from './config';
import ApiContext from './ApiContext';

class AddFolder extends Component {
  handleAddFolder = folderName =>{
    const bodyContent = {
      name:folderName
    }
    const options = {
      method:'POST',
      headers: {
        'content-type': 'application/json'
      },
      body:JSON.stringify(bodyContent)
    }
  fetch(config.API_ENDPOINT+'/folders',options)
    .then(rsp=> {
      if (!rsp.ok) throw new Error('Whoops')
      else return rsp.json()
    } )
    .then(folder=> {
      this.context.AddFolder(folder)
    })
    .catch(e => {
      console.log(e)
    })
}
  render() {
    return (
      <div className='addFolder'>
       <form
      onSubmit={this.handleAddFolder(folderName.value)} //do things here
       >
         <label
         htmlFor='folderName'
         >
           Name
         </label>
         <input
          type='text'
          id='folderName'

         >
         </input>
         <input type='submit'value='add Folder'></input>
       </form> 
      </div>
    );
  }
}
AddFolder.contextType=ApiContext
export default AddFolder;