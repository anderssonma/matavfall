var scoreArray = [
	[ // PART 1
		0, 1, 2, 3
	], [ // PART 2
		3, 1, 2, 0
	], [ // PART 3
		3, 2, 1, 0
	], [ // PART 4
		0, 1, 2, 3
	], [ // PART 5
		0, 3, 1, 2
	], [ // PART 6
		2, 0, 3, 1
	], [ // PART 7
		0, 1, 2, 3
	]
];

var wordChoices = [
	[ // PART 1
		'…och låter det rinna någon minut tills det blir lagom varmt.', // 0
		'…och tvättar mig, men står kvar 5 minuter och låter duschvärmen göra mig pigg.', // 1
		'…och duschar snabbt, som jag gör varje dag.', // 2
		'…och tar en dusch, men inte varje dag. Ibland räcker det med att tvätta sig ordentligt i handfatet.' // 3
	], [ // PART 2
		'Allt på vårt frukostbord är ekologiskt och jag äter olika varje dag.', // 3
		'Jag ber mamma sätta på spisen och steka ett ägg. Ibland får hon steka två gånger.', // 1
		'Jag äter en tallrik filmjölk, ekologiskt om det finns.', // 2
		'Jag gillar varmt bröd och värmer alltid brödet i micron eller ugnen.', // 0
	], [ // PART 3
		'…påminna alla i familjen när det är min vecka om att det är viktigt att sortera.', // 3
		'…lägga soporna där de ska vara, rätt sorterade.', // 2
		'…sortera men ibland glömmer jag bort mig och slänger allt bland restavfall ändå.', // 1
		'…ta med dem när jag går hemifrån. Vi sorterar inte. Jag slänger allt bland restavfall.' // 0
	], [ // PART 4
		'…ber jag mamma eller pappa skjutsa mig till skolan, eller betala en taxi för mig.', // 0
		'…ber jag mamma eller pappa skjutsa mig till bussen, även om det är en omväg.', // 1
		'…tar jag bussen, men om det regnar eller snöar ber jag efter skjuts till busshållplatsen.', // 2
		'…cyklar eller går jag till skolan, oavsett väder. Det är ju inte så långt!' // 3
	], [ // PART 5
		'…godis! Och chips. Inget annat.', // 0
		'…en frukt som är ekologiskt odlad. Vi handlar bara sådana frukter hemma.', // 3
		'…helst frukt. Inte så noga, bara det mättar.', // 1
		'…nästan alltid ett äpple. Oftast är det ekologiskt odlat.' // 2
	], [ // PART 6
		'…äter något lätt, gärna filmjölk, sedan gör jag läxor om jag har några.', // 2
		'…tänder alla lampor i hemmet och sätter på datorn, TV:n och musik som sällskap.', // 0
		'…gör en rolig frågesport om miljöfrågor, som familjen får tävla om efter middagen.', // 3
		'…går till mitt rum och sätter igång datorn (som jag stängde av i morse).' // 1
	], [ // PART 7
		'…har jag alltid en lampa tänd i rummet. Och musik på, fast lågt. Då sover jag bäst.', // 0
		'…har jag datorn eller telefonen på hela natten. Man vet aldrig...', // 1
		'…har jag surfat tills jag blivit jättetrött. Men jag stänger av dator och telefon när jag ska sova.', // 2
		'…vill jag ha lugn och ro. Så jag släcker lamporna, dator och telefon.' // 3
	]
];