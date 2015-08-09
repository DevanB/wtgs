Template.typeCreate.events({
  'submit form': function(e) {
    e.preventDefault();

    var type = {
      type: e.target.type.value
    };

    Meteor.call('typeCreate', type, function(error, result) {
      if (error) {
        return throwError(error.reason);
      }

      if (result.typeExists) {
        return throwError('This type already exists');
      }

      Router.go('types');
    });
  }
});
