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
            var url = 'http://www.7timer.info/bin/api.pl?lon=' + longitude + '&lat=' + latitude + '&product=civillight&output=json'
            $.getJSON(url, function(data) {
                // console.log(data.dataseries);
                for(var count3 = 0; count3 < data.dataseries.length; count3++) {
                    var date = data.dataseries[count3].date;
                    var weather = data.dataseries[count3].weather;
                    var tempMax = data.dataseries[count3].temp2m.max;
                    var tempMin = data.dataseries[count3].temp2m.min;
                    // console.log(date + " | " + weather + " | " + tempMax + " | " + tempMin);
                }
            })
        })
})

// console.log(cityArray);