Meteor.publish("threads", function () {
    return Post.find({isThreadStart: true});
});

Meteor.publish("thread-detail", function (num) {
    return Post.find({thread_num: num});
});

Meteor.publish("posts", function () {
    return Post.find({}, {sort: {num: -1}});
});

Meteor.publish("userInfo", function () {
    return UserInfo.find({ip: Meteor.getIP(this)});
});

Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId},
            {fields: {'other': 1, 'things': 1}});
    } else {
        this.ready();
    }
});

Meteor.publish("allUserData", function () {
    return Meteor.users.find({}, {fields: {'nested.things': 1}});
});



