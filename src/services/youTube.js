angular.module('video-player')
  // pass $http for angular ajax method 
  // pass $window to use window key 
  .service('youTube', function ($http, $window) {
    // add search on the service
    // pass in query from search and callback to render data 
    this.search = function (query, callback) {
      // add $http.get 
      $http.get('https://www.googleapis.com/youtube/v3/search', {
       // pass in input prams for you tube api key
        prams: {
          part: 'snippet',
          q: query,
          type: 'video',
          maxResults: 5,
          key: $window.YOUTUBE_API_KEY,
          videEmbeddable: 'true'
        }
      })
      // add then to pass data from get request to call back 
        .then(function ({data}) {
          if (callback) {
            callback(data.items);
          }
        })
        // use catch to pass error message on failed get to console
        .catch(function ({data}) {
          data.error.errors.forEach(function (error) {
            console.error(error.message);
          });
        });
    };
  });
