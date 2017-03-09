Meteor.startup(function () {
    Post.remove({num: NaN});
    Post.update({commentsCount: {$exists: false}}, {$set: {commentsCount: 0}});
    Post.update({rating: {$exists: false}}, {$set: {rating: 0}});
    Post.update({favoritedBy: {$exists: false}}, {$push: {favoritedBy: "0.0.0.0"}});
    Post.update({hiddenBy: {$exists: false}}, {$push: {hiddenBy: "0.0.0.0"}});
});

Meteor.onConnection(function (connection) {
    var ip = connection.clientAddress;
    if (!UserInfo.findOne({ip: ip})) {
        UserInfo.insert({
            ip: ip,
            favorites: [],
            hidden: []
        });
    };
    /*Meteor.publish("myInfo", function() {
        return UserInfo.find({
            ip: ip
        });
    });*/
});
