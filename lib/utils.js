/**
 * Created by Rookie on 12.03.2017.
 */
Meteor.getIP = function(self) {
    if (Meteor.isClient)
        return headers.getClientIP();
    if (Meteor.isServer)
        return headers.methodClientIP(self);
    else
        return undefined;
};
