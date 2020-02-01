$(()=>{

    /////////////////////////////////////////////////////////////
    // JSON method


    $('#characterSubmit').on('click', (event)=>{

        $.ajax({
            url:'https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/character/3005-10/?api_key=8f5e4fe50eb930447615648aa359bbc0ab041539&format=JSON',
            type: "GET",
            dataType: "JSON",
            data: {
            "$limit" : 1
            }

        }).then(
            (data)=>{

                $('.testAJAX').html(data.results.aliases + "<br>")
                
                var wolverineIMG = data.results.image.screen_large_url
                $('<img>').attr("src",wolverineIMG).appendTo(".testAJAX")

                console.log(data)
                

                // RESPONSE is the ONLY child of #document
                // RESULTS is 6 in the RESPONSE ARRAY
                // GENDER is 13 in the RESULTS ARRAY
            },
            ()=>{

                console.log('bad');
            }
        );

    
    })


//////////////////////////////////////////////////////////////////////
// XML method

// $('#characterSubmit').on('click', (event)=>{

//     $.ajax({
//         type: "GET",
//         url: "https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/character/3005-10/?api_key=8f5e4fe50eb930447615648aa359bbc0ab041539",
//         dataType: "xml",
//         success: xmlParser
//        });
        
//     function xmlParser(xml) {
        
//     var aliases = $(xml).find("aliases").text()
    
//         console.log(aliases)
    
//     }
    
// })





// CODE to CONSIDER for APPENDING to website:

        // $(".main").append('<div class="book"><div class="title">' + $(this).find("Title").text() +   '</div><div class="description">' + $(this).find("Description").text() + '</div><div   class="date">Published ' + $(this).find("Date").text() + '</div></div>');
        // $(".book").fadeIn(1000);

})