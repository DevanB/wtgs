initEditor = function(template) {
  Tracker.autorun(function(computation) {
    var page = Pages.findOne({}, { fields: { "markdown": 1 } });

    if (page && page.markdown) {
      Meteor.call("convertMarkdown", page.markdown, function(error, html) {
        if (error) {
          console.log(error.reason);
        } else {
          $("#preview").html(html);
        }
      });
      template.editor.setValue( page.markdown.trim() );
      computation.stop();
    }
  })
};

delay = ( function() {
  var timer = 0;
  var executeDelay = function( callback, ms ) {
    clearTimeout( timer );
    timer = setTimeout( callback, ms );
  };
  return executeDelay;
})();

Template.pageEdit.onCreated(function() {
  this.saveState = new ReactiveVar();
});

Template.pageEdit.onRendered(function() {
  this.pageId = Session.get('currentPage');
  this.editor = CodeMirror.fromTextArea(this.find("#editor"), {
    lineNumbers: false,
    fixedGutter: false,
    mode: "markdown",
    lineWrapping: true,
    cursorHeight: 0.85
  });
  initEditor(this);
});

Template.pageEdit.helpers({
  saving: function() {
    var saveState = Template.instance().saveState.get();
    return saveState;
  },
  page: function() {
    return Pages.findOne();
  }
});

Template.pageEdit.events({
  'keyup .CodeMirror': function(event, template) {
    var text = template.editor.getValue();

    template.saveState.set(true);

    if (text !== "") {
      Meteor.promise("convertMarkdown", text)
        .then(function(html) {
          $("#preview").html(html);
          return Meteor.promise("pageUpdate", { _id: template.pageId, markdown: text});
        })
        .then(function() {
          delay(function() {
            template.saveState.set(false);
          }, 1000);
        })
        .catch(function(error){
          console.log("exception");
          console.dir(error);
          throwError(error.reason);
        });
    }
  }
});
