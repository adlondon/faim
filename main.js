
var templates = {
  message: [
    "<div data-postid='<%= _id %>'>",
       "<p> <%=userName%> <%= content %> </p>",
      "<input type='text' name='editContent' value='<%= content %>'>",
       "<button class='submitEdit'>Submit Edit</button>",
       "</div>"
  ].join("")
}
$(document).ready(function() {
  faim.init();
});
var faim = {
  url: 'http://tiny-tiny.herokuapp.com/collections/faim',
  init: function() {
    faim.initEvents();
    faim.initStyling();
  },

  initEvents: function () {
    $('form').on('submit', function(event) {
      event.preventDefault();
      faim.submitMessage();
    });
    $('section').on('click', '.delete', faim.deletePostFromDom);
  },

  addMessage: function(newMessage) {
    faim.push(newMessage)
  },
  initStyling() {
    faim.addAllMessagesToDom();
  },

submitMessage: function () {
  var   newMessage = faim.getMessageFromDom();
  console.log(newMessage);
    faim.addMessage(newMessage);

    $('input').val('');
},
getMessageFromDom: function getMessageFromDom() {
  var content = $('input[name="content"]').val();
  return {
    content: content
  }
},
addAllMessagesToDom: function(event){
  $('.messageArea').html('');
  _.each(event, function(element){
    var tmpl = _.template(templates.message);
    $(".messageArea").append(tmpl(element));
  })
},
getMessages: function getMessages(){
  return faim;
}
}
