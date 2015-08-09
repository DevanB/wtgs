Template.mapIconCreate.events({
  'submit form': function(e) {
    e.preventDefault();

    var mapIcon = {
      type: e.target.type.value
    };

    Meteor.call('mapIconCreate', mapIcon, function(error, result) {
      if (error) {
        return throwError(error.reason);
      }

      if (result.mapIconExists) {
        return throwError('This map icon already exists');
      }

      Router.go('mapIcons');
    });
  }
});
