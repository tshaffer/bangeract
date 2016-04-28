/**
 * Created by tedshaffer on 4/25/16.
 */
import React, { Component } from 'react';

class Medialibrary extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("medialibrary::componentDidMount invoked");
    }

    mediaLibraryDragStartHandler(ev) {

        console.log("dragStart");
        // Add the target element's id to the data transfer object
        // ev.dataTransfer.setData("text", ev.target.id);
        ev.dataTransfer.setData("path", ev.target.dataset.path);
        ev.dataTransfer.setData("name", ev.target.dataset.name);
        ev.dataTransfer.dropEffect = "copy";
    }

    render () {

        let self = this;

        if (!this.props.thumbs || this.props.thumbs.length == 0) {
            return (
                <div>Pizza</div>
            );
        }
        
        let mediaLibraryThumbs = this.props.thumbs.map(function (thumb) {
            console.log("look at my thumb");

            // electron version
            // let thumbUrl = thumb.thumbUrl;

            // webapp version
            let thumbUrl = "http://localhost:3000/photos/" + thumb.thumbUrl;

            return (
                <li className="flex-item mediaLibraryThumbDiv" key={thumb.id}>
                    <img id={thumb.id} src={thumbUrl} className="mediaLibraryThumbImg" data-name={thumb.fileName} data-path={thumb.path} draggable="true" onDragStart={self.mediaLibraryDragStartHandler}/>
                    <p className="mediaLibraryThumbLbl">{thumb.fileName}</p>
                </li>
            );
        });
        
        return (
            <div className="mediaLibraryDiv">
                <ul className="flex-container wrap">
                    {mediaLibraryThumbs}
                </ul>
            </div>
        );
    }
}

export default Medialibrary;