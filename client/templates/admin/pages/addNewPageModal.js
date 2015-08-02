Template.addNewPageModal.onRendered(function(){

});

Template.addNewPageModal.events({
  'submit form': function(e) {
    e.preventDefault();
    var title = $("[name='pageTitle']").val();

    Meteor.call('pageCreate', title, function(error, response) {
      if ( error ) {
        throwError(error.reason);
      } else {
        Router.go("pageEdit", { _id: response });
        $('#new-document-modal').modal('hide');
        $('.modal-backdrop').remove();
      }
    });
  }
})
