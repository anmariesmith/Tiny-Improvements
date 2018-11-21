 
  const getKudos = function () {
    $.get(`/api/kudo/`)
      .then(function (data) {
        renderKudos(data)
      });
  }

const renderKudos = function (kudos) {
    $('#kudos').empty();
  
   
    for (let i = 0; i < kudos.length; i++) {
      $('#kudos')
        .append(
        `<div class='card card-kudos'>
            <h5>${kudos[i].title}</h5>
            <hr>
          <div class='card-body'>
          <h6>
            To: ${kudos[i].to[0].name}</h6>
            <p class="kudosNote">${kudos[i].body}</p>
            <h6>From:${kudos[i].from[0].name}
          </h6>
          </div>
        </div>`
        );
    }
  }

  
  
 
  

  const getUsers = function () {
    $.get(`/api/user`)
      .then(function (data) {
  
        for (let i = 0; i < data.length; i++) {
          $('#kudo-from')
            .append(`<option value='${data[i]._id}'>${data[i].name}</option>`)
  
          $('#kudo-to')
          .append(`<option value='${data[i]._id}'>${data[i].name}</option>`)
        }
      });
  }
  
  
  const addKudo = function (e) {
    e.preventDefault();
    $('#messages').empty();
    const to= $('#kudo-from').val();
    const from= $('#kudo-to').val();
  
    if( to && from){
      const kudo = {
        title: $('#kudo-title').val().trim(),
        body: $('#kudo-body').val().trim(),
        from: $('#kudo-from').val(),
        to: $('#kudo-to').val()
      }

      $.post('/api/kudo', kudo)
        .then(function (data) {
          $('#kudo-title').val('');
          $('#kudo-body').val('');
          $('#kudo-from').val('');
          $('#kudo-to').val('');
  
          $('.modal').modal('hide');
          getKudos();
        }).fail(function (err) {
          $('#messages').append(`<div class='alert alert-danger'>There was an error with your submission. Please try again.</div>`)
        })
      } else {
        $('#messages').append(`<div class='alert alert-danger'>Please select both a sender and receiver</div>`)
      }
  }
  

  getKudos();
  getUsers();
  $(document).on('click', '#send-kudo', addKudo);
  