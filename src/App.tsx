import { createStore } from '@reduxjs/toolkit';
import ColorPicker from 'components/ColorPicker';
import React, { Component } from 'react';

interface Store {
  color: string;
}

const STORE: Store = {
  color: '#000000',
};
class App extends Component {
  render() {
    return (
      <div id="App">
        <div className="test">
          <ColorPicker size={500} />
        </div>
      </div>
    );
  }
}

export default App;
export { STORE as store };
