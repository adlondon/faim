


var templates = {
  messages: [
    "<div class= 'eachMessage' data-postid='<%= _id %>'",
      "<p class='userNameDisplay'><%= userName %></p>",
        "<p class= 'message'> <%= content %> </p>",
       "<% if (obj.userName === userNameInput) {%>",
      "<input type='button' name='delete' value='delete!' class = 'delete'>",
      "<% } %>",
    "</div>"
  ].join("")
};



var userNameInput = prompt("Enter Username");
sessionStorage.setItem('userName', userNameInput);

var messageData = [
// {
//   content: "hello",
//   userName: "elizabeth"
//  }
]

$(document).ready(function () {
  page.init();
  if (sessionStorage.getItem("autosave")) {
    field.value = sessionStorage.getItem("autosave");
  };
  // setInterval(function(){page.getMessageData()}, 1000);

});

var page = {
  url: 'http://tiny-tiny.herokuapp.com/collections/faims',
  init: function() {

    page.initStyling();
    page.initEvents();
  },
  initStyling: function() {
    page.addAllMessages(messageData, $('.messageArea'));

  },
  initEvents: function() {
    $('form').on('submit', page.submitForm);
    $('body').on('click','.delete', page.deletePostFromDom)
  },


  getMessageData: function () {
    $.ajax({
      url: page.url,
      method: "GET",
      success: function (response) {
        console.log("RESPONSE FROM TINTINY ADD MESSAGE", response);
        page.addAllMessages(response,$('.messageArea'))
      }
    })
  },
  addMessageData: function (newMessage) {
    $.ajax({
      url: page.url,
      method: "POST",
      data: newMessage,
      success: function (response) {
          console.log(response);
          page.getMessageData();
      }
    })
  },
  deletePost: function (postId) {
    console.log("this is the post id: ", postId);
   $.ajax({
     url: page.url + '/' + postId,
     method: 'DELETE',
     success: function (response) {
       page.getMessageData();
     }
   });
 },
 deletePostFromDom: function (event) {
  var postId = $(this).parent().data('postid');

  page.deletePost(postId);
},

  addMessageToDom: function (dataArrayObject, templateString, $target) {
      var tmpl = _.template(templateString);
      $target.append(tmpl(dataArrayObject));
  },
  addAllMessages: function (arr,$target) {
    $target.html('');
    _.each(arr, function (el) {
      page.addMessageToDom(el,templates.messages,$target);
    });
  },
  getMessageFromDom: function (messageText) {
    var username = sessionStorage.getItem('userNameInput');
    return {
      content: messageText,
      userName: userNameInput,
    };
  },
  submitForm: function (el) {
    el.preventDefault();
    var textInput = $('.textBox').val();
    var newMessage = page.getMessageFromDom(textInput);
    page.addMessageData(newMessage);
    $('.textBox').val('');
    console.log(messageData);
    // page.addAllMessages(messageData, $('.messageArea'));
  },
  deleteToggle: function (el) {
    if ($(".deletePost").contains(userNameInput)) {
      delete el;
    };
  }
}
