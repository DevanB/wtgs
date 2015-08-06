Pages = new Mongo.Collection('pages');

Meteor.methods({
	pageCreate: function(title) {
		var loggedInUser = Meteor.user();
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'])) {
      throw new Meteor.Error("access-denied", "Access denied.");
    }

		check(title, String);

		var page = {
			title: title,
			markdown: " ",
			createdBy: Meteor.userId(),
			createdAt: new Date()
		}

		var pageWithSameName = Pages.findOne({name: title});
    if (pageWithSameName) {
      return {
        pageExists: true,
        _id: pageWithSameName._id
      }
    }

		try {
			var pageId = Pages.insert(page);
			return pageId;
		} catch (exception) {
			return exception;
		}
	},

	pageUpdate: function(pageAttributes) {
		var loggedInUser = Meteor.user();
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'])) {
      throw new Meteor.Error("access-denied", "Access denied.");
    }

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
			return exception;
		}

		//add extra fields updatedAt, updatedBy
	},

	convertMarkdown: function(markdown) {
		var loggedInUser = Meteor.user();
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'])) {
      throw new Meteor.Error("access-denied", "Access denied.");
    }

		check(markdown, String);
		return parseMarkdown(markdown);
	}
});
