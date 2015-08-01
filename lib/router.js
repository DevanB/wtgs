Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.route('/', {name: 'map'});

Router.route('/about');

Router.route('admin');

Router.route('admin/analytics', {
  name: 'analyticsList',
  subscriptions: function() {
    return Meteor.subscribe('analytics');
  }
});

Router.route('admin/markers', {name: 'markers'});

Router.route('admin/markers/create', {name: 'createMarker'});

Router.route('admin/reviews', {name: 'reviews'});

Router.route('admin/users', {
  name: 'users'
});

Router.route('admin/pages', {
  name: 'pagesList',
  subscriptions: function() {
    return Meteor.subscribe('pages');
  }
});

Router.route('admin/pages/:_id', {
  name: 'pageEdit',
  subscriptions: function() {
    return Meteor.subscribe('page', this.params._id);
  },
  onBeforeAction: function() {
    Session.set("currentRoute", "pagesEdit");
    Session.set("currentPage", this.params._id);
    this.next();
  }
});

var editorView = function() {
  var currentRoute = Router.current().route._path;
  if (currentRoute === "/admin/pages/:id") {
    $("body").addClass("editor-view");
    this.next();
  } else {
    $("body").removeClass("editor-view");
    this.next();
  }
};

Router.onBeforeAction(editorView);
