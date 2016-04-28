import React, {Component} from 'react';
// import ThumbServices from '../../bangatronevices/thumbServicesOut';
import ThumbServices from './aThumbServices';

import Medialibrary from './components/medialibrary';
import Playlist from './components/playlist';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mediaLibraryThumbs: [],
        };

        this.thumbServices = new ThumbServices();
    }

    hitMe() {

        console.log("hit me");

        var self = this;

        // web app version
        let thumbServicesPromise = this.thumbServices.getThumbSpec();
        thumbServicesPromise.then(function(mediaLibraryThumbs) {
            self.setState( { mediaLibraryThumbs : mediaLibraryThumbs });
        })

        // electron version
        // this.setState( { mediaLibraryThumbs : this.thumbServices.getThumbSpec() });
    }

    render() {
        return (
            <div className = "container baContainer">
                <button type="button" onClick={this.hitMe.bind(this)}>hit me</button>
                <Medialibrary thumbs = { this.state.mediaLibraryThumbs }/>
                <Playlist />
            </div>
        );
    }
}
