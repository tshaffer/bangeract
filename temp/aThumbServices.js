"use strict";
class BAThumb {
}
class aThumbServices {
    constructor() {
        console.log("aThumbServices constructor");
    }
    getThumbSpec() {
        console.log("alternate getThumbSpec invoked");
        var self = this;
        return new Promise(function (resolve, reject) {
            const url = "http://localhost:3000/";
            const getPhotosUrl = url + "getPhotos";
            $.get({
                url: getPhotosUrl,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    console.log("number of photos retrieved is: " + data.photos.length.toString());
                    let mediaLibraryThumbs = self.buildThumbs(data.photos);
                    resolve(mediaLibraryThumbs);
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log("errors retrieving photos");
                    console.error(getPhotosUrl, status, err.toString());
                }.bind(this)
            });
        });
    }
    buildThumbs(photos) {
        let mediaLibraryThumbs = [];
        photos.forEach(function (photo) {
            let thumb = new BAThumb();
            thumb.id = photo.id;
            thumb.thumbUrl = "public/" + photo.thumbUrl;
            thumb.path = photo.thumbUrl;
            thumb.fileName = photo.title;
            mediaLibraryThumbs.push(thumb);
        });
        return mediaLibraryThumbs;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = aThumbServices;
