/**
 * Created by tedshaffer on 4/27/16.
 */
export default class aThumbServices {

    constructor() {
    }

    getThumbSpec() {

        console.log("alternate getThumbSpec invoked");

        var self = this;

        return new Promise(function(resolve, reject) {

            // const url = "http://localhost:3000/";
            const url = "http://192.168.0.108:3000/";
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

            // different from thumbServices for electron
            // thumb.path = photo.url;
            thumb.path = photo.thumbUrl;
            
            thumb.fileName = photo.title;

            mediaLibraryThumbs.push(thumb);
        });

        return mediaLibraryThumbs;
    }

}
