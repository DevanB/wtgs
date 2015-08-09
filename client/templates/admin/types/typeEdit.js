Template.typeEdit.onCreated(function(){
    this.subscribe('find-type', Router.current().params._id);
});

Template.typeEdit.helpers({
  type: function() {
    return Types.findOne();
  }
});

Template.typeEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var type = {
      _id: Router.current().params._id,
      type: e.target.type.value
    };

    Meteor.call('typeUpdate', type, function(error, result) {
      if (error) {
        return throwError(error.reason);
      }

      Router.go('types');
    });
  }
});
