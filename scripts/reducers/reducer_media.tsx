export default function(state: any = null, action: any) {
    
    if (state == null) {

        var mediaItem: any;
        var mediaItems = new Array();

        mediaItem = { dbId: '1', url: "testPhotos/New Orleans/IMG_1624.JPG", thumbUrl: "testPhotos/New Orleans/IMG_1624_thumb.JPG", orientation: 6, title: "IMG_1624.JPG", height: 108, width: 108, dateTaken: "1/1/2016 03:33 am", tagList: [] };
        mediaItems.push(mediaItem);

        mediaItem = { dbId: '1', url: "testPhotos/New Orleans/IMG_1625.JPG", thumbUrl: "testPhotos/New Orleans/IMG_1625_thumb.JPG", orientation: 6, title: "IMG_1625.JPG", height: 108, width: 108, dateTaken: "1/1/2016 04:33 am", tagList: [] };
        mediaItems.push(mediaItem);

        mediaItem = { dbId: '1', url: "testPhotos/New Orleans/IMG_1627.JPG", thumbUrl: "testPhotos/New Orleans/IMG_1627_thumb.JPG", orientation: 1, title: "IMG_1627.JPG", height: 108, width: 108, dateTaken: "1/1/2016 05:33 am", tagList: [] };
        mediaItems.push(mediaItem);

        mediaItem = { dbId: '1', url: "testPhotos/New Orleans/IMG_1628.JPG", thumbUrl: "testPhotos/New Orleans/IMG_1628_thumb.JPG", orientation: 6, title: "IMG_1628.JPG", height: 108, width: 108, dateTaken: "1/1/2016 06:33 am", tagList: [] };
        mediaItems.push(mediaItem);

        return mediaItems;
        // return [
        //     { dbId: '1', url: "testPhotos/New Orleans/IMG_1624.JPG", thumbUrl: "testPhotos/New Orleans/IMG_1624_thumb.JPG", orientation: 6, title: "IMG_1624.JPG", height: 108, width: 108, dateTaken: "1/1/2016 03:33 am", tagList: [] },
        //     { dbId: '1', url: "testPhotos/New Orleans/IMG_1625.JPG", thumbUrl: "testPhotos/New Orleans/IMG_1625_thumb.JPG", orientation: 6, title: "IMG_1625.JPG", height: 108, width: 108, dateTaken: "1/1/2016 04:33 am", tagList: [] },
        //     { dbId: '1', url: "testPhotos/New Orleans/IMG_1627.JPG", thumbUrl: "testPhotos/New Orleans/IMG_1627_thumb.JPG", orientation: 1, title: "IMG_1627.JPG", height: 108, width: 108, dateTaken: "1/1/2016 05:33 am", tagList: [] },
        //     { dbId: '1', url: "testPhotos/New Orleans/IMG_1628.JPG", thumbUrl: "testPhotos/New Orleans/IMG_1628_thumb.JPG", orientation: 6, title: "IMG_1628.JPG", height: 108, width: 108, dateTaken: "1/1/2016 06:33 am", tagList: [] },
        // ];
    }
}
