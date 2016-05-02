"use strict";
const React = require('react');
class BAThumb {
}
class MediaLibrary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("medialibrary::componentDidMount invoked");
    }
    mediaLibraryDragStartHandler(ev) {
        console.log("dragStart");
        ev.dataTransfer.setData("path", ev.target.dataset.path);
        ev.dataTransfer.setData("name", ev.target.dataset.name);
        ev.dataTransfer.dropEffect = "copy";
    }
    render() {
        let self = this;
        if (!this.props.thumbs || this.props.thumbs.length == 0) {
            return (React.createElement("div", null, "Pizza"));
        }
        let mediaLibraryThumbs = this.props.thumbs.map(function (thumb) {
            console.log("look at my thumb");
            let thumbUrl = "";
            if (thumb.thumbUrl.startsWith("public")) {
                thumbUrl = "http://localhost:3000/photos" + thumb.thumbUrl.substring(6);
            }
            return (React.createElement("li", {className: "flex-item mediaLibraryThumbDiv", key: thumb.id}, React.createElement("img", {id: thumb.id, src: thumbUrl, className: "mediaLibraryThumbImg", "data-name": thumb.fileName, "data-path": thumb.path, draggable: true, onDragStart: self.mediaLibraryDragStartHandler}), React.createElement("p", {className: "mediaLibraryThumbLbl"}, thumb.fileName)));
        });
        return (React.createElement("div", {className: "mediaLibraryDiv"}, React.createElement("ul", {className: "flex-container wrap"}, mediaLibraryThumbs)));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MediaLibrary;
