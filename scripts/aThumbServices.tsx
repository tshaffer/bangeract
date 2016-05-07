/**
 * Created by tedshaffer on 4/27/16.
 */
    
class BAThumb {
    id: string;
    thumbUrl: string;
    fileName: string;
    path: string;
    type: string;
}

declare var $: any;

export default class aThumbServices {

    constructor() {
        console.log("aThumbServices constructor");
    }

    getThumbSpec() {

        console.log("alternate getThumbSpec invoked");

        var self = this;

        return new Promise(function(resolve, reject) {

            const url = "http://localhost:3000/";
            const getPhotosUrl = url + "getPhotos";

            $.get({
                url: getPhotosUrl,
                dataType: 'json',
                cache: false,
                success: function (data: any) {
                    console.log("number of photos retrieved is: " + data.photos.length.toString());
                    let mediaLibraryThumbs = self.buildThumbs(data.photos);
                    resolve(mediaLibraryThumbs);
                }.bind(this),
                error: function (xhr:any , status: any, err: any) {
                    console.log("errors retrieving photos");
                    console.error(getPhotosUrl, status, err.toString());
                }.bind(this)
            });
        });

    }

    buildThumbs(photos: any) {

        let mediaLibraryThumbs:any[] = [];

        let index = 0;
        
        photos.forEach(function (photo: any) {
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

            // var thumb = {};
            let thumb:BAThumb = new BAThumb();

            thumb.id = photo.id;
            thumb.thumbUrl = "public/" + photo.thumbUrl;

            // different from thumbServices for electron
            // thumb.path = photo.url;
            thumb.path = photo.thumbUrl;

            thumb.fileName = photo.title;

            if (index == 0) {
                thumb.type = "image";
                index = 1;
            }
            else {
                thumb.type = "video";
                index = 0;
            }
            mediaLibraryThumbs.push(thumb);
        });

        return mediaLibraryThumbs;
    }

}
