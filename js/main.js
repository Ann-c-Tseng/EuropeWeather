var cityArray = [];

$(document).ready(function(){
        $.ajax({
            url:"city_coordinates.csv",
            dataType:"text",
            success:function(data)
            {
                var preliminaryCityArray = data.split("\n");
                var numCities = preliminaryCityArray.length-1;
                var index = 0;
                for(var count = 1; count <= numCities; count++) {
                    var cityArr = preliminaryCityArray[count].split(",");
                    cityArr[0] = parseFloat(cityArr[0]);
                    cityArr[1] = parseFloat(cityArr[1]);
                    cityArray[index] = cityArr;
                    index++;
                }

                var elSelect = document.getElementById('citySelectElement');
                for(var count2 = 0; count2 < numCities; count2++) {
                        elSelect.innerHTML = elSelect.innerHTML + 
                        '<option value="' + count2 + '">' + cityArray[count2][2] + ', ' + cityArray[count2][3] + '</option>';
                }
            }
        })

        $('#citySelectElement').change(function() {
            var selectedOptionArray = cityArray[$(this).find(":selected").val()];
            // console.log(selectedOptionArray);
            var latitude = selectedOptionArray[0];
            var longitude = selectedOptionArray[1];
            var url = 'http://www.7timer.info/bin/api.pl?lon=' + longitude + '&lat=' + latitude + '&product=civillight&output=json';
            var elCardsDiv = document.getElementById('weeklyCardElements');

            $.getJSON(url, function(data) {
                // console.log(data.dataseries);
                for(var count3 = 0; count3 < data.dataseries.length; count3++) {
                    var date = data.dataseries[count3].date.toString();
                    var weather = data.dataseries[count3].weather;
                    var tempMax = data.dataseries[count3].temp2m.max;
                    var tempMin = data.dataseries[count3].temp2m.min;
                    // console.log(date + " | " + weather + " | " + tempMax + " | " + tempMin);
                    elCardsDiv.innerHTML = elCardsDiv.innerHTML +
                    '<div class="card" id="card'+ count3 + '"></div>';

                    var month = date.slice(4, 6)
                    var day = date.slice(6, 8)
                    var year = date.slice(0, 4)

                    //Find corresponding weather image
                    var imgUrl = "";
                    console.log(weather);
                    var weatherDisc = "";

                    if(weather === "clear") {
                        weatherDisc = "Clear";
                        imgUrl = "clear.png";
                    } else if(weather === "cloudy") {
                        weatherDisc = "Cloudy";
                        imgUrl = "cloudy.png";
                    } else if(weather === "fog") {
                        weatherDisc = "Foggy";
                        imgUrl = "fog.png";
                    } else if(weather === "humid") {
                        weatherDisc = "Humid";
                        imgUrl = "humid.png";
                    } else if(weather === "ishower") {
                        weatherDisc = "Isolated Showers";
                        imgUrl = "ishower.png";
                    } else if(weather === "lightrain") {
                        weatherDisc = "Light Rain";
                        imgUrl = "lightrain.png";
                    } else if(weather === "lightsnow") {
                        weatherDisc = "Light Snow";
                        imgUrl = "lightsnow.png";
                    } else if(weather === "mcloudy") {
                        weatherDisc = "Mostly Cloudy";
                        imgUrl = "mcloudy.png";
                    } else if(weather === "oshower") {
                        weatherDisc = "Occasional Showers";
                        imgUrl = "oshower.png";
                    } else if(weather === "pcloudy") {
                        weatherDisc = "Partly Cloudy";
                        imgUrl = "pcloudy.png";
                    } else if(weather === "rain") {
                        weatherDisc = "Rainy";
                        imgUrl = "rain.png";
                    } else if(weather === "rainsnow") {
                        weatherDisc = "Rain & Snow";
                        imgUrl = "rainsnow.png";
                    } else if(weather === "snow") {
                        weatherDisc = "Snowy";
                        imgUrl = "snow.png";
                    } else if(weather === "tsrain") {
                        weatherDisc = "Thunder & Rain";
                        imgUrl = "tsrain.png";
                    } else if(weather === "tstorm") {
                        weatherDisc = "Thunderstorm"
                        imgUrl = "tstorm.png";
                    } else { //windy
                        weatherDisc = "Windy"
                        imgUrl = "windy.png";
                    }
                    // console.log(imgUrl);

                    // console.log(month + " | " + day + " | " + year);
                    $('#card'+count3).append('<p class="dateText">' + month + ' ' + day + ' ' + year + '</p>');
                    if(imgUrl != "windy.png") {
                        $('#card'+count3).append('<img class="weatherImg" src="images/' + imgUrl + '" alt="weather icon" width="130" height="65"/>');
                    } else {
                        $('#card'+count3).append('<img class="windyWeatherImg" src="images/' + imgUrl + '" alt="weather icon" width="65" height="65"/>');
                    }
                    $('#card'+count3).append('<p class="weatherText">' + weatherDisc + '</p>');
                    $('#card'+count3).append('<p class="tempMaxText"> Max: ' + tempMax + '°C </p>');
                    $('#card'+count3).append('<p class="tempMinText"> Min: ' + tempMin + '°C </p>');
                }
            })

            //Remove past innerHTML cards if chosen a new city option.
            if(elCardsDiv.children.length){
                $('#weeklyCardElements').empty();
            } 
        })
})