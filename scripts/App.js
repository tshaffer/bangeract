import React, {Component} from 'react';
import ThumbServices from '../../bangatronevices/thumbServicesOut';

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
        this.setState( { mediaLibraryThumbs : this.thumbServices.getThumbSpec() });
    }

    render() {
        return (
            <div>
                <button type="button" onClick={this.hitMe.bind(this)}>hit me</button>
                <Medialibrary thumbs = { this.state.mediaLibraryThumbs }/>
                <Playlist />
            </div>
        );
    }
}
