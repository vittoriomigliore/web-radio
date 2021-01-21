import data from './data.json';

export default config = {
    name: 'YourRadio',
    apiUrl: 'http://localhost/api/',     // See implementation on api.js
    api_routes: {
        allPrograms: 'program.php',                     // See implementation on api.js
        singleProgram: 'program.php?title='             // See implementation on api.js
    },
    live_track: {
        interval: 30000,                                                    // Set updating interval of live stream data (title and image)
        url: data.livetrack.url,                            // Url of live stream
        titleUrl: data.livetrack.title_url,          // See implementation on api.js
        artworkUrl: data.livetrack.image_url,  // See implementation on api.js
    },
    /*  Set number of items to display on Home Screen for each category */
    home_items_No: {
        subscribed: 4,
        recent: 6,
        popular: 4,
        active: 4
    }
}