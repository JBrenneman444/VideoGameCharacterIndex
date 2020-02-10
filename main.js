$(()=>{

    // API Key = 8f5e4fe50eb930447615648aa359bbc0ab041539
        // To filter by name: &filter=name:[NAME]
        // to format data by JSON or XML: &format=JSON
        // to limit responses: &limit=[NUMBER]
        // to limit to certain FIELDS: &field_list=[FIELD]
        // GENRE: &filter=genres:[GUID for GENRE]

        // for pulling multiple images (this LIMITS to 10 and ONLY SHOWS "Original_URL"):
            // https://www.giantbomb.com/api/images/[CHARACTER GUID]/?api_key=8f5e4fe50eb930447615648aa359bbc0ab041539&limit=10&field_list=original_url

            // OFFICIAL ART
            // https://www.giantbomb.com/api/images/3005-191/?api_key=8f5e4fe50eb930447615648aa359bbc0ab041539&filter=image_tag:Official+Art

            // https://www.giantbomb.com/api/images/3005-191/?api_key=8f5e4fe50eb930447615648aa359bbc0ab041539&filter=image_tag:Official+Art&field_list=original_url

            // results.image_tags[7].name --> if I want to pull during 2ndf AJAX

            // TODO: Set up so user can choose Official Art, Fan Art, etc.
            // TODO: Look into why KRYSTAL's (and others) images don't load

    var characterImage1
    var characterImage2
    var characterImage3
    var characterImage4
    var characterImage5
    var characterImage6
    var characterImage7
    var characterImage8
    var characterImage9
    var characterImage10

    // focuses on text field, as soon as page loads
    $("#characterInput").focus();

    // sets first image to "1"
    var slideIndex = 1;

    // got this code working but do not like the way w3schools wrote it!
    function showSlides(n) {
        var i;
        var slides = $(".mySlides");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
      }
    showSlides(slideIndex); // shows first image in array

    // NEXT arrow event listener
    $('.next').on('click', (event)=>{
        showSlides(slideIndex += 1);
    })

    // PREV arrow event listener
    $('.prev').on('click', (event)=>{
        showSlides(slideIndex -= 1);
    })

    // form event listener
    $('form').on('submit', (event)=>{

        if ($('#characterInput').val() !== "") {

            $('#artworkCredit').fadeOut(1000)

            $('#character-bg').fadeIn(1000).css('display','flex')

            $('.information').fadeIn(2000)

            $('#img-container').hide()

            var userInput = $('#characterInput').val()
            console.log("User typed: " + userInput)

            // TODO: if CHARACTER NOT FOUND, add functionality that:
                //  says "Character not found","Try another" etc.
                // clear previous name, if there    
                // clear old image, if there

            // clear fields, show "Searching"
            $('#alias').html('<span>Alias</span>: <font color=grey>Searching...</font>')
            $('#birthday').html('<span>Birthday</span>: <font color=grey>Searching...</font>')
            $('#first').html('<span>First appeared in the game</span>: <font color=grey>Searching...</font>')
            $('#games').html('<span>Games</span>: <font color=grey>Searching...</font>')
            $('#objects').html('<span>Related Objects</span>: <font color=grey>Searching...</font>')
            $('#friends').html('<span>Friends</span>: <font color=grey>Searching...</font>')
            $('#enemies').html('<span>Enemies</span>: <font color=grey>Searching...</font>')
            $('#description').html('<span>Description</span>: <font color=grey>Searching...</font>')

            event.preventDefault();

            ///////////////////////////////////////
            // FIRST AJAX request
            $.ajax({ // first AJAX pulls from CHARACTERS resource
                url:`https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/characters/?api_key=8f5e4fe50eb930447615648aa359bbc0ab041539&format=JSON&filter=name:${userInput}`,
                type: "GET",
                dataType: "JSON",
                data: {
                "$limit" : 1
                }

            }).then(
                (data)=>{
                    
                    // PROBLEM: Sometimes search loads a non-EXACT MATCH (ex. "bLINKy" instead of "LINK")
                        // TODO: Loop through various names (if more than one match) and filter by EXACT MATCH
                        // SOLUTION: use Filter to create array ONLY with exact match of userInput
                            // convert to LOWER CASE, first, so user cant mess up case
                        var exactCharacter = data.results.filter(searched => searched.name === userInput);
                        console.log(exactCharacter)

                    // PROBLEM: for some reason, it doesn't fade in properly within AJAX call
                        // TODO: figure out how to make name transition smoother.
                            // POTENTIAL SOLUTION: just have it fade in WHATEVER USER INPUT IS (even if faulty spelling)
                        
                    $('#characterName').html(exactCharacter[0].name).css('color','ivory').css('text-shadow','2px 2px 5px rgb(39, 115, 255)').fadeIn(1000)

                    $('#alias').html('<span>Alias</span>: ') // TODO: see if can figure out way to identify several aliases
                    $('#birthday').html('<span>Birthday</span>: ')
                    $('#first').html('<span>First appeared in the game</span>: ')
                    $('#description').html('<span>Description</span>: ')

                    var characterIDNumber = exactCharacter[0].guid

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
                    $.ajax({ // second AJAX pulls from CHARACTER resource
                        url:`https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/character/${characterIDNumber}/?api_key=8f5e4fe50eb930447615648aa359bbc0ab041539&format=JSON`,
                        type: "GET",
                        dataType: "JSON",
                        data: {
                        "$limit" : 1
                        }
            
                    }).then(
                        (data)=>{
                                
                        console.log("2ND AJAX:")
                        console.log(data)

                        // clear fields to make space for NEW character's info
                        $('#games').html('<span class="tooltip">Games</span>: ')
                            var $tooltip = $('<span>')
                            $tooltip.addClass('tooltiptext')
                            $('.tooltip').append($tooltip)
                        $('#objects').html('<span>Related Objects</span>: ')
                        $('#friends').html('<span>Friends</span>: ')
                        $('#enemies').html('<span>Enemies</span>: ')

                        var gamesArray = data.results.games
                        for (i=0;i<20;i++) {
                            if (i == 0) {
                                // grab the text
                                var gamesLabel = $('#games').html()
                                // add the text
                                $('#games').html('<span>' + gamesLabel + '</span>' + data.results.games[i].name)
                            } else if (i == 19) {
                                var gamesLabel = $('#games').html()
                                $('#games').html(gamesLabel + ", " + data.results.games[i].name + "<span class='dotdotdot'>. . .</span>")
                            } else if (i > 0) {
                                var gamesLabel = $('#games').html()
                                $('#games').html(gamesLabel + ", " + data.results.games[i].name)
                            }
                        }

                        var gameCount = data.results.games.length
                        $('.tooltiptext').text(gameCount)


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


                            ///////////////////////////////////////
                            // THIRD AJAX CALL
                            $.ajax({ // third AJAX pulls from IMAGES resource
                                url:`https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/images/${characterIDNumber}/?api_key=8f5e4fe50eb930447615648aa359bbc0ab041539&format=JSON&field_list=original_url`,
                                type: "GET",
                                dataType: "JSON",
                                data: {
                                "$limit" : 1
                                }
                    
                            }).then(
                                (data)=>{
                                        
                                console.log("3RD AJAX:")
                                console.log(data)
                                
                                var characterImageData = data.results

                                characterImage1 = characterImageData[0].original_url
                                characterImage2 = characterImageData[1].original_url
                                characterImage3 = characterImageData[2].original_url
                                characterImage4 = characterImageData[3].original_url
                                characterImage5 = characterImageData[4].original_url
                                characterImage6 = characterImageData[5].original_url
                                characterImage7 = characterImageData[6].original_url
                                characterImage8 = characterImageData[7].original_url
                                characterImage9 = characterImageData[8].original_url
                                characterImage10 = characterImageData[9].original_url
                                
                                slideIndex = 1;
                                $('#image1').css(`background-image`,`url(${characterImage1})`)
                                $('#image1').css("background-size","contain")
                                $('#image1').css("background-repeat","no-repeat")
                                $('#image1').css("background-position","center")
                                showSlides(slideIndex);
                                $('#img-container').show()



                                $('#image2').css(`background-image`,`url(${characterImage2})`)
                                $('#image2').css("background-size","contain")
                                $('#image2').css("background-repeat","no-repeat")
                                $('#image2').css("background-position","center")

                                $('#image3').css(`background-image`,`url(${characterImage3})`)
                                $('#image3').css("background-size","contain")
                                $('#image3').css("background-repeat","no-repeat")
                                $('#image3').css("background-position","center")

                                $('#image4').css(`background-image`,`url(${characterImage4})`)
                                $('#image4').css("background-size","contain")
                                $('#image4').css("background-repeat","no-repeat")
                                $('#image4').css("background-position","center")

                                $('#image5').css(`background-image`,`url(${characterImage5})`)
                                $('#image5').css("background-size","contain")
                                $('#image5').css("background-repeat","no-repeat")
                                $('#image5').css("background-position","center")

                                $('#image6').css(`background-image`,`url(${characterImage6})`)
                                $('#image6').css("background-size","contain")
                                $('#image6').css("background-repeat","no-repeat")
                                $('#image6').css("background-position","center")

                                $('#image7').css(`background-image`,`url(${characterImage7})`)
                                $('#image7').css("background-size","contain")
                                $('#image7').css("background-repeat","no-repeat")
                                $('#image7').css("background-position","center")

                                $('#image8').css(`background-image`,`url(${characterImage8})`)
                                $('#image8').css("background-size","contain")
                                $('#image8').css("background-repeat","no-repeat")
                                $('#image8').css("background-position","center")

                                $('#image9').css(`background-image`,`url(${characterImage9})`)
                                $('#image9').css("background-size","contain")
                                $('#image9').css("background-repeat","no-repeat")
                                $('#image9').css("background-position","center")

                                $('#image10').css(`background-image`,`url(${characterImage10})`)
                                $('#image10').css("background-size","contain")
                                $('#image10').css("background-repeat","no-repeat")
                                $('#image10').css("background-position","center")


                                },
                                ()=>{

                                    console.log('bad request');
                                }
                                ); // end of 3RD AJAX


                        },
                        ()=>{

                            console.log('bad request');
                        }
                        ); // end of 2ND AJAX


        
                    }) // end of 1ST AJAX




        

        } else {
            // do NOTHING because User didn't enter a name
        }

    }) // end of FORM SUBMIT

        

})