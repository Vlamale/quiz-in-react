import React from 'react'
import { TestComponent } from './components/TestComponent';
import { Buttons } from './components/Buttons'
import { AppState } from './context/app/AppState'

function App() {

  return (
    <AppState>
      <div className="App">
        <Buttons />
        <TestComponent />
      </div>
    </AppState>
  );
}

export default App;
