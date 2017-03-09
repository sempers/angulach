Meteor.publish("threads", function () {
    return Post.find({isThreadStart: true});
});

Meteor.publish("thread-detail", function (num) {
    return Post.find({thread_num: num});
});

Meteor.publish("posts", function () {
    return Post.find({}, {sort: {num: -1}});
});



