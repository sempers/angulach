Meteor.startup(function () {
    //clean database
    Post.remove({num: NaN});
    Post.update({commentsCount: {$exists: false}}, {$set: {commentsCount: 0}});
    Post.update({rating: {$exists: false}}, {$set: {rating: 0}});

    if(Meteor.users.find().count() === 0) {
        Accounts.createUser({
            username: 'admin',
            email: 'groddenator@gmail.com',
            password: 'huibhean1',
            profile: {
                name: 'Admin'
            }
        });
    }

});

Meteor.onConnection(function (connection) {
    var ip = connection.clientAddress;
    if (!UserInfo.findOne({ip: ip})) {
        UserInfo.insert({
            ip: ip,
            favorites: [],
            hidden: []
        });
    }
});
