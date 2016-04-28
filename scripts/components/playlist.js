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
            playlistThumbs: []
        };
    }

    componentDidMount() {
        console.log("playlist::componentDidMount invoked");

        var playlistThumb = {};
        playlistThumb.id = "0";

        // electron url
        // playlistThumb.thumbUrl = "public/IMG_1624_thumb.JPG";

        // webapp url
        // playlistThumb.thumbUrl = "http://localhost:3000/photos/testPhotos/Tahoe/photo.jpg";
        playlistThumb.thumbUrl = "http://localhost:3000/photos/testPhotos/New Orleans/IMG_1624_thumb.JPG";
        playlistThumb.stateName = "Drop item here";
        this.setState({playlistThumbs: [playlistThumb]});
    }

    playlistDragOverHandler (ev) {
        console.log("playlistDragOverHandler");
        ev.preventDefault();
        // Set the dropEffect to move
        ev.dataTransfer.dropEffect = "move";
    }

    playlistDropHandler (ev) {

        let playlistThumbs = this.state.playlistThumbs;

        console.log("drop");

        ev.preventDefault();

        // get playlist item to add to playlist
        var path = ev.dataTransfer.getData("path");
        var stateName = ev.dataTransfer.getData("name");

        // specify playlist item to drop
        var playlistThumb = {};
        playlistThumb.thumbUrl = "public/" + path;
        playlistThumb.stateName = stateName;

        // figure out where to drop it
        //      get id of playlist item that was drop target
        //      get offset that indicates how far over user dropped thumb
        //      if offset > half of thumb width, add thumb after target; otherwise insert thumb before target
        var id = ev.target.id;
        var index = Number(id);
        var offset = ev.offsetX;
        var insert = false;
        if (offset < 50) {
            insert = true;
        }

        if (insert) {
            // insert prior to index
            playlistThumbs.split(index, 0, playlistThumb);
        }
        else {
            // add after index
            playlistThumbs.splice(index + 1, 0, playlistThumb);
        }

        // renumber thumb id's
        playlistThumbs.forEach(function (thumb, thumbIndex) {
            thumb.id = thumbIndex.toString();
        });

        this.setState({playlistThumbs: playlistThumbs})
    }


    render () {

        let self = this;

        let playlistThumbs = this.state.playlistThumbs.map(function (thumb) {
            return (
                <li className="flex-item mediaLibraryThumbDiv" key={thumb.id} onDrop={self.playlistDropHandler.bind(self)} onDragOver={self.playlistDragOverHandler}>
                    <img id={thumb.id} src={thumb.thumbUrl} className="mediaLibraryThumbImg"/>
                    <p className="mediaLibraryThumbLbl">{thumb.stateName}</p>
                </li>
            );
        });

        return (
            <div className="playlistDiv">
                Zone 1: Video or Images: Playlist
                <ul className="playlist-flex-container wrap">
                    {playlistThumbs}
                </ul>
            </div>
        );
    }


}

export default Playlist;