$(()=>{

    // API Key = 8f5e4fe50eb930447615648aa359bbc0ab041539
        // To filter by name: &filter=name:[NAME]
        // to format data by JSON or XML: &format=JSON

    // focuses on text field, as soon as page loads

    $("#characterInput").focus();


    $('form').on('submit', (event)=>{

        if ($('#characterInput').val() !== "") {

            $('#character-bg').fadeIn(1000).css('display','flex')

            $('.information').fadeIn(2000)

            var userInput = $('#characterInput').val()
            console.log("User typed: " + userInput)

            // TODO: if CHARACTER NOT FOUND, add functionality that:
                //  says "Character not found","Try another" etc.
                // clear previous name, if there    
                // clear old image, if there

            // clear fields
            $('#alias').html('<span>Alias</span>: <font color=grey>Searching...</font>')
            $('#birthday').html('<span>Birthday</span>: <font color=grey>Searching...</font>')
            $('#first').html('<span>First appeared in the game</span>: <font color=grey>Searching...</font>')
            $('#objects').html('<span>Related Objects</span>: <font color=grey>Searching...</font>')
            $('#friends').html('<span>Friends</span>: <font color=grey>Searching...</font>')
            $('#enemies').html('<span>Enemies</span>: <font color=grey>Searching...</font>')
            $('#description').html('<span>Description</span>: <font color=grey>Searching...</font>')

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
                        // Loop through various names (if more than one match) and filter by EXACT MATCH
                        var exactCharacter = data.results.filter(searched => searched.name === userInput);
                        console.log(exactCharacter)

                    // TODO: figure out how to make name transition smoother.
                        // PROBLEM: for some reason, it doesn't fade in properly within AJAX call
                        // POTENTIAL SOLUTION: just have it fade in WHATEVER USER INPUT IS (even if faulty spelling)
                        
                    $('#characterName').html(exactCharacter[0].name).css('color','ivory').css('text-shadow','2px 2px 5px rgb(39, 115, 255)').fadeIn(1000)

                    $('#alias').html('<span>Alias</span>: ') // TODO: see if can figure out way to identify several aliases
                    $('#birthday').html('<span>Birthday</span>: ')
                    $('#first').html('<span>First appeared in the game</span>: ')
                    $('#description').html('<span>Description</span>: ')

                    var characterIDNumber = exactCharacter[0].guid

                    $('#character-img').text("")
                    var characterImage = exactCharacter[0].image.super_url
                    $('#character-img').css(`background-image`,`url(${characterImage})`)
                    $('#character-img').css("background-size","contain")
                    $('#character-img').css("background-repeat","no-repeat")
                    $('#character-img').css("background-position","center")


                    var aliasLabel = $('#alias').text()
                    if (exactCharacter[0].aliases !== null) {
                        $('#alias').html('<span>' + aliasLabel + '</span>' + exactCharacter[0].aliases)
                    } else {
                        $('#alias').html('<span>' + aliasLabel + '</span> Unknown')
                    }

                    var bdayLabel = $('#birthday').text()
                    if (exactCharacter[0].birthday !== null) {
                        $('#birthday').html('<span>' + bdayLabel + '</span>' + exactCharacter[0].birthday)
                    } else {
                        $('#birthday').html('<span>' + bdayLabel + '</span> Unknown')
                    }

                    var firstLabel = $('#first').text()
                    if (exactCharacter[0].first_appeared_in_game.name !== null) {
                        $('#first').html('<span>' + firstLabel + '</span>' + exactCharacter[0].first_appeared_in_game.name)
                    } else {
                        $('#first').html('<span>' + firstLabel + '</span> Unknown')
                    }

                    var descriptionLabel = $('#description').text()
                    if (exactCharacter[0].deck !== null) {
                        $('#description').html('<span>' + descriptionLabel + '</span>' + exactCharacter[0].deck)
                    } else {
                        $('#description').html('<span>' + descriptionLabel + '</span> Unknown')
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

                        $('#objects').html('<span>Related Objects</span>: ')
                        $('#friends').html('<span>Friends</span>: ')
                        $('#enemies').html('<span>Enemies</span>: ')

                        var objectsArray = data.results.objects
                        for (i=0;i<objectsArray.length;i++) {
                            if (i == 0) {
                                // grab the text
                                var objectsLabel = $('#objects').html()
                                // add the text
                                $('#objects').html('<span>' + objectsLabel + '</span>' + data.results.objects[i].name)
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
                                $('#friends').html('<span>' + friendsLabel + '</span>' + data.results.friends[i].name)
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
                                $('#enemies').html('<span>' + enemiesLabel + '</span>' + data.results.enemies[i].name)
                            } else if (i > 0) {
                                // grab the text
                                var enemiesLabel = $('#enemies').html()
                                // add the text
                                $('#enemies').html(enemiesLabel + ", " + data.results.enemies[i].name)
                            }
                        }

                        },
                        ()=>{

                            console.log('bad request');
                        }
                        ); // end of 2ND AJAX


        
                    }) // end of 1ST AJAX




        

        } else {

        }

    }) // end of FORM SUBMIT

        

})