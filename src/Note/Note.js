import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApiContext from '../ApiContext';
import config from '../config';
import './Note.css';
import propTypes from 'prop-types';

export default class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {}
  };
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(
      `${config.API_ENDPOINT}/api/note/${noteId}`,
      {
        method: 'DELETE',
        headers: {
          'content-type':
            'application/json'
        }
      }
    )
      .then(res => {
        if (!res.ok)
          return res
            .json()
            .then(e =>
              Promise.reject(e)
            );
        return res;
      })
      .then(() => {
        this.context.deleteNote(noteId);
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    const {
      note_name,
      id,
      modified
    } = this.props;
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${id}`}>
            {note_name}
          </Link>
        </h2>
        <button
          className="Note__delete"
          type="button"
          onClick={
            this.handleClickDelete
          }
        >
          <FontAwesomeIcon icon="trash-alt" />{' '}
          remove
        </button>
        <div className="Note__dates">
          <div className="Note__dates-modified">
            Modified{' '}
            <span className="Date">
              {format(
                modified,
                'Do MMM YYYY'
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  id: propTypes.string,
  name: propTypes.string,
  modified: propTypes.string,
  onDeleteNote: propTypes.func
};
