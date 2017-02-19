import React from 'react';
import AutoCompletion from './autocompletion/AutoCompletion';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Autocompletion component</h1>
        <AutoCompletion autocompleteList={["11", "22", "33"]} />
      </div>
    )
  }
}
