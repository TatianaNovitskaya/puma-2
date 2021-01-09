$(document).ready(function () {


    function tomorowDate() {
        var d = new Date();
        var mm = d.getMonth()+1;
        var dd = d.getDate()+1;
        var yy = d.getFullYear();
var tomorrowDay = roundZero(dd) + "."+ roundZero(mm) +"."+ yy;
        var currentDay = document.querySelectorAll('.js__tomorrow');
        currentDay.forEach(function(item){
            item.innerHTML = tomorrowDay;
        });

    }
    tomorowDate();

    function roundZero(num){
        return num < 10 ? "0"+num : num;
    }

});