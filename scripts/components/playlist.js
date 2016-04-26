/**
 * Created by tedshaffer on 4/25/16.
 */
/**
 * Created by tedshaffer on 4/25/16.
 */
import React, { Component } from 'react';

class Playlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        console.log("playlist::componentDidMount invoked");
    }

    render () {

        let self = this;

        return (
            <div className="playlistDiv">
                Playlist
            </div>
        );
    }


}

export default Playlist;