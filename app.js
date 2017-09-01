var express = require('express');
var db = require('./db');
var request = require('request');
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs'); 
var nodemailer = require('nodemailer');


var app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public/JoelAustin.Net'));

app.post('/formaction', function(req,res) {
	console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'austinnodemailer@gmail.com',
			pass: 'google951'
		}
	});
    var mailOptions = {
        from: `${req.body.Name}`,
        to: "austinnodemailer@gmail.com",
        subject: `JoelAustin.Net; ${req.body.Name}`,
        text: `FROM JoelAustin.Net Email Form \n\n ${req.body.Message}`,
        html: `<b>From JoelAustin.Net Email Form</b> \n\n <body><h2>${req.body.Name}</h2><h2> ${req.body.Email}</h2>
		
		<p>${req.body.Message}</p>
		
		</body>`
    };
    
	transporter.sendMail(mailOptions, (error, info) => {

		if (error) {
			return console.log(error);
		}
		console.log('Message %s sent: %s', info.messageId, info.response);
	});
    


	res.send(200,"<body style='background: url(Images/CityColor.jpg) no-repeat center center fixed;background-size: cover;'></body><script>alert('Message Sent!'); window.location='contact.html'</script>");
	res.end();
});
var UserController = require('./user/UserController');
app.use('/users', UserController);

var port = process.env.PORT || 8081;

var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});