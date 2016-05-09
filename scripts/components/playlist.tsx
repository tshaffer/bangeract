import React = require('react');

// import bdm = require("../badm-interfaces")
// OR
// import { IDmMediaObject, IDmObject, etc. } from "../badm-interfaces";    // intuit and industry standard approach
// OR
import * as bdm from "../badm-interfaces";

class DmObject implements bdm.IDmObject {
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
}

// class DmMediaObject implements bdm.IDmMediaObject {
//
//     name : string;
//     description : string;
//
//     // Methods
//     Clone() : bdm.IDmObject {
//        return null;
//     }
//     CopyFrom(source:bdm.IDmObject) : void
//     {
//     };
//
//     IsEqual(other:bdm.IDmObject) : Boolean {
//         return false;
//     };
//
//     url : string;
//     isAvailable : Boolean;  // readonly - replaces FileExists
//     isLocal : Boolean;      // readonly
// }


class DmMediaObject extends DmObject implements bdm.IDmMediaObject {
    url : string;
    isAvailable : Boolean;  // readonly - replaces FileExists
    isLocal : Boolean;      // readonly
}

class DmEvent extends DmObject implements bdm.IDmEvent {
    type : bdm.EventType;
    transitionList : [DmTransition];
}

class DmTransition extends DmObject implements bdm.IDmTransition {

    target: DmMediaState;
}

class DmPlaylistItem extends DmObject implements bdm.IDmPlaylistItem {

    id : string;            // GUID
}

class DmMediaPlaylistItem extends DmPlaylistItem implements bdm.IDmMediaPlaylistItem {

    media:bdm.IDmMediaObject = new DmMediaObject();
}

class ImagePlaylistItem extends DmMediaPlaylistItem  {

    slideDelayInterval: number;
    slideTransition: number;
    transitionDuration: number;
    useImageBuffer: boolean;
    videoPlayerRequired: boolean;

    constructor(name: string) {
        super();
        this.name = name;
        // this.media = new DmMediaObject();
        // initialize other member variables
    }
}

class VideoPlaylistItem extends DmMediaPlaylistItem {

    volume: number;
    videoDisplayMode: string;
    automaticallyLoop: boolean;

    constructor(name: string) {
        super();
        this.name = name;
        this.media = new DmMediaObject();
        // initialize other member variables
    }
}

class DmMediaState extends DmObject implements bdm.IDmMediaState {

    // Properties
    id : string;            // GUID
    mediaPlaylistItem :     DmMediaPlaylistItem;
    mediaHasBrokenLink :    Boolean;   // convenience property
    eventList :             [DmEvent];
}

class DmZonePlaylist extends DmObject implements bdm.IDmZonePlaylist {
    mediaStates: DmMediaState[] = new Array();
}



// class BAThumb {
//     id: string;
//     thumbUrl: string;
//     fileName: string;
//     path: string;
// }

// class PlaylistThumb {
//     id: string;
//     thumbUrl: string;
//     stateName: string;
// }

class PlaylistItemViewItem extends DmMediaState {
    thumbUrl: string;
}


// interface Props { thumbs: BAThumb[] }

class Playlist extends React.Component<any, any> {

    zonePlaylist: DmZonePlaylist;

    constructor() {
    // constructor(props: Props) {
    //     super(props);
        super();
        this.state = {
            playlistItemViewItems: []
        };

        this.zonePlaylist = new DmZonePlaylist();
    }

    componentDidMount() {
        console.log("playlist::componentDidMount invoked");

        let playlistItemViewItem:PlaylistItemViewItem = new PlaylistItemViewItem();

        playlistItemViewItem.id = "0";

        // electron url
        // playlistThumb.thumbUrl = "public/IMG_1624_thumb.JPG";

        // webapp url
        // playlistThumb.thumbUrl = "http://localhost:3000/photos/testPhotos/Tahoe/photo.jpg";
        playlistItemViewItem.thumbUrl = "http://localhost:3000/photos/testPhotos/New Orleans/IMG_1624_thumb.JPG";
        playlistItemViewItem.name = "Drop item here";
        this.setState({playlistItemViewItems: [playlistItemViewItem]});
    }

    playlistDragOverHandler (ev: any) {
        console.log("playlistDragOverHandler");
        ev.preventDefault();
        // Set the dropEffect to move
        ev.dataTransfer.dropEffect = "move";
    }

    playlistDropHandler (ev: any) {

        let playlistItemViewItems = this.state.playlistItemViewItems;

        console.log("drop");

        ev.preventDefault();

        // get playlist item to add to playlist
        var path = ev.dataTransfer.getData("path");
        var stateName = ev.dataTransfer.getData("name");
        var type = ev.dataTransfer.getData("type");

        // specify playlist item to drop
        var playlistItemViewItem:PlaylistItemViewItem = new PlaylistItemViewItem();

        // electron version
        // playlistThumb.thumbUrl = "public/" + path;

        // webapp version
        playlistItemViewItem.thumbUrl = "http://localhost:3000/photos/" + path;

        playlistItemViewItem.name = stateName;

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
            playlistItemViewItems.split(index, 0, playlistItemViewItem);
        }
        else {
            // add after index
            playlistItemViewItems.splice(index + 1, 0, playlistItemViewItem);
        }

        // renumber id's
        playlistItemViewItems.forEach(function (playlistItemViewItem: PlaylistItemViewItem, playlistItemIndex: Number) {
            playlistItemViewItem.id = playlistItemIndex.toString();
        });

        this.setState({playlistItemViewItems: playlistItemViewItems});

        if (type == "image") {
            // create image playlist item and add it to the playlist
            var imagePlaylistItem = new ImagePlaylistItem(stateName);
            imagePlaylistItem.description = "image";
            imagePlaylistItem.id = playlistItemViewItem.id;
            imagePlaylistItem.media.url = playlistItemViewItem.thumbUrl;
            imagePlaylistItem.media.isAvailable = true;
            imagePlaylistItem.media.isLocal = true;

            let mediaState: DmMediaState = new DmMediaState();
            mediaState.mediaPlaylistItem = imagePlaylistItem;
            this.zonePlaylist.mediaStates.push(mediaState);
        }
        else {
            var videoPlaylistItem = new VideoPlaylistItem(stateName);
            videoPlaylistItem.description = "video";
            videoPlaylistItem.id = playlistItemViewItem.id;
            videoPlaylistItem.media.url = playlistItemViewItem.thumbUrl;
            videoPlaylistItem.media.isAvailable = true;
            videoPlaylistItem.media.isLocal = true;

            let mediaState: DmMediaState = new DmMediaState();
            mediaState.mediaPlaylistItem = videoPlaylistItem;
            this.zonePlaylist.mediaStates.push(mediaState);
        }

        // add dropped playlistItem to data model!!
    }

    render () {

        let self = this;

        let playlistItemViewItems = this.state.playlistItemViewItems.map(function (playlistItemViewItem: PlaylistItemViewItem) {
            return (
                <li className="flex-item mediaLibraryThumbDiv" key={playlistItemViewItem.id} onDrop={self.playlistDropHandler.bind(self)} onDragOver={self.playlistDragOverHandler}>
                    <img id={playlistItemViewItem.id} src={playlistItemViewItem.thumbUrl} className="mediaLibraryThumbImg"/>
                    <p className="mediaLibraryThumbLbl">{playlistItemViewItem.name}</p>
                </li>
            );
        });

        return (
            <div className="playlistDiv">
                Zone 1: Video or Images: Playlist
                <ul className="playlist-flex-container wrap">
                    {playlistItemViewItems}
                </ul>
            </div>
        );
    }
}

export default Playlist;
