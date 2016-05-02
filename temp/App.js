"use strict";
const React = require('react');
const aThumbServices_1 = require('./aThumbServices');
const medialibrary_1 = require('./components/medialibrary');
const playlist_1 = require('./components/playlist');
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaLibraryThumbs: [],
        };
        console.log("app.tsx constructor");
        this.thumbServices = new aThumbServices_1.default();
    }
    hitMe() {
        console.log("hit me");
        var self = this;
        let thumbServicesPromise = this.thumbServices.getThumbSpec();
        thumbServicesPromise.then(function (mediaLibraryThumbs) {
            self.setState({ mediaLibraryThumbs: mediaLibraryThumbs });
        });
    }
    render() {
        return (React.createElement("div", {className: "container baContainer"}, React.createElement("button", {type: "button", onClick: this.hitMe.bind(this)}, "hit me"), React.createElement(medialibrary_1.default, {thumbs: this.state.mediaLibraryThumbs}), React.createElement(playlist_1.default, null)));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
