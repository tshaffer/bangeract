import React, {Component} from 'react';
import ThumbServices from '../../bangatronevices/thumbServicesOut';

export default class App extends Component {

    constructor() {
        super();

        this.thumbServices = new ThumbServices();
    }

    hitMe() {
        console.log("hit me");
        this.mediaLibraryThumbs = this.thumbServices.getThumbSpec();
    }

    render() {
        debugger;
        return (
            <div>
              <h1>Hello, World!</h1>
              <button type="button" onClick={this.hitMe.bind(this)}>hit me</button>
            </div>
        );
    }
}
