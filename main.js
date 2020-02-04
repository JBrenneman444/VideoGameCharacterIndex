$(()=>{

    // API Key = 8f5e4fe50eb930447615648aa359bbc0ab041539
        // To filter by name: &filter=name:[NAME]
        // to format data by JSON or XML: &format=JSON

    // focuses on text field, as soon as page loads

    $("#characterInput").focus();

    $('form').on('submit', (event)=>{

        $('#character-bg').fadeIn(1000).css('display','flex')

        $('.information').fadeIn(2000)

        var userInput = $('#characterInput').val()
        console.log("User typed: " + userInput)

        // TODO: if CHARACTER NOT FOUND, add functionality that says "Character not found", etc.

        // clear fields
        $('#alias').html('<b>Alias</b>: <font color=grey>Loading...</font>')
        $('#birthday').html('<b>Birthday</b>: <font color=grey>Loading...</font>')
        $('#first').html('<b>First appeared in the game</b>: <font color=grey>Loading...</font>')
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
                
                // PROBLEM: Sometimes search loads a non-EXACT MATCH (ex. "bLINKy" instead of "LINK")
                    // TODO: Loop through various names (if more than one match) and prefer EXACT MATCH
                    // TODO: might have to put ALL of code inside this IF STATEMENT
                        var exactMatch
                        var characterArray = data.results
                            for (i=0;i<characterArray.length;i++) {
                                if (userInput === characterArray[i].name) {
                                    // then use THESE RESULTS for rest of information
                                    exactMatch = characterArray[i]
                                    break;
                                } else {
                                    // display FIRST name
                                }
                            }

                // TODO: figure out how to make name transition smoother.
                    // PROBLEM: for some reason, it doesn't fade in properly within AJAX call
                    // POTENTIAL SOLUTION: just have it fade in WHATEVER USER INPUT IS (even if faulty spelling)
                    
                $('#characterName').html(data.results[0].name).css('color','ivory').css('text-shadow','2px 2px 5px rgb(39, 115, 255)').fadeIn(1000)

                $('#alias').html('<b>Alias</b>: ') // TODO: see if can figure out way to identify several aliases
                $('#birthday').html('<b>Birthday</b>: ')
                $('#first').html('<b>First appeared in the game</b>: ')
                $('#description').html('<b>Description</b>: ')

                var characterIDNumber = data.results[0].guid

                $('#character-img').text("")
                var characterImage = data.results[0].image.super_url
                $('#character-img').css(`background-image`,`url(${characterImage})`)
                $('#character-img').css("background-size","contain")
                $('#character-img').css("background-repeat","no-repeat")
                $('#character-img').css("background-position","center")


                var aliasLabel = $('#alias').text()
                if (data.results[0].aliases !== null) {
                    $('#alias').html('<b>' + aliasLabel + '</b>' + data.results[0].aliases)
                } else {
                    $('#alias').html('<b>' + aliasLabel + '</b> Unknown')
                }

                var bdayLabel = $('#birthday').text()
                if (data.results[0].birthday !== null) {
                    $('#birthday').html('<b>' + bdayLabel + '</b>' + data.results[0].birthday)
                } else {
                    $('#birthday').html('<b>' + bdayLabel + '</b> Unknown')
                }

                var firstLabel = $('#first').text()
                if (data.results[0].first_appeared_in_game.name !== null) {
                    $('#first').html('<b>' + firstLabel + '</b>' + data.results[0].first_appeared_in_game.name)
                } else {
                    $('#first').html('<b>' + firstLabel + '</b> Unknown')
                }

                var descriptionLabel = $('#description').text()
                if (data.results[0].deck !== null) {
                    $('#description').html('<b>' + descriptionLabel + '</b>' + data.results[0].deck)
                } else {
                    $('#description').html('<b>' + descriptionLabel + '</b> Unknown')
                }

                console.log("1ST AJAX:")
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
                            
                    console.log("2ND AJAX:")
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