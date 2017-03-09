Post = new Mongo.Collection("post");

Post.allow({
    insert: function () {
        return true;
    },
    update: function (userId, doc) {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    }
});

function getNextPostCounter(){
    var posts = Post.find({},{sort: {num: -1}, limit: 1});
    var post_counter = posts.count()>0 ? posts.fetch()[0].num : 0;
    return ++post_counter;
}

function getIP(self){
    if (Meteor.isClient)
        return headers.getClientIP();
    if (Meteor.isServer)
        return headers.methodClientIP(self);
}

Meteor.methods({
    "post.startThread": function (thread) {
        var post_counter = getNextPostCounter();
        Post.insert({
            num: post_counter,
            heading: thread.heading,
            link: thread.link,
            body: thread.body,
            isThreadStart: true,
            thread_num: post_counter,
            date: (new Date()),
            board: thread.board,
            approved: false,
            rating: 0,
            commentsCount: 0,
            hiddenBy: [],
            favoritedBy: [],
            creator: {
                ip: getIP(this)
            }
        });
        return post_counter;
    },

    "post.removePost": function (id) {
        Post.remove({_id: id});
    },

    "post.idByNum": function(num) {
        var post = Post.findOne({num: num});
        if (!post)
            return null;
        else
            return post._id;
    },

    "post.byNum": function(num) {
        return Post.findOne({num: num});
    },

    "dummy": function(num) {
        return {"dummy": num};
    },

    "post.addComment": function(comment) {
        var post_counter = getNextPostCounter();
        Post.insert({
            num: post_counter,
            body: comment.body,
            isThreadStart: false,
            thread_num: comment.thread_num,
            date: (new Date()),
            board: comment.board,
            approved: false,
            rating: 0,
            commentsCount: 0,
            hiddenBy: [],
            favoritedBy: [],
            creator: {
                ip: getIP(this)
            }
        });
        Post.update({num: comment.thread_num}, {$inc: {commentsCount: 1}});
    },

    "post.deleteComment": function(comment){
        Post.remove({_id: id});
        Post.update({num: comment.thread_num}, {$inc: {commentsCount: -1}});
    },

    "post.addFavorite": function (id) {
        var ip = getIP(this);
        Post.update({_id: id}, {$push: {favoritedBy: ip}});
    },
    "post.removeFavorite": function (id) {
        var ip = getIP(this);
        Post.update({_id: id}, {$pull: {favoritedBy: ip}});
    },

    "post.hideThread": function (id) {
        var ip = getIP(this);
        Post.update({_id: id}, {$push: {hiddenBy: ip}});
    },
    "post.showThread": function (id) {
        var ip = getIP(this);
        Post.update({_id: id}, {$pull: {hidden: ip}});
    }
});