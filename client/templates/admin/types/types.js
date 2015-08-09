Template.types.onCreated(function(){
  this.subscribe('all-types');
});

Template.types.helpers({
  types: function(){
    return Types.find();
  }
});
