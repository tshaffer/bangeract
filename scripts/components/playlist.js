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

        // <div class="playlistDiv" >
        //     Zone 1: Video or Images: Playlist
        //     <ul class="flex-container wrap">
        //         <li ng-repeat="thumb in playlistThumbs" class="flex-item mediaLibraryThumbDiv" ondrop="playlistDropHandler(event);" ondragover="playlistDragOverHandler(event);">
        //             <img id="{{thumb.id}}" ng-src="{{thumb.thumbUrl}}" class="mediaLibraryThumbImg" draggable="true" ondragstart="playlistDragStartHandler(event);">
        //                 <p class="mediaLibraryThumbLbl">{{thumb.stateName}}</p>
        //         </li>
        //     </ul>
        // </div>

        let self = this;

        return (
            <div className="playlistDiv">
                Zone 1: Video or Images: Playlist
            </div>
        );
    }


}

export default Playlist;