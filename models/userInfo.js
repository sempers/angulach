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

