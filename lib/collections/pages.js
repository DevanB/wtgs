Pages = new Mongo.Collection('pages');

Meteor.methods({
	pageCreate: function(title) {
		check(title, String);

		var page = {
			title: title,
			markdown: " ",
			createdBy: Meteor.userId(),
			createdAt: new Date()
		}

		try {
			var pageId = Pages.insert(page);
			return pageId;
		} catch (exception) {
			console.log("exception in pageCreate");
			return exception;
		}

		//check for dup page named about-wtgs
	},

	pageUpdate: function(pageAttributes) {
		check(pageAttributes, {
			_id: String,
			markdown: Match.Optional(String),
			title: Match.Optional(String)
		});

		var page = pageAttributes._id;
		delete pageAttributes._id;

		try {
			var pageId = Pages.update(page, {
				$set: pageAttributes
			});
			return pageId;
		} catch(exception) {
			console.log("exception in pageUpdate");
			return exception;
		}

		//add extra fields updatedAt, updatedBy
	},

	convertMarkdown: function(markdown) {
		check(markdown, String);
		return parseMarkdown(markdown);
	}
});
