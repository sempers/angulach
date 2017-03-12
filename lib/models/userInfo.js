/**
 * Created by Rookie on 08.03.2017.
 */
UserInfo = new Mongo.Collection("userInfo");

UserInfo.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return false;
    }
});

Meteor.methods({
    "userInfo.addFavorite": function (id) {
        var ip = Meteor.getIP(this);
        //Post.update({_id: id}, {$push: {favoritedBy: ip}});
        UserInfo.update({ip: ip}, {$addToSet: {favorites: id}})
    },
    "userInfo.removeFavorite": function (id) {
        var ip = Meteor.getIP(this);
        //Post.update({_id: id}, {$pull: {favoritedBy: ip}});
        UserInfo.update({ip: ip}, {$pull: {favorites: id}});
    },

    "userInfo.hideThread": function (id) {
        var ip = Meteor.getIP(this);
        //
        // Post.update({_id: id}, {$push: {hiddenBy: ip}});
        UserInfo.update({ip: ip}, {$addToSet: {hidden: id}});
    },
    "userInfo.showThread": function (id) {
        var ip = Meteor.getIP(this);
        //Post.update({_id: id}, {$pull: {hidden: ip}});
        UserInfo.update({ip: ip}, {$pull: {hidden: id}});
    }
});