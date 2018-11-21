 
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
            <h5 class=kudosTitle>${kudos[i].title}</h5>
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
    $('#errors').empty();
    const to= $('#kudo-from').val();
    const from= $('#kudo-to').val();
    const message= $('#kudo-body').text();
    const title =$('#kudo-title').text();
  
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
          $('#errors').append(`<div class='alert alert-danger'>Oops! Something went wrong - please try again!</div>`)
        })
        
      } else {
        $('#errors').append(`<div class='alert alert-danger'>Uh-oh! Having a sender and receiver is mandatory.</div>`)
      }
  }
  

  getKudos();
  getUsers();
  $(document).on('click', '#send-kudo', addKudo);
  