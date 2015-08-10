Template.pagesList.onRendered(function(){
    this.subscribe("all-pages");
});

Template.pagesList.helpers({
  pages: function() {
    return Pages.find();
  }
});
