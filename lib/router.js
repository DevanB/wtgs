Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return Meteor.subscribe('markers');
    }
});

Router.route('/', {name: 'map'});
Router.route('admin');
Router.route('admin/markers', {
    waitOn: function() {
      return Meteor.subscribe('markers');
    },
    name: 'markers'
});
Router.route('admin/markers/create', {name: 'createMarker'});

Router.route('admin/reviews', {name: 'reviews'});

Router.route('admin/users', {name: 'users'});
