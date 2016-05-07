import React = require('react');
import bdm = require("../badm-interfaces")

class DmMediaObject implements bdm.IDmMediaObject {

    name : string;
    description : string;

    // Methods
    Clone() : bdm.IDmObject {
       return null;
    }
    CopyFrom(source:bdm.IDmObject) : void
    {
    };

    IsEqual(other:bdm.IDmObject) : Boolean {
        return false;
    };

    url : string;
    isAvailable : Boolean;  // readonly - replaces FileExists
    isLocal : Boolean;      // readonly
}

class ImagePlaylistItem implements bdm.IDmMediaPlaylistItem {
    // IDmObject
    name : string;
    description : string;
    Clone() : bdm.IDmObject {
        return null;
    }
    CopyFrom(source:bdm.IDmObject) : void
    {
    }
    IsEqual(other:bdm.IDmObject) : Boolean {
        return false;
    }

    // IDmPlaylistItem
    id: string;

    // IDmMediaPlaylistItem
    media : bdm.IDmMediaObject;

    // unique to ImagePlaylistItem
    slideDelayInterval: number;
    slideTransition: number;
    transitionDuration: number;
    useImageBuffer: boolean;
    videoPlayerRequired: boolean;

    constructor(name: string) {
        this.name = name;
        this.media = new DmMediaObject();
        // initialize other member variables
    }
}

class VideoPlaylistItem implements bdm.IDmMediaPlaylistItem {
    // IDmObject
    name : string;
    description : string;
    Clone() : bdm.IDmObject {
        return null;
    }
    CopyFrom(source:bdm.IDmObject) : void
    {
    }
    IsEqual(other:bdm.IDmObject) : Boolean {
        return false;
    }

    // IDmPlaylistItem
    id: string;

    // IDmMediaPlaylistItem
    media : bdm.IDmMediaObject;

    // unique to VideoPlaylistItem
    volume: number;
    videoDisplayMode: string;
    automaticallyLoop: boolean;

    constructor(name: string) {
        this.name = name;
        this.media = new DmMediaObject();
        // initialize other member variables
    }
}

class BAPlaylist implements bdm.IDmPlaylist {

    playlistItems: bdm.IDmPlaylistItem[];

    // IDmObject
    name : string;
    description : string;
    Clone() : bdm.IDmObject {
        return null;
    }
    CopyFrom(source:bdm.IDmObject) : void
    {
    }
    IsEqual(other:bdm.IDmObject) : Boolean {
        return false;
    }

    constructor() {
        this.playlistItems = [];
    }

}





class BAThumb {
    id: string;
    thumbUrl: string;
    fileName: string;
    path: string;
}

class PlaylistThumb {
    id: string;
    thumbUrl: string;
    stateName: string;
}

interface Props { thumbs: BAThumb[] }

class Playlist extends React.Component<any, any> {

    baPlaylist: BAPlaylist;

    constructor(props: Props) {
        super(props);
        this.state = {
            playlistThumbs: []
        };

        this.baPlaylist = new BAPlaylist();
    }

    componentDidMount() {
        console.log("playlist::componentDidMount invoked");

        let playlistThumb:PlaylistThumb = new PlaylistThumb();

        playlistThumb.id = "0";

        // electron url
        // playlistThumb.thumbUrl = "public/IMG_1624_thumb.JPG";

        // webapp url
        // playlistThumb.thumbUrl = "http://localhost:3000/photos/testPhotos/Tahoe/photo.jpg";
        playlistThumb.thumbUrl = "http://localhost:3000/photos/testPhotos/New Orleans/IMG_1624_thumb.JPG";
        playlistThumb.stateName = "Drop item here";
        this.setState({playlistThumbs: [playlistThumb]});
    }

    playlistDragOverHandler (ev: any) {
        console.log("playlistDragOverHandler");
        ev.preventDefault();
        // Set the dropEffect to move
        ev.dataTransfer.dropEffect = "move";
    }

    playlistDropHandler (ev: any) {

        let playlistThumbs = this.state.playlistThumbs;

        console.log("drop");

        ev.preventDefault();

        // get playlist item to add to playlist
        var path = ev.dataTransfer.getData("path");
        var stateName = ev.dataTransfer.getData("name");
        var type = ev.dataTransfer.getData("type");

        // specify playlist item to drop
        var playlistThumb:PlaylistThumb = new PlaylistThumb();

        // electron version
        // playlistThumb.thumbUrl = "public/" + path;

        // webapp version
        playlistThumb.thumbUrl = "http://localhost:3000/photos/" + path;

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
        playlistThumbs.forEach(function (thumb: PlaylistThumb, thumbIndex: Number) {
            thumb.id = thumbIndex.toString();
        });

        this.setState({playlistThumbs: playlistThumbs});

        if (type == "image") {
            // create image playlist item and add it to the playlist
            var imagePlaylistItem = new ImagePlaylistItem(stateName);
            imagePlaylistItem.description = "image";
            imagePlaylistItem.id = playlistThumb.id;
            imagePlaylistItem.media.url = playlistThumb.thumbUrl;
            imagePlaylistItem.media.isAvailable = true;
            imagePlaylistItem.media.isLocal = true;
            this.baPlaylist.playlistItems.push(imagePlaylistItem);
        }
        else {
            var videoPlaylistItem = new VideoPlaylistItem(stateName);
            videoPlaylistItem.description = "video";
            videoPlaylistItem.id = playlistThumb.id;
            videoPlaylistItem.media.url = playlistThumb.thumbUrl;
            videoPlaylistItem.media.isAvailable = true;
            videoPlaylistItem.media.isLocal = true;
            this.baPlaylist.playlistItems.push(videoPlaylistItem);
        }

        debugger;
    }

    render () {

        let self = this;

        let playlistThumbs = this.state.playlistThumbs.map(function (thumb: PlaylistThumb) {
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
