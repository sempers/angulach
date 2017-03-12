Post = new Mongo.Collection("post");

Post.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});

Post.loadThreads = function (options) {
    options = options || {};
    _.extend(options || {}, {isThreadStart: true});
    var userInfo = UserInfo.findOne({});
    return Post.find(options, {sort: {num: -1}}).fetch().map(function (post) {
        return _.extend(post, {
            favorite: userInfo.favorites.indexOf(post._id) >=0,
            hidden: userInfo.hidden.indexOf(post._id) >= 0,
            isList: true
        });
    })
};

Post.loadOneThread = function (options) {
    options = options || {};
    _.extend(options, {isThreadStart: true});
    var userInfo = UserInfo.findOne({});
    var post = Post.findOne(options);
    if (post) {
        _.extend(post, {
            favorite: userInfo.favorites.indexOf(post._id) >=0
        });
    }
    return post;
};

Post.loadComments = function (options) {
    options = options || {};
    _.extend(options, {isThreadStart: false});
    return Post.find(options, {sort: {num: 1}});
};

Post.getNextNum = function () {
    var posts = Post.find({}, {sort: {num: -1}, limit: 1});
    var post_counter = posts.count() > 0 ? posts.fetch()[0].num : 0;
    return ++post_counter;
};

Meteor.methods({
    "post.startThread": function (thread) {
        var newNum = Post.getNextNum();
        Post.insert({
            num: newNum,
            heading: thread.heading,
            link: thread.link,
            body: thread.body,
            isThreadStart: true,
            thread_num: newNum,
            date: (new Date()),
            board: thread.board,
            rating: 0,
            commentsCount: 0,
            ratedBy: [],
            approved: !!thread.approved,
            pinned: !!thread.pinned,
            nonrateable: !!thread.nonrateable,
            closed: !!thread.closed,
            creator: {
                ip: Meteor.getIP(this),
                userId: Meteor.userId()
            }
        });
        return newNum;
    },

    "post.removePost": function (id) {
        Post.remove({_id: id});
    },

    "post.idByNum": function (num) {
        var post = Post.findOne({num: num});
        if (!post)
            return null;
        else
            return post._id;
    },

    "post.byNum": function (num) {
        return Post.findOne({num: num});
    },

    "post.addComment": function (comment) {
        var post_counter = Post.getNextNum();
        Post.insert({
            num: post_counter,
            body: comment.body,
            isThreadStart: false,
            thread_num: comment.thread_num,
            date: (new Date()),
            board: comment.board,
            rating: 0,
            commentsCount: 0,
            approved: false,
            pinned: false,
            nonrateable: false,
            closed: false,
            ratedBy: [],
            creator: {
                ip: Meteor.getIP(this),
                userId: Meteor.userId()
            }
        });
        Post.update({num: comment.thread_num}, {$inc: {commentsCount: 1}});
    },

    "post.deleteComment": function (comment) {
        Post.remove({_id: id});
        Post.update({num: comment.thread_num}, {$inc: {commentsCount: -1}});
    },

    "post.rate": function (id, dir) {
        var inc = 0;
        if (dir == "up")
            inc = 1;
        else if (dir == "down")
            inc = -1;
        else
            return false;
        var ip = Meteor.getIP(this);
        Post.update({_id: id, ratedBy: {$ne: ip}}, {$inc: {rating: inc}, $push: {ratedBy: ip}});
    }
});