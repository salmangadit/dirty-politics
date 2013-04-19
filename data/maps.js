/**********************************************************************************************************************
Done by Salman Gadit 	(U095146E)
		Tan Sheng Di	(U095155N)
		Victoria Gan	(A0071885U)
		Renga Swarmy	(A0073676)
************************************************************************************************************************/

var maps = 
{
	"house":{
		"attributes":{
			"tileSize":"32",
			"width":"11",
			"height":"11",
			"baseColor":"#11FB76"
		},
		"grid":{
			"0":"WWWWWWWWWWW",
			"1":"Wr-Wt-W-fBW",
			"2":"Wu-W-kW---W",
			"3":"Wk-W------W",
			"4":"WW-WW-W-WWW",
			"5":"W---------W",
			"6":"W-y---y---W",
			"7":"WyTx--y--vW",
			"8":"W-z---y---W",
			"9":"W----P---TW",
			"10":"WWWWWDWWWWW"
		}
	},
	"cc":{
		"attributes":{
			"tileSize":"32",
			"width":"18",
			"height":"19",
			"baseColor":"#EDB347"
		},
		"grid":{
			"0":"WWWWWWWWWWWWWWWWWW",
			"1":"W------jW----W---W",
			"2":"W-------W-q--W--TW",
			"3":"W-------W----W---W",
			"4":"WWWWWW-WWW-WWW-TTW",
			"5":"W---W--------W---W",
			"6":"W---W--------W-TTW",
			"7":"W-T---ppggpp-----W",
			"8":"W---W-ppggpp-W-TTW",
			"9":"W---W-ppggpp-W---W",
			"10":"WWWWW-gggggg-WWWWW",
			"11":"Wr--W-gggggg-W--tW",
			"12":"W-----ppggpp-W---W",
			"13":"W-k-W-ppggpp----kW",
			"14":"W-T-W-ppggpp-WWWWW",
			"15":"W-T-W--------W--tW",
			"16":"W-u-W--------W---W",
			"17":"W---W---P-------kW",
			"18":"WWWWWWWWDDWWWWWWWW"
		}
	},
	"mall":{
		"attributes":{
			"tileSize":"32",
			"width":"21",
			"height":"19",
			"baseColor":"#59ABCB"
		},
		"grid":{
			"0":"WWWWWWWWWWWWWWWWWWWWW",
			"1":"Wt-kW-WwwwwwwwwwwwwwW",
			"2":"W-----Ww-----------wW",
			"3":"W---W-Ww-ww-ww---C-wW",
			"4":"WWWWW-Ww-ww-ww---C-wW",
			"5":"Wt-kW-Ww-ww-ww---C-wW",
			"6":"W-----Ww-----------wW",
			"7":"W---W-Wwww-wwww-wwwwW",
			"8":"WWWWW-WWWW-WWWW-WWWWW",
			"9":"WM--W-----------WSSSW",
			"10":"WM-CW--xy---xy--W--SW",
			"11":"WM--W--xy---xy--Wy-SW",
			"12":"WM-----xy---xy--Wy-SW",
			"13":"WM-MW-----------Wy-SW",
			"14":"WM-MWWWWW-WW----W--SW",
			"15":"WM-MWoooo--W-------SW",
			"16":"WM-MWo----CW----W-C-W",
			"17":"WMMMWo-----W-P--W---W",
			"18":"WWWWWWWWWWWWWDDWWWWWW"
		}
	},
	"church":{
		"attributes":{
			"tileSize":"32",
			"width":"15",
			"height":"19",
			"baseColor":"#7A070E"
		},
		"grid":{
			"0":"WWWWWWWWWWWWWWW",
			"1":"WpppUpphppRpppW",
			"2":"W---U-----R---W",
			"3":"W-q-U--l--R-i-W",
			"4":"W---U-----R---W",
			"5":"W---XVVVVVY---W",
			"6":"W-------------W",
			"7":"W-ZZZZ---zzzz-W",
			"8":"W-------------W",
			"9":"W-ZZZZ---zzzz-W",
			"10":"W-------------W",
			"11":"W-ZZZZ---zzzz-W",
			"12":"W-------------W",
			"13":"W-ZZZZ---zzzz-W",
			"14":"W-------------W",
			"15":"W-ZZZZ---zzzz-W",
			"16":"W-------------W",
			"17":"W------P------W",
			"18":"WWWWWWWDWWWWWWW"
		}
	},

	"bar":{
		"attributes":{
			"tileSize":"32",
			"width":"18",
			"height":"19",
			"baseColor":"#75046F"
		},
		"grid":{
			"0":"WWWWWWWWWWWWWWWWWW",
			"1":"W----EJJJJJJF----W",
			"2":"W---yE------Fx---W",
			"3":"W----GAAAAAAI----W",
			"4":"W----ZZ-Z-zz-----W",
			"5":"W----------------W",
			"6":"W--x-------------W",
			"7":"W-xTy-------y----W",
			"8":"W--z-------xTy---W",
			"9":"W-----------Z----W",
			"10":"W----------------W",
			"11":"W----------------W",
			"12":"W----------y-----W",
			"13":"W----x----xTy----W",
			"14":"W---xTy----Z-----W",
			"15":"W----z-----------W",
			"16":"W----------------W",
			"17":"W-------P--------W",
			"18":"WWWWWWWWDDWWWWWWWW"
		}
	},
    "mediastation":{
        "attributes":{
            "tileSize":"32",
            "width":"25",
            "height":"19",
            "baseColor":"#02566B"
        },
        "grid":{
            "0":"WWWWWWWWWWWWWWWWWWWWWWWWW",
            "1":"W#%#%%#%%#%%#%-----(((((W",
            "2":"W-----------------------W",
            "3":"W#%#%%#%%#%%#%----------W",
            "4":"W-----------------------W",
            "5":"W#%#%%#%%#%%#%----------W",
            "6":"W-----------------------W",
            "7":"WWWWWWWWWWWWWWW---------W",
            "8":"W@----------------------W",
            "9":"W@--W------------WWWWWWWW",
            "10":"W@--W-------------------W",
            "11":"W@--W-------------------W",
            "12":"W@--W-----+$-----W------W",
            "13":"W@--W-----!------W--{---W",
            "14":"W@--W------------W--}---W",
            "15":"WWWWW------------WWWWWWWW",
            "16":"W-----------------------W",
            "17":"W-------P---------------W",
            "18":"WWWWWWWWDDWWWWWWWWWWWWWWW"
            }
    },
	"cityA":{
		"attributes":{
			"tileSize":"32",
			"width":"45",
			"height":"30",
			"baseColor":"#1CB342"
		},
		"grid":{

			"0" :"gHggHggHggHggHggHggHggHggHgg---------g--g----",
			"1" :"OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO-g-----------g-",
			"2" :"-P-g-------gg------g----g---OO---------------",
			"3" :"gHggHggHggHggHggHggHggHggHggOO----gg---------",
			"4" :"OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO-----gg--------",
			"5" :"g---g----------e-g----------OO-------b---g---",
			"6" :"gHggHggHggHggHggHggHggHggHggOOOOOOOOOO-------",
			"7" :"OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO---------------",
			"8" :"--g---------g------g--------OO----g----------",
			"9" :"gHggHggHggHggHggHggHggHggHggOO---------------",
			"10":"OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO------g--------",
			"11":"-----g----------------------OO---------------",
			"12":"--g---------------ggggggg---OO------------gg-",
			"13":"------------------ggggggg---OO---------g---g-",
			"14":"-------g----------ggggggg---OO--gg-----------",
			"15":"------------------ggggggg---OO---------------",
			"16":"-----------Q----------------OO-----------c---",
			"17":"-----------OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO---",
			"18":"---------------OO------s---------g-----------",
			"19":"---------------OO--g------g------------gggg--",
			"20":"---------------OOggHggHggHggHggHggHggHggHggHg",
			"21":"------m--------OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
			"22":"------n--------OO-------g-----gg----------g--",
			"23":"------OOOOOOOOOOOggHggHggHggHggHggHggHggHggHg",
			"24":"--------g-----gOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
			"25":"---------------OO----g----gg------g----g-----",
			"26":"---d-----------OOggHggHggHggHggHggHggHggHggHg",
			"27":"---OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
			"28":"--g--g---------OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
			"29":"---------------ggggHggHggHggHggHggHggHggHggHg"


	}
    },
	"cityB":{
		"attributes":{
			"tileSize":"32",
			"width":"45",
			"height":"20",
			"baseColor":"#1CB342"
		},
		"grid":{
			"0":"--g----H-OO-H------H--O--H-----g-------------",
			"1":"------gg-OO-----g-----O-----------------g----",
			"2":"-P----gg-OOOOOe-------O-----g----g-----------",
			"3":"-gg----H-OO-H------H--O--H------ggg--g-------",
			"4":"---------OO-----------O-------gggg-----------",
			"5":"---g-----OOOOOOOOOOOOOOOOOOOOOOOOOOOOa-------",
			"6":"-----g---O--H---------Hg------------O--------",
			"7":"----H----O--------------g-------g---Om-------",
			"8":"--g----g-O-------g------H--g--------On-------",
			"9":"-----ggg-O-----------------g----ggg----------",
			"10":"-g--cOOOOOOOOOOOs-------g----------------g---",
			"11":"---------O----------g------------------------",
			"12":"---gg----O------------------gg---------------",
			"13":"----H----O-----H--------------g--------------",
			"14":"---------OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOQ--",
			"15":"g-----g--O---------------g--------O--------g-",
			"16":"g--------O----g-------------H---H-O-H---H----",
			"17":"---------O--------g---------------O---g------",
			"18":"--dOOOOOOO-------g----g-----H---H-O-H---H----",
			"19":"---------------------------------------------"
		}
	},
	"cityC":{
		"attributes":{
			"tileSize":"32",
			"width":"35",
			"height":"20",
			"baseColor":"#1CB342"
		},
		"grid":{
			"0":"-Hg------g-----HHggH--ggg---g------",
			"1":"-----ggggg------------g--------g-g-",
			"2":"gP--g-----g-----g----------g-------",
			"3":"--------g---H-----------HH---g-m--g",
			"4":"-g-----g-----------ggggg-------n---",
			"5":"---g------ggg--H---ggggg--g----O---",
			"6":"---g---gg----------------------Og--",
			"7":"------g-----H-------e----------O---",
			"8":"---------g------OOOOOOOOOOOOOOOO-g-",
			"9":"---H--g-----g---O------------------",
			"10":"-----------cOOOOO-------------g----",
			"11":"---H------------O-----H------------",
			"12":"--g-------------OOOOOOOOs---g------",
			"13":"-----ggggg--H----------O-----------",
			"14":"--------ggggg----H-----O-----------",
			"15":"----g-------ggg--------O-----H-----",
			"16":"-----------g-----gg----O--------g--",
			"17":"---------g-g-------g--QOOOOOOO-----",
			"18":"----H---gggg-----------------Oa----",
			"19":"g-g----------g-----g--g------Ob----"
		}
	}
 }