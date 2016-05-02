/// <reference path="../typings/react/react.d.ts" />
/// <reference path="../typings/react/react-dom.d.ts" />

import React = require('react');
import ReactDOM = require('react-dom');

import ThumbServices from './aThumbServices';

import Medialibrary from './components/medialibrary';
import Playlist from './components/playlist';

interface Props { }

export default class App extends React.Component<Props, any> {

  thumbServices: any;


  constructor(props: Props) {
    super(props);
    this.state = {
      mediaLibraryThumbs: [],
    };

    console.log("app.tsx constructor");

    this.thumbServices = new ThumbServices();
  }

  hitMe() {

    console.log("hit me");

    var self = this;

    let thumbServicesPromise = this.thumbServices.getThumbSpec();
    thumbServicesPromise.then(function(mediaLibraryThumbs: any) {
      self.setState( { mediaLibraryThumbs : mediaLibraryThumbs });
    })

  }

  render() {

    return (
        <div className = "container baContainer">
          <button type="button" onClick={this.hitMe.bind(this)}>hit me</button>
          <Medialibrary thumbs = { this.state.mediaLibraryThumbs }/>
          <Playlist />
        </div>
    );
  }
}
