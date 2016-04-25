import React, {Component} from 'react';
import TestModule from '../../bangatronevices/testModuleOut';

export default class App extends Component {
  render() {
    let testModule = new TestModule();
    testModule.invokeTest();

    return (
      // Add your component markup and other subcomponent references here.
      <h1>Hello, World!</h1>
    );
  }
}
