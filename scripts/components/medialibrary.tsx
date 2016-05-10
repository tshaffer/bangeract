import React = require('react');
import { connect } from 'react-redux';

class BAThumb {
    id: string;
    thumbUrl: string;
    fileName: string;
    path: string;
    type: string;
}

interface Props { thumbs: BAThumb[], media: any }

class MediaLibrary extends React.Component<Props, any> {

    state: Object;

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("medialibrary::componentDidMount invoked");
    }

    mediaLibraryDragStartHandler(ev: any) {

        console.log("dragStart");
        // Add the target element's id to the data transfer object
        // ev.dataTransfer.setData("text", ev.target.id);
        ev.dataTransfer.setData("path", ev.target.dataset.path);
        ev.dataTransfer.setData("name", ev.target.dataset.name);
        ev.dataTransfer.setData("type", ev.target.dataset.type);
        ev.dataTransfer.dropEffect = "copy";
    }

    render () {

        let self = this;

        // look at data from redux
        console.log("media count is", this.props.media.length.toString());

        // this.props["thumbs"] = [];
        // this.props.thumbs = [];

        if (!this.props.thumbs || this.props.thumbs.length == 0) {
            return (
                <div>Pizza</div>
            );
        }

        let mediaLibraryThumbs = this.props.thumbs.map(function (thumb: BAThumb) {
            console.log("look at my thumb");

            // electron version
            // let thumbUrl = thumb.thumbUrl;

            // webapp version
            // playlistThumb.thumbUrl = "http://localhost:3000/photos/testPhotos/New Orleans/IMG_1624_thumb.JPG";
            // thumb.thumbUrl = "public/testPhotos/New Orleans/IMG_1624_thumb.JPG"
            let thumbUrl = "";
            if (thumb.thumbUrl.startsWith("public")) {
                thumbUrl = "http://localhost:3000/photos" + thumb.thumbUrl.substring(6);
            }

            return (
                <li className="flex-item mediaLibraryThumbDiv" key={thumb.id}>
                    <img id={thumb.id} src={thumbUrl} className="mediaLibraryThumbImg" data-name={thumb.fileName} data-path={thumb.path} data-type={thumb.type} draggable={true} onDragStart={self.mediaLibraryDragStartHandler}/>
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

function mapStateToProps(state: any) {
    // Whatever is returned will show up as props inside of PhotoGrid
    return {
        media: state.media
    };
}

export default connect(mapStateToProps)(MediaLibrary);
