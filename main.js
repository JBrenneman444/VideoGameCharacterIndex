$(()=>{

    // API Key = 8f5e4fe50eb930447615648aa359bbc0ab041539
        // To filter by name: &filter=name:[NAME]
        // to format data by JSON or XML: &format=JSON


        $('form').on('submit', (event)=>{

        var charName = ""

        $('.information').fadeIn(1000)

        var userInput = $('#characterInput').val()
        console.log("User typed: " + userInput)

        // clear fields
        $('#alias').html('<b>Alias</b>: <font color=grey>Loading...</font>')
        $('#birthday').html('<b>Birthday</b>: <font color=grey>Loading...</font>')
        $('#first').html('<b>First Game</b>: <font color=grey>Loading...</font>')
        $('#objects').html('<b>Related Objects</b>: <font color=grey>Loading...</font>')
        $('#friends').html('<b>Friends</b>: <font color=grey>Loading...</font>')
        $('#enemies').html('<b>Enemies</b>: <font color=grey>Loading...</font>')
        $('#description').html('<b>Description</b>: <font color=grey>Loading...</font>')

        event.preventDefault();

        ///////////////////////////////////////
        // FIRST AJAX request
        $.ajax({
            url:`https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/characters/?api_key=8f5e4fe50eb930447615648aa359bbc0ab041539&format=JSON&filter=name:${userInput}`,
            type: "GET",
            dataType: "JSON",
            data: {
            "$limit" : 1
            }

        }).then(
            (data)=>{
                
                // TODO: Loop through various names (if more than one match) and prefer EXACT MATCH
                var exactMatch
                var characterArray = data.results
                    for (i=0;i<characterArray.length;i++) {
                        if (userInput === characterArray[i].name) {
                            // then use THESE RESULTS for rest of information

                            break;
                        } else {
                            // display FIRST name
                        }
                    }

                // TODO: figure out how to make name transition smoother.
                    // for some reason, it doesn't fade in properly within AJAX call
                    // POTENTIAL SOLUTION: just have it fade in WHATEVER USER INPUT IS (even if faulty spelling)
                    
                $('#characterName').html(data.results[0].name).css('color','ivory').fadeIn(1000)

                $('#alias').html('<b>Alias</b>: ') // TODO: see if can figure out way to identify several aliases
                $('#birthday').html('<b>Birthday</b>: ')
                $('#first').html('<b>First Game</b>: ')
                $('#description').html('<b>Description</b>: ')

                var characterIDNumber = data.results[0].guid

                $('#character-img').text("")
                var characterImage = data.results[0].image.super_url
                $('#character-img').css(`background-image`,`url(${characterImage})`)
                $('#character-img').css("background-size","contain")
                $('#character-img').css("background-repeat","no-repeat")
                $('#character-img').css("background-position","center")


                /////////////////////////////////////////////////////////////
                // TODO: If search returns NULL, make it appear as "Unknown"
                /////////////////////////////////////////////////////////////

                var aliasLabel = $('#alias').text()
                $('#alias').html('<b>' + aliasLabel + '</b>' + data.results[0].aliases)

                var bdayLabel = $('#birthday').text()
                $('#birthday').html('<b>' + bdayLabel + '</b>' + data.results[0].birthday)

                var firstLabel = $('#first').text()
                $('#first').html('<b>' + firstLabel + '</b>' + data.results[0].first_appeared_in_game.name)

                var descriptionLabel = $('#description').text()
                $('#description').html('<b>' + descriptionLabel + '</b>' + data.results[0].deck)

                console.log(data)

                ///////////////////////////////////////
                // SECOND AJAX CALL
                $.ajax({
                    url:`https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/character/${characterIDNumber}/?api_key=8f5e4fe50eb930447615648aa359bbc0ab041539&format=JSON`, // plug in Character GUID  into template literal
                    type: "GET",
                    dataType: "JSON",
                    data: {
                    "$limit" : 1
                    }
        
                }).then(
                    (data)=>{
                            
                    console.log(data)

                    $('#objects').html('<b>Related Objects</b>: ')
                    $('#friends').html('<b>Friends</b>: ')
                    $('#enemies').html('<b>Enemies</b>: ')

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

                    },
                    ()=>{

                        console.log('bad');
                    }
                    ); // end of 2ND AJAX


    
                }) // end of 1ST AJAX




            }) // end of FORM SUBMIT

})