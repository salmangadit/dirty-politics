var rules = 
{
	"truth":{
		"effectSuccess":3,
		"cost":15,
		"probSuccess":0.8,
		"effectFailure":-3,
		"type":"oneToOne",
		"location":"",
		"level":1,
		"message":"Opponent spilled some of your secrets to gain support!",
		"title":"Say truths about opponent"
	},
	"lie":{
		"effectSuccess":3,
		"cost":15,
		"probSuccess":0.5,
		"effectFailure":-4,
		"type":"oneToOne",
		"location":"",
		"level":1,
		"message":"Opponent slandered you in public!",
		"title":"Make up lies about opponent"
	},
	"promise":{
		"effectSuccess":2,
		"cost":15,
		"probSuccess":0.6,
		"effectFailure":-2,
		"type":"oneToOne",
		"location":"",
		"level":1,
		"message":"Opponent made false promises to gain mile-age!",
		"title":"Make a promise"
	},
	"flirt":{
		"effectSuccess":1,
		"cost":10,
		"probSuccess":"special",
		"effectFailure":-1,
		"type":"oneToOne",
		"location":"",
		"level":1,
		"message":"Opponent flirted with some of the ladies to attract them!",
		"title":"Flirt"
	},
	"sleepWith":{
		"effectSuccess":4,
		"cost":120,
		"probSuccess":"special",
		"effectFailure":-4,
		"type":"oneToOne",
		"location":"",
		"level":1,
		"message":"Opponent slept with housewives to garner support!",
		"title":"Sleep with"
	},
	"attendService":{
		"effectSuccess":4,
		"cost":120,
		"probSuccess":0.75,
		"effectFailure":0,
		"type":"direct",
		"location":"",
		"level":3,
		"message":"Opponent attended service in church. Amen.",
		"title":"Attend Service"
	},
	"breakBread":{
		"effectSuccess":1,
		"cost":30,
		"probSuccess":1,
		"effectFailure":0,
		"type":"intraMap",
		"location":"church",
		"level":1,
		"message":"Opponent broke bread for the clergy!",
		"title":"Break bread"
	},
	"boostEconomy":{
		"effectSuccess":1,
		"cost":180,
		"probSuccess":"special",
		"effectFailure":0,
		"type":"intraMap",
		"location":"cc",
		"level":1,
		"message":"Opponent started a campaign to boost the economy!",
		"title":"Campaign to boost economy"
	},
	"slanderAdspot":{
		"effectSuccess":1,
		"cost":120,
		"probSuccess":"special",
		"effectFailure":-1,
		"type":"direct",
		"location":"house",
		"level":2,
		"message":"Opponent ran a ad slandering you!",
		"title":"Send Ad with Slander"
	},
	"religiousAdspot":{
		"effectSuccess":3,
		"cost":120,
		"probSuccess":"special",
		"effectFailure":-2,
		"type":"direct",
		"location":"house",
		"level":2,
		"message":"Opponent ran an adspot to target religious viewers!",
		"title":"Send Religious Ad"
	},
	"gayRightsAdspot":{
		"effectSuccess":2,
		"cost":120,
		"probSuccess":"special",
		"effectFailure":-3,
		"type":"direct",
		"location":"house",
		"level":2,
		"message":"Opponent ran an adspot supporting gay rights!",
		"title":"Ad supporting gays"
	},
	"buyShopping":{
		"effectSuccess":1,
		"cost":30,
		"probSuccess":"special",
		"effectFailure":-1,
		"type":"intraMap",
		"location":"house",
		"level":2,
		"message":"Opponent did shopping for some lovely ladies at the mall!",
		"title":"Buy shopping"
	},
	"buyDrinks":{
		"effectSuccess":2,
		"cost":60,
		"probSuccess":1,
		"effectFailure":0,
		"type":"intraMap",
		"location":"bar",
		"level":1,
		"message":"Opponent bought a round of beers for everyone! And paid for them!",
		"title":"Buy round of drinks"
	}
}