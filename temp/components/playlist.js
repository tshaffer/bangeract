"use strict";
const React = require('react');
class BAThumb {
}
class PlaylistThumb {
}
class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistThumbs: []
        };
    }
    componentDidMount() {
        console.log("playlist::componentDidMount invoked");
        let playlistThumb = new PlaylistThumb();
        playlistThumb.id = "0";
        playlistThumb.thumbUrl = "http://localhost:3000/photos/testPhotos/New Orleans/IMG_1624_thumb.JPG";
        playlistThumb.stateName = "Drop item here";
        this.setState({ playlistThumbs: [playlistThumb] });
    }
    playlistDragOverHandler(ev) {
        console.log("playlistDragOverHandler");
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
    }
    playlistDropHandler(ev) {
        let playlistThumbs = this.state.playlistThumbs;
        console.log("drop");
        ev.preventDefault();
        var path = ev.dataTransfer.getData("path");
        var stateName = ev.dataTransfer.getData("name");
        var playlistThumb = new PlaylistThumb();
        playlistThumb.thumbUrl = "http://localhost:3000/photos/" + path;
        playlistThumb.stateName = stateName;
        var id = ev.target.id;
        var index = Number(id);
        var offset = ev.offsetX;
        var insert = false;
        if (offset < 50) {
            insert = true;
        }
        if (insert) {
            playlistThumbs.split(index, 0, playlistThumb);
        }
        else {
            playlistThumbs.splice(index + 1, 0, playlistThumb);
        }
        playlistThumbs.forEach(function (thumb, thumbIndex) {
            thumb.id = thumbIndex.toString();
        });
        this.setState({ playlistThumbs: playlistThumbs });
    }
    render() {
        let self = this;
        let playlistThumbs = this.state.playlistThumbs.map(function (thumb) {
            return (React.createElement("li", {className: "flex-item mediaLibraryThumbDiv", key: thumb.id, onDrop: self.playlistDropHandler.bind(self), onDragOver: self.playlistDragOverHandler}, React.createElement("img", {id: thumb.id, src: thumb.thumbUrl, className: "mediaLibraryThumbImg"}), React.createElement("p", {className: "mediaLibraryThumbLbl"}, thumb.stateName)));
        });
        return (React.createElement("div", {className: "playlistDiv"}, "Zone 1: Video or Images: Playlist", React.createElement("ul", {className: "playlist-flex-container wrap"}, playlistThumbs)));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Playlist;
