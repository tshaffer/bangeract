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

// <ul className="flex-container wrap">
// {photoNodes}
// </ul>

    pizza() {

        let self = this;
        let photoNodes = this.props.photoInfo.photos.map(function (photo) {
            self.thumbUrl = "http://localhost:3000/photos/" + photo.thumbUrl.replace(" ", "%20");
            self.photosById[photo.dbId] = photo;
            return (
                <li className="flex-item photoThumbsDiv" key={photo.dbId}>
                    <img id={photo.dbId} src={self.thumbUrl} className="thumbImg" width={photo.width}
                         height={photo.height} onClick={self.photoSelected.bind(self)}/>
                </li>
            );
        });
    }

    // return (
    //     <div className="photosDiv">
    //         <ul className="flex-container wrap">
    //             {photoNodes}
    //         </ul>
    //     </div>
    // );

    // <td>
    //     <div class="mediaLibraryThumbDiv">
    //         <img id="{{thumb.column0.id}}" data-name="{{thumb.column0.fileName}}" data-path="{{thumb.column0.path}}" ng-src="{{thumb.column0.thumbUrl}}" class="mediaLibraryThumbImg" draggable="true" ondragstart="mediaLibraryDragStartHandler(event);">
    //         <p class="mediaLibraryThumbLbl">{{thumb.column0.fileName}}</p>
    //     </div>
    // </td>

render () {

        let self = this;
        let foo = this.props.thumbs;
        if (!this.props.thumbs || this.props.thumbs.length == 0) {
            return (
                <div>Pizza</div>
            );
        }

        // also get thumbs from column1 or change the way it's built (the right answer)
        let mediaLibraryThumbs = this.props.thumbs.map(function (myThumb) {
            let thumb = myThumb.column0;
            console.log("look at my thumb");
            return (
                <li className="flex-item mediaLibraryThumbDiv" key={thumb.id}>
                    <img id={thumb.id} src={thumb.thumbUrl} className="mediaLibraryThumbImg"/>
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