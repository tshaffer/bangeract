/**
 * Created by tedshaffer on 4/27/16.
 */
export default class aThumbServices {

    constructor() {
    }

    getThumbSpec() {
        console.log("alternate getThumbSpec invoked");

        const url = "http://localhost:3000/";
        const getPhotosUrl = url + "getPhotos";

        $.get({
            url: getPhotosUrl,
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log("number of photos retrieved is: " + data.photos.length.toString());
                this.buildThumbs(data.photos);
                // this.updatePhotos(data.photos);
            }.bind(this),
            error: function(xhr, status, err) {
                console.log("errors retrieving photos");
                console.error(getPhotosUrl, status, err.toString());
            }.bind(this)
        });
    }

    buildThumbs(photos) {

        let mediaLibraryThumbs = [];

        photos.forEach(function (photo) {
/*
id = thumb.id
src = thumb.url
data-name = thumb.fileName
data-path = thumb.path
label = thumb.fileName

            thumbUrl : "testPhotos/New Orleans/IMG_1624_thumb.JPG"
            title : "IMG_1624.JPG"
            url :"testPhotos/New Orleans/IMG_1624.JPG"
 */

            var thumb = {};
            thumb.id = photo.id;
            thumb.thumbUrl = "public/" + photo.thumbUrl;
            thumb.path = photo.url;
            thumb.fileName = photo.title;

            mediaLibraryThumbs.push(thumb);
        });

        debugger;
        return mediaLibraryThumbs;
    }

}
