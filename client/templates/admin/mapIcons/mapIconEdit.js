Template.mapIconEdit.onCreated(function(){
    this.subscribe('find-map-icon', Router.current().params._id);
});

Template.mapIconEdit.helpers({
  mapIcon: function() {
    return MapIcons.findOne();
  }
});

Template.mapIconEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var mapIcon = {
      _id: Router.current().params._id,
      type: e.target.type.value
    };

    Meteor.call('mapIconUpdate', mapIcon, function(error, result) {
      if (error) {
        return throwError(error.reason);
      }

      Router.go('mapIcons');
    });
  }
});
