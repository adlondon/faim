var templates = {
  messages: [
    "<div>",
       "<%= content %>",
      "<input type='button' name='delete' value='delete!'>",
       "</div>"
  ].join("")
}


var messageData = [
{
  content: "hello",
  userName: "andrew"
 }
]

$(document).ready(function () {
  page.init();
});

var page = {
  // url: 'http://tiny-tiny.herokuapp.com/collections/faim',
  init: function() {

    page.initStyling();
    page.initEvents();
  },
  initStyling: function() {
    page.addAllMessages(messageData, $('.messageArea'));

  },
  initEvents: function() {
    $('form').on('submit', page.submitForm);
  },

  getMessageData: function () {
    return messageData;
  },
  addMessageData: function (newMessage) {
    messageData.push(newMessage)
  },
  addMessageToDom: function (dataArray, templateString, $target) {
    console.log("this is data array", dataArray)
    var tmpl = _.template(templateString);
    $target.append(tmpl(dataArray));

  },
  addAllMessages: function (arr,$target) {
    $target.html("");
    _.each(arr, function (el) {
      page.addMessageToDom(el,templates.messages,$target);
    });
  },
  getMessageFromDom: function (messageText) {
    return {
      content: messageText,
    };
  },
  submitForm: function (el) {
    el.preventDefault();
    var textInput = $('.textBox').val();
    var newMessage = page.getMessageFromDom(textInput);
    page.addMessageData(newMessage);
    $('.textBox').val('');
    console.log(messageData);
    page.addAllMessages(messageData, $('.messageArea'));
  }
}
