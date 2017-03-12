/**
 * Created by Rookie on 12.03.2017.
 */
angular.module('Angulach').factory('Boards', function () {
    var BOARDS = [
        {
            name: "",
            title: "Аноним",
            img: "anonymous.png"
        },
        {
            name: "2ch.ru",
            title: "Двач",
            img: "2ch.ru.png"
        },
        {
            name: "2ch.hk",
            title: "2ch.hk",
            img: "2ch.so.png"
        },
        {
            name: "0chan.hk",
            title: "Нульчан",
            img: "0chan.ru.png"
        },
        {
            name: "iichan.hk",
            title: "Иичан",
            img: "iichan.ru.png"
        },
        {
            name: "iichan.hk/b",
            title: "Сырно",
            img: "iichan.ru_b.png"
        },
        {
            name: "dobrochan.com",
            title: "Доброчан",
            img: "dobrochan.ru.png"
        },
        {
            name: "kremlin.ru",
            title: "Пидорашки",
            img: "russ.png"
        }
    ];

    return {
        get: function (name) {
            return _.findWhere(BOARDS, {name: name}) || {
                    name: "",
                    title: "Аноним",
                    img: "anonymous.png"
                };
        },
        all: function () {
            return BOARDS;
        },
        img: function(name){
            var root = "https://1chan.ca/ico/homeboards/";
            if (this.get(name)){
                return root + this.get(name).img;
            } else {
                return root + "anonymous.png";
            }
        }
    };
});