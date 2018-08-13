import React from 'react';

class SearchForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleUserInput}>
        <input type="text" />
        <button type="Submit">Search</button>
      </form>
    )
  }
}



export default SearchForm;
