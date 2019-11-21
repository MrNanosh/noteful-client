import React, { Component } from 'react';
import ApiContext from './ApiContext';

class AddNote extends Component {
  render() {
    return (
      <div>
       <form>
         <label></label>
         <input type='text'></input>
         <label></label>
         <textarea></textarea>
         <label></label>
         <select></select>
       </form> 
      </div>
    );
  }
}
AddNote.contextType=ApiContext
export default AddNote;
