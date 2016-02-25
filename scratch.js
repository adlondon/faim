// var messages = {
//   username: andrew,
//
// }


var url = "https://tiny-tiny.herokuapp.com/collections/faim";


$.ajax({
  method: "post",
  url: url,
  data: {
    username: "andrew",
    password: "123",
  },
  success: function(data){
    console.log(data);
  },
  error: function (error) {
    console.log(error);
  }
});

$.ajax({
  method: "post",
  url: url,
  data: {
    username: "elizabeth",
    password: "321"
  },
  success: function (data) {
    console.log(data);
  },
  error: function (error) {
    console.log(error);
  }
})
