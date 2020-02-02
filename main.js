$(()=>{

    /////////////////////////////////////////////////////////////
    // JSON method


    $('#characterSubmit').on('click', (event)=>{
        
        $.ajax({
            url:'https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/character/3005-10/?api_key=8f5e4fe50eb930447615648aa359bbc0ab041539&format=JSON',
            type: "GET",
            dataType: "JSON",
            data: {
            "$limit" : 5
            }

        }).then(
            (data)=>{
                console.log(data)

                $('#character-img').text("")
                var characterImage = data.results.image.screen_large_url
                $('#character-img').css(`background-image`,`url(${characterImage})`)
                $('#character-img').css("background-size","contain")
                $('#character-img').css("background-repeat","no-repeat")
                $('#character-img').css("background-position","center")

                $('#characterName').html(data.results.name)

                var aliasLabel = $('#alias').text()
                $('#alias').html('<b>' + aliasLabel + '</b>' + data.results.aliases)

                var bdayLabel = $('#birthday').text()
                $('#birthday').html('<b>' + bdayLabel + '</b>' + data.results.birthday)

                var objectsArray = data.results.objects
                for (i=0;i<objectsArray.length;i++) {
                    if (i == 0) {
                        // grab the text
                        var objectsLabel = $('#objects').html()
                        // add the text
                        $('#objects').html('<b>' + objectsLabel + '</b>' + data.results.objects[i].name)
                    } else if (i > 0) {
                        // grab the text
                        var objectsLabel = $('#objects').html()
                        // add the text
                        $('#objects').html(objectsLabel + ", " + data.results.objects[i].name)
                    }
                }

                var friendsArray = data.results.friends
                for (i=0;i<friendsArray.length;i++) {
                    if (i == 0) {
                        // grab the text
                        var friendsLabel = $('#friends').html()
                        // add the text
                        $('#friends').html('<b>' + friendsLabel + '</b>' + data.results.friends[i].name)
                    } else if (i > 0) {
                        // grab the text
                        var friendsLabel = $('#friends').html()
                        // add the text
                        $('#friends').html(friendsLabel + ", " + data.results.friends[i].name)
                    }
                }

                var enemiesArray = data.results.enemies
                for (i=0;i<enemiesArray.length;i++) {
                    if (i == 0) {
                        // grab the text
                        var enemiesLabel = $('#enemies').html()
                        // add the text
                        $('#enemies').html('<b>' + enemiesLabel + '</b>' + data.results.enemies[i].name)
                    } else if (i > 0) {
                        // grab the text
                        var enemiesLabel = $('#enemies').html()
                        // add the text
                        $('#enemies').html(enemiesLabel + ", " + data.results.enemies[i].name)
                    }
                }

                // var friendsLabel = $('#friends').text()
                // $('#friends').html('<b>' + friendsLabel + '</b>' + data.results.aliases)
                
                
                //         <li id="enemies"><b>Enemies</b>: </li>
                //         <li id="summary"><b>Summary</b>: </li>

                // RESPONSE is the ONLY child of #document
                // RESULTS is 6 in the RESPONSE ARRAY
                // GENDER is 13 in the RESULTS ARRAY
            },
            ()=>{

                console.log('bad');
            }
        );

    
    })

// CODE to CONSIDER for APPENDING to website:

        // $(".main").append('<div class="book"><div class="title">' + $(this).find("Title").text() +   '</div><div class="description">' + $(this).find("Description").text() + '</div><div   class="date">Published ' + $(this).find("Date").text() + '</div></div>');
        // $(".book").fadeIn(1000);

})