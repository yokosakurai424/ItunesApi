let template = null;

$(function() {
  
  $.get("../../card.html", function(temp) {
    template = $(temp);
  })

  $('#search-btn').on('click', function() {

    let searchWord = $('#search-word').val();

    let media = $('#media').text();

    $.ajax({
      url: 'https://itunes.apple.com/search',
      type: 'GET',
      dataType: 'jsonp',
      data: {
        term: searchWord,
        country: 'jp',
        media: media,
      },
    }).done( (data) => {

      $('#result').empty();

      if (data.results.length == 0) {
        $('#result').append($('<p>0件</p>'));
      }

      for (item of data.results) {
        
        let card = template.clone();
        card.find('img').attr('src', item.artworkUrl100.replace(/100/g, '600'));
        card.find('h5').text(item.collectionName);
        card.find('a').attr('href', item.collectionViewUrl);
        
        $('#result').append(card);
      }
    }).fail( (data) => {
      console.log(data);
    })
  });

  $('.dropdown-item').on('click', function() {
    let value = $(this).text();
    $('#media').text(value);
  });

});