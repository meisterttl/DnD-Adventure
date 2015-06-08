// JavaScript document

// Alt+2 to fold
// Alt+Shift+2 to collapse

function rollD20(){
	var d20Roll=Math.floor((Math.random()*20)+1);
	return d20Roll;
}

function rollDamage(d,n){
	total=0;
	for(i=0; i<n; i++){
		var damageRoll=Math.floor((Math.random()*d)+1);
		total+=damageRoll;
	}
	return total;
}

var Human={
	level: 1,
	class: 'Human Cleric',
	maxhp: 31,
	attack: 7,
	attackBonus: 0,
	defense: 17,
	defenseBonus: 0,
	initiative: 5,
	str: 16,
	con: 12,
	dex: 12,
	int: 14,
	wis: 16,
	cha: 8,
	bonus: 0,
	weapon: 'Mace',
	armor: ' Light Shield and Chainmail',
	reset: function(){
		this.level=1;
		this.maxhp=31;
		this.attack=7;
		this.defense=17;
		this.initiative=5;
		this.con=12;
		this.wis=16;
		this.bonus=0;
	},
	initiativeRoll: function(){
		yourInitiative=rollD20()+Human.initiative;
		$mainDisplay.html('<p>Your Initiative is '+yourInitiative+'.</p>');
	},
	sacredFlame: function(){
		yourAttack=rollD20()+Human.attack+Human.bonus+2+Human.attackBonus;
		$mainDisplay.html('<p>You bathe your enemy in sacred light, searing it in radiance.</p>');
		yourDamage=rollDamage(8,1)+Math.floor((Human.wis-10)/2)+Human.bonus+2;
	},
	healingSurge: function(){
		healAmount=Math.floor(Human.maxhp/2);
		if(yourHealth<=healAmount){
			$mainDisplay.html('<p>You regain '+healAmount+' Hit Points.</p>');
			yourHealth+=healAmount;
		}else{
			healAmount=Human.maxhp-yourHealth;
			$mainDisplay.html('<p>You regain '+healAmount+' Hit Points.</p>');
			yourHealth+=healAmount;
		}
	},
	cureSeriousWound: function(){
		healAmount=Human.maxhp-yourHealth;
		$mainDisplay.html('<p>You utter a simple prayer and gain the power to instantly heal wounds. Your touch suffuses you with a bright silver light that restores health and vigor. You regain '+healAmount+' Hit Points.</p>');
		yourHealth=Human.maxhp;
	},
	searingBrand: function(){
		yourAttack=rollD20()+Human.attack+Human.bonus+Human.attackBonus;
		$mainDisplay.html('<p>When you invoke the power of your deity, a searing light flashes from your weapon to blind your foe.</p>');
		yourDamage=rollDamage(8,2)+Math.floor((Human.wis-10)/2)+Human.bonus+2;
	},
	sunderingMight: function(){
		yourAttack=rollD20()+Human.attack+Human.bonus+1+Human.attackBonus;
		$mainDisplay.html('<p>You cloak your weapon in divine magic and slam your foe, revealing a gap in its defenses.</p>');
		yourDamage=rollDamage(8,2)+Math.floor((Human.wis-10)/2)+Human.bonus+2+2;
	},
	dauntingLight: function(){
		yourAttack=rollD20()+Human.attack+Human.bonus+Human.attackBonus;
		$mainDisplay.html('<p>A burning column of light engulfs your foe. Its brilliance burns your enemy and hinders its defenses for a short time.</p>');
		yourDamage=rollDamage(10,2)+Math.floor((Human.wis-10)/2)+Human.bonus+2;
	},
	bless: function(){
		blessActive=true;
		$mainDisplay.html('<p>You beseech your deity to bless you.</p>');
	},
	punishTheProfane: function(){
		yourAttack=rollD20()+Human.attack+Human.bonus+Human.attackBonus;
		$mainDisplay.html('<p>You channel divine energy into your weapon, causing it to release a burst of radiance when you strike the enemy.</p>');
		yourDamage=rollDamage(10,2)+Math.floor((Human.wis-10)/2)+Human.bonus+2;
		if(yourAttack>=enemyDefense){
			followUp=rollD20()+Human.attack+Human.bonus;
			followUpDmg=5+Math.floor((Human.wis-10)/2)+Human.bonus+2;
		}
	},
	divineJuggernaut: function(){
		yourAttack=rollD20()+Human.attack+Human.bonus+Human.attackBonus;
		$mainDisplay.html('<p>Your body surges with the manifestation of divine wrath, and even simple prayers make your onslaught more forceful.</p>');
		yourDamage=rollDamage(10,2)+Math.floor((Human.wis-10)/2)+Human.bonus+2;
	},
	flameStrike: function(){
		yourAttack=rollD20()+Human.attack+Human.bonus+Human.attackBonus;
		$mainDisplay.html('<p>A column of flame roars downward to engulf your foes.</p>');
		yourDamage=rollDamage(12,2)+Math.floor((Human.wis-10)/2)+Human.bonus+2;
		flameDotDamage=5+Math.floor((Human.wis-10)/2)+Human.bonus+2;
	},
	shieldingWord: function(){
		shieldingActive=true;
		$mainDisplay.html('<p>You call out a quick prayer to instantly defend you from harm.</p>');
	}
};

var Dwarf={
	level: 1,
	class: 'Dwarf Fighter',
	maxhp: 40,
	attack: 9,
	attackBonus: 0,
	defense: 19,
	defenseBonus: 0,
	initiative: 3,
	str: 20,
	con: 16,
	dex: 8,
	int: 10,
	wis: 10,
	cha: 11,
	bonus: 0,
	weapon: 'Maul',
	armor: ' Scale Armor',
	reset: function(){
		this.level=1;
		this.maxhp=40;
		this.attack=9;
		this.defense=19;
		this.initiative=3;
		this.str=20;
		this.con=16;
		this.bonus=0;
	},
	initiativeRoll: function(){
		yourInitiative=rollD20()+Dwarf.initiative;
		$mainDisplay.html('<p>Your Initiative is '+yourInitiative+'</p>');
	},
	brashStrike: function(){
		yourAttack=rollD20()+Dwarf.attack+Dwarf.bonus+2+Dwarf.attackBonus;
		$mainDisplay.html('<p>With a battle cry, you throw your whole body behind your attack.</p>');
		yourDamage=rollDamage(6,2)+Math.floor((Dwarf.str-10)/2)+Math.floor((Dwarf.con-10)/2)+Dwarf.bonus+2;
	},
	healingSurge: function(){
		healAmount=Math.floor(Dwarf.maxhp/2);
		if(yourHealth<=healAmount){
			$mainDisplay.html('<p>You regain '+healAmount+' Hit Points.</p>');
			yourHealth+=healAmount;
		}else{
			healAmount=Dwarf.maxhp-yourHealth;
			$mainDisplay.html('<p>You regain '+healAmount+' Hit Points.</p>');
			yourHealth+=healAmount;
		}
	},
	mightySurge: function(){
		healAmount=Math.floor(Dwarf.maxhp/2);
		if(yourHealth<=healAmount){
			$mainDisplay.html('<p>You dig deep to find the strength you need to overcome your foe.</p>');
			$mainDisplay.html('<p>You regain '+healAmount+' Hit Points.</p>');
			yourHealth+=healAmount;
		}else{
			healAmount=Dwarf.maxhp-yourHealth;
			$mainDisplay.html('<p>You dig deep to find the strength you need to overcome your foe.</p>');
			$mainDisplay.html('<p>You regain '+healAmount+' Hit Points.</p>');
			yourHealth+=healAmount;
		}
	},
	griffonsWrath: function(){
		yourAttack=rollD20()+Dwarf.attack+Dwarf.bonus+Dwarf.attackBonus;
		$mainDisplay.html('<p>You land a heavy blow on your foe, exposing a vulnerable spot in its defense.</p>');
		yourDamage=rollDamage(6,4)+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2;
	},
	rainOfBlows: function(){
		$mainDisplay.html('<p>You become a blur of motion, raining a series of blows upon your opponent.</p>');
		yourAttack=rollD20()+Dwarf.attack+Dwarf.bonus+Dwarf.attackBonus;
		yourDamage=rollDamage(6,2)+Dwarf.bonus+2;
		secondAttack=rollD20()+Dwarf.attack+Dwarf.bonus+Dwarf.attackBonus;
		secondDamage=rollDamage(6,2)+Dwarf.bonus+2;
		lastAttack=rollD20()+Dwarf.attack+Dwarf.bonus+Dwarf.attackBonus;
		lastDamage=rollDamage(6,2)+Dwarf.bonus+2;
	},
	anvilOfDoom: function(){
		yourAttack=rollD20()+Dwarf.attack+Dwarf.bonus+Dwarf.attackBonus;
		$mainDisplay.html('<p>Like a smith\'s hammer striking the anvil, you strike your enemy with a ringing blow that leaves it disoriented.</p>');
		yourDamage=rollDamage(6,4)+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2;
	},
	kirresRoar: function(){
		kirresActive=true;
		$mainDisplay.html('<p>You let out an explosive roar, discouraging your enemy\'s will to attack you.</p>');
	},
	drivingAttack: function(){
		yourAttack=rollD20()+Dwarf.attack+Dwarf.bonus+Dwarf.attackBonus;
		$mainDisplay.html('<p>You drive back your adversary with a hail of blows.</p>');
		yourDamage=rollDamage(6,4)+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2;
		if(yourAttack>=enemyDefense){
			followUp=rollD20()+Dwarf.attack+Dwarf.bonus+Dwarf.attackBonus;
			followUpDmg=rollDamage(6,2)+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2;
		}
	},
	rainOfSteel: function(){
		rainActive=true;
		$mainDisplay.html('<p>You constantly swing your hammer, bashing and smashing the enemy.</p>');
	},
	dancingDefense: function(){
		dancingActive=true;
		$mainDisplay.html('<p>Each time your hammer connects, you strike again.</p>');
	},
	gloweringThreat: function(){
		gloweringActive=true;
		$mainDisplay.html('<p>Your intimidating presence distracts your enemies as they attempt to attack you.</p>');
	}
};

var Elf={
	level: 1,
	class: 'Elf Wizard',
	maxhp: 28,
	attack: 11,
	attackBonus: 11,
	defense: 15,
	defenseBonus: 15,
	initiative: 7,
	str: 8,
	con: 8,
	dex: 16,
	int: 20,
	wis: 10,
	cha: 16,
	bonus: 0,
	weapon: 'Staff and Orb',
	armor: ' Cloth Robe',
	reset: function(){
		this.level=1;
		this.maxhp=28;
		this.attack=11;
		this.defense=15;
		this.initiative=7;
		this.dex=16;
		this.int=20;
		this.bonus=0;
	},
	initiativeRoll: function(){
		yourInitiative=rollD20()+Elf.initiative;
		$mainDisplay.html('<p>Your Initiative is '+yourInitiative+'</p>');
	},
	magicMissile: function(){
		$mainDisplay.html('<p>A glowing blue bolt of magical energy hurtles from your finger and unerringly strikes your target.</p>');
		yourDamage=Math.floor((Elf.int-10)/2)+Elf.bonus+8;
	},
	healingSurge: function(){
		healAmount=Math.floor(Elf.maxhp/2);
		if(yourHealth<=healAmount){
			$mainDisplay.html('<p>You regain '+healAmount+' Hit Points.</p>');
			yourHealth+=healAmount;
		}else{
			healAmount=Elf.maxhp-yourHealth;
			$mainDisplay.html('<p>You regain '+healAmount+' Hit Points.</p>');
			yourHealth+=healAmount;
		}
	},
	shield: function(){
		shieldActive=true;
		$mainDisplay.html('<p>You throw up your hand, and a shield of arcane energy springs into existence, protecting you against imminent attacks.</p>');
	},
	burningHand: function(){
		yourAttack=rollD20()+Elf.attack+Elf.bonus+Elf.attackBonus;
		$mainDisplay.html('<p>A gout of flame erupts from your hands and scorches your enemy.</p>');
		yourDamage=rollDamage(10,3)+Math.floor((Elf.int-10)/2)+Elf.bonus+6;
	},
	rayOfFrost: function(){
		yourAttack=rollD20()+Elf.attack+Elf.bonus+Elf.attackBonus;
		$mainDisplay.html('<p>A blisteringly cold ray of white frost streaks to your target.</p>');
		yourDamage=rollDamage(10,3)+Math.floor((Elf.int-10)/2)+Elf.bonus+6;
	},
	lightningBolt: function(){
		yourAttack=rollD20()+Elf.attack+Elf.bonus+Elf.attackBonus;
		$mainDisplay.html('<p>Brilliant strokes of blue-white lightning erupt from your outstretched hand.</p>');
		yourDamage=rollDamage(10,3)+Math.floor((Elf.int-10)/2)+Elf.bonus+6;
	},
	invisibility: function(){
		invisibilityActive=true;
		$mainDisplay.html('<p>You vanish from enemy\'s sight.</p>');
	},
	acidArrow: function(){
		yourAttack=rollD20()+Elf.attack+Elf.bonus+Elf.attackBonus;
		$mainDisplay.html('<p>A shimmering arrow of green, glowing liquid streaks to your enemy and bursts in a spray of sizzling acid.</p>');
		yourDamage=rollDamage(10,2)+Math.floor((Elf.int-10)/2)+Elf.bonus+6;
		secondAttack=rollD20()+Elf.attack+Elf.bonus+Elf.attackBonus;
		secondDamage=rollDamage(10,2)+Math.floor((Elf.int-10)/2)+Elf.bonus+6;
	},
	fireball: function(){
		yourAttack=rollD20()+Elf.attack+Elf.bonus+Elf.attackBonus;
		$mainDisplay.html('<p>A globe of orange flame coalesces in your hand. You hurl it at your enemy, and it explodes on impact.</p>');
		yourDamage=rollDamage(10,5)+Math.floor((Elf.int-10)/2)+Elf.bonus+6;
	},
	iceStorm: function(){
		yourAttack=rollD20()+Elf.attack+Elf.bonus+Elf.attackBonus;
		$mainDisplay.html('<p>A shower of bitterly cold hailstones pummels a wide swath of ground and covers the area in ice.</p>');
		yourDamage=rollDamage(10,6)+Math.floor((Elf.int-10)/2)+Elf.bonus+6;
	},
	repellingShield: function(){
		repellingActive=true;
		$mainDisplay.html('<p>A sudden shield of arcane energy blocks an attack and punishes the enemy.</p>');
	},
};

function levelUp(character){
	character.level++;
	var currentLevel=character.level;
	if(character.level==4 || character.level==8){
		character.attack++;
		character.defense++;
		character.bonus++;
		if(character==Human){
			character.con++;
			character.wis++;
			character.maxhp+=6;
		}else if(character==Dwarf){
			character.str++;
			character.con++;
			character.maxhp+=7;
		}else{
			character.dex++;
			character.int++;
			character.maxhp+=4;
		}
	}else{
		if(character==Human){
			character.maxhp+=5;
		}else if(character==Dwarf){
			character.maxhp+=6;
		}else{
			character.maxhp+=4;
		}
	}
	character.currenthp=character.maxhp;
	if(currentLevel%2==0){
		character.attack++;
		character.defense++;
		character.initiative++;
	}
}

function updateInfo(character){
	$('.yourlevel').text(character.level);
	$('.yourcurrenthp, .yourmaxhp').text(character.maxhp);
	$('.yourattack').text(character.attack);
	$('.yourdefense').text(character.defense);
	$('.yourinitiative').text(character.initiative);
	$('.yourstr').text(character.str);
	$('.yourcon').text(character.con);
	$('.yourdex').text(character.dex);
	$('.yourint').text(character.int);
	$('.yourwis').text(character.wis);
	$('.yourcha').text(character.cha);
	yourLevel=character.level;
	yourHealth=character.maxhp;
	yourDefense=character.defense;
}

function updateEnemyInfo(enemy){
	$('.enemylevel').text(enemy.level);
	$('.enemyname').text(enemy.name);
	$('.enemycurrenthp').text(enemy.maxhp);
	$('.enemymaxhp').text(enemy.maxhp);
	$('.enemyattack').text(enemy.attack);
	$('.enemydefense').text(enemy.defense);
	$('.enemyinitiative').text(enemy.initiative);
	enemyLevel=enemy.level;
	enemyHealth=enemy.maxhp;
	enemyDefense=enemy.defense;
}

function updateHealth(character){
	$yourCurrentHP.text(yourHealth);
}

function updateEnemyHealth(enemy){
	$enemyCurrentHP.text(enemyHealth);
}

var Slime={
	level: 1,
	name: 'Slime',
	maxhp: 15,
	attack: 5,
	attackPenalty: 0,
	defense: 10,
	defensePenalty: 0,
	initiative: 2,
	initiativeRoll: function(){
		enemyInitiative=rollD20()+Slime.initiative;
		$mainDisplay.append('<p>The Slime\'s Initiative is '+enemyInitiative+'.</p>');
	},
	sting: function(){
		enemyAttack=rollD20()+Slime.attack;
		$mainDisplay.append('<p>The Slime attacks you.</p>');
		enemyDamage=rollDamage(4,1)+4;
	}
};

var Direbear={
	level: 2,
	name: 'Dire Bear',
	maxhp: 25,
	attack: 6,
	attackPenalty: 0,
	defense: 11,
	defensePenalty: 0,
	initiative: 4,
	initiativeRoll: function(){
		enemyInitiative=rollD20()+Direbear.initiative;
		$mainDisplay.append('<p>The Direbear\'s Initiative is '+enemyInitiative+'.</p>');
	},
	maul: function(){
		enemyAttack=rollD20()+Direbear.attack;
		$mainDisplay.append('<p>The Dire Bear attacks you.</p>');
		enemyDamage=rollDamage(6,1)+6;
	}
};

var Treant={
	level: 3,
	name: 'Treant',
	maxhp: 40,
	attack: 7,
	attackPenalty: 0,
	defense: 13,
	defensePenalty: 0,
	initiative: 4,
	initiativeRoll: function(){
		enemyInitiative=rollD20()+Treant.initiative;
		$mainDisplay.append('<p>The Treant\'s Initiative is '+enemyInitiative+'.</p>');
	},
	slam: function(){
		enemyAttack=rollD20()+Treant.attack+Treant.attackPenalty;
		$mainDisplay.append('<p>The Treant attacks you.</p>');
		enemyDamage=rollDamage(8,1)+4;
	}
};

var Werewolf={
	level: 4,
	name: 'Werewolf',
	maxhp: 55,
	attack: 8,
	attackPenalty: 0,
	defense: 14,
	defensePenalty: 0,
	initiative: 6,
	initiativeRoll: function(){
		enemyInitiative=rollD20()+Werewolf.initiative;
		$mainDisplay.append('<p>The Werewolf\'s Initiative is '+enemyInitiative+'.</p>');
	},
	claw: function(){
		enemyAttack=rollD20()+Werewolf.attack+Werewolf.attackPenalty;
		$mainDisplay.append('<p>The Werewolf attacks you.</p>');
		enemyDamage=rollDamage(8,1)+6;
	}
};

var OrcGuardian={
	level: 5,
	name: 'Orc Guardian',
	maxhp: 75,
	attack: 9,
	attackPenalty: 0,
	defense: 16,
	defensePenalty: 0,
	initiative: 6,
	initiativeRoll: function(){
		enemyInitiative=rollD20()+OrcGuardian.initiative;
		$mainDisplay.append('<p>The Orc Guardian\'s Initiative is '+enemyInitiative+'.</p>');
	},
	bludgeon: function(){
		enemyAttack=rollD20()+OrcGuardian.attack+OrcGuardian.attackPenalty;
		$mainDisplay.append('<p>The Orc Guardian attacks you.</p>');
		enemyDamage=rollDamage(8,1)+8;
	}
};

var UndeadSkeleton={
	level: 6,
	name: 'Undead Skeleton',
	maxhp: 95,
	attack: 10,
	defense: 18,
	initiative: 8,
	initiativeRoll: function(){
		enemyInitiative=rollD20()+UndeadSkeleton.initiative;
		$mainDisplay.append('<p>The Undead Skeleton\'s Initiative is '+enemyInitiative+'.</p>');
	},
	slash: function(){
		enemyAttack=rollD20()+UndeadSkeleton.attack;
		$mainDisplay.append('<p>The Undead Skeleton attacks you.</p>');
		enemyDamage=rollDamage(4,2)+10;
	}
};

var Succubus={
	level: 7,
	name: 'Succubus',
	maxhp: 120,
	attack: 11,
	defense: 19,
	initiative: 9,
	initiativeRoll: function(){
		enemyInitiative=rollD20()+Succubus.initiative;
		$mainDisplay.append('<p>The Succubus\'s Initiative is '+enemyInitiative+'.</p>');
	},
	charm: function(){
		enemyAttack=rollD20()+Succubus.attack;
		$mainDisplay.append('<p>The Succubus charms you.</p>');
	},
	whip: function(){
		enemyAttack=rollD20()+Succubus.attack;
		$mainDisplay.append('<p>The Succubus attacks you.</p>');
		enemyDamage=rollDamage(6,2)+10;
	}
};

var Abomination={
	level: 8,
	name: 'Abomination',
	maxhp: 145,
	attack: 12,
	defense: 21,
	initiative: 10,
	initiativeRoll: function(){
		enemyInitiative=rollD20()+Abomination.initiative;
		$mainDisplay.append('<p>The Abomination\'s Initiative is '+enemyInitiative+'.</p>');
	},
	eviscerate: function(){
		enemyAttack=rollD20()+Abomination.attack;
		$mainDisplay.append('<p>The Abomination eviscerates you.</p>');
		enemyDamage=rollDamage(8,2)+12;
	},
	bite: function(){
		enemyAttack=rollD20()+Abomination.attack;
		$mainDisplay.append('<p>The Abomination bites you.</p>');
		enemyDamage=rollDamage(8,2)+12;
	}
};

var Lich={
	level: 9,
	name: 'Lich',
	maxhp: 180,
	attack: 13,
	defense: 22,
	initiative: 11,
	initiativeRoll: function(){
		enemyInitiative=rollD20()+Lich.initiative;
		$mainDisplay.append('<p>The Lich\'s Initiative is '+enemyInitiative+'.</p>');
	},
	curse: function(){
		enemyAttack=rollD20()+Lich.attack;
		$mainDisplay.append('<p>The Lich curses you.</p>');
	},
	prismaticSpray: function(){
		enemyAttack=rollD20()+Lich.attack;
		$mainDisplay.append('<p>The Lich uses his unholy magic on you.</p>');
		enemyDamage=rollDamage(10,2)+14;
	}
};

var Balrog={
	level: 10,
	name: 'Balrog',
	maxhp: 240,
	attack: 15,
	defense: 24,
	initiative: 15,
	initiativeRoll: function(){
		enemyInitiative=rollD20()+Balrog.initiative;
		$mainDisplay.append('<p>The Balrog\'s Initiative is '+enemyInitiative+'.</p>');
	},
	breath: function(){
		enemyAttack=rollD20()+Balrog.attack;
		$mainDisplay.append('<p>The Balrog breathes fire on you.</p>');
		enemyDamage=rollDamage(6,4)+18;
	},
	smash: function(){
		enemyAttack=rollD20()+Balrog.attack;
		$mainDisplay.append('<p>The Balrog smashs you.</p>');
		enemyDamage=rollDamage(10,2)+18;
	}
};



var blessActive=false;
var shieldingActive=false;

var mightySurgeActive=false;

var shieldActive=false;

var mightySave=3;

var shieldSave=3;

function playerBuff(character){
	if(blessActive==true){ // Bless condition
		character.attackBonus=2;
		$('.yourattack').text(character.attack+character.attackBonus);
	} // end of Bless condition
	
	if(shieldingActive==true){ // Shielding Word condition
		character.defenseBonus=4;
		$('.yourdefense').text(character.defense+character.defenseBonus);
		yourDefense=character.defense+character.defenseBonus;
	} // end of Shielding Word condition
	
	if(mightySurgeActive==true){ // Mighty Surge condition
		character.attackBonus=2;
		character.defenseBonus=2;
		$('.yourattack').text(character.attack+character.attackBonus);
		$('.yourdefense').text(character.defense+character.defenseBonus);
	} // end of Mighty Surge condition
	
	if(shieldActive==true){ // Shield condition
		character.defenseBonus=4;
		$('.yourdefense').text(character.defense+character.defenseBonus);
	} // end of Shield condition
}

function playerBuffReset(character){
	blessActive=false;
	shieldingActive=false;
	
	mightySurgeActive=false;
	mightySave=3;
	
	shieldActive=false;
	shieldSave=3;
	
	character.attackBonus=0;
	character.defenseBonus=0;
	
	$('.yourattack').text(character.attack);
	$('.yourdefense').text(character.defense);
}



var enemyBlind=false;
var blindAlert=false;

var enemyDaunting=false;
var dauntingAlert=false;

var ongoingFlameStrike=false;

var enemyDebuffDefense=false;
var debuffDefenseAlert=false;

var enemyStun=false;

var kirresActive=false;

var rainActive=false;
var dancingActive=false;
var gloweringActive=false;

var invisibilityActive=false;
var repellingActive=false;

var blindSave=3;
var dauntingSave=3;

var debuffDefenseSave=3;
var stunSave=3;
var kirresSave=3;

var invisibilitySave=3;
var repellingSave=3;

function enemyDebuffReset(enemy){
	enemyBlind=false;
	blindAlert=false;
	blindSave=3;
	
	enemyDaunting=false;
	dauntingAlert=false;
	dauntingSave=3;
	
	ongoingFlameStrike=false;
	flameDotDamage=0;
	
	enemyDebuffDefense=false;
	debuffDefenseAlert=false;
	debuffDefenseSave=3;
	
	enemyStun=false;
	stunSave=3;
	
	kirresActive=false;
	kirresSave=3;
	
	rainActive=false;
	dancingActive=false;
	gloweringActive=false;
	
	invisibilityActive=false;
	repellingActive=false;
	invisibilitySave=3;
	repellingSave=3;
}

function blindReset(character){
	enemyBlind=false;
	blindAlert=false;
	blindSave=3;
}

function dauntingReset(character){
	enemyDaunting=false;
	dauntingAlert=false;
	dauntingSave=3;
}

function debuffDefenseReset(character){
	enemyDebuffDefense=false;
	debuffDefenseAlert=false;
	debuffDefenseSave=3;
}

function stunReset(character){
	enemyStun=false;
	stunSave=3;	
}

function kirresReset(character){
	kirresActive=false;
	kirresSave=3;
}

function invisibilityReset(character){
	invisibilityActive=false;
	invisibilitySave=3;
}

function repellingReset(character){
	repellingActive=false;
	repellingSave=3;
}

function enemyMove(enemy){ // enemy's behaviour
	$menuAttack.removeClass('disabled');
	$menuHeal.removeClass('disabled');

	if(enemyBlind==true){ // enemy blind condition
		if(blindAlert==false){
			$mainDisplay.append('<p>The enemy takes -5 penalty to attack due to blindness.</p>');
			blindAlert=true;
		}
		blindSave--;
		enemy.attackPenalty=-5;
		$('.enemyattack').text(enemy.attack+enemy.attackPenalty);
	}// end of blind condition
	
	if(enemyDaunting==true){ // enemy takes -2 defense penalty from daunting light
		if(dauntingAlert==false){
			$mainDisplay.append('<p>The enemy takes -2 penalty to defense.</p>');
			dauntingAlert=true;
		}
		dauntingSave--;
		enemy.defensePenalty=-2;
		enemyDefense=enemy.defense+enemy.defensePenalty;
		$('.enemydefense').text(enemy.defense+enemy.defensePenalty);
	} // end of defense penalty
	
	if(ongoingFlameStrike==true){ // enemy takes DOT damage from flame strike
		$mainDisplay.append('<p>The enemy takes '+flameDotDamage+' fire damage from Flame Strike.</p>');
		enemyHealth-=flameDotDamage;
	} // end of DOT damage
	
	if(mightySurgeActive==true){ // mighty surge active
		mightySave--;
	} // end of mighty surge
	
	if(enemyDebuffDefense==true){ // enemy takes -2 defense penalty from griffon's wrath
		if(debuffDefenseAlert==false){
			$mainDisplay.append('<p>The enemy takes -2 penalty to defense.</p>');
			debuffDefenseAlert=true;
		}
		debuffDefenseSave--;
		enemy.defensePenalty=-2;
		enemyDefense=enemy.defense+enemy.defensePenalty;
		$('.enemydefense').text(enemy.defense+enemy.defensePenalty);
	} // end of griffon's wrath debuff
	
	if(enemyStun==true){ // enemy becomes stunned from anvil of doom
		$mainDisplay.append('<p>The enemy is stunned.</p>');
		stunSave--;
	} // end of anvil of doom
	
	if(kirresActive==true){ // Kirre's Roar
		kirresSave--;
	} // end of Kirre's Roar
	
	if(rainActive==true){ // when rain of steel is active
		autoDamage=rollDamage(6,2)+yourClass.bonus+2;
		enemyHealth-=autoDamage;
		$mainDisplay.append('<p>The enemy takes '+autoDamage+' damage from Rain of Steel.</p>');
		updateEnemyHealth(yourEnemy);
	} // end of rain of steel
	
	if(gloweringActive==true){ // when glowering threat is used
		enemy.attackPenalty=-5;
		$('.enemyattack').text(enemy.attack+enemy.attackPenalty);
	} // end of glowering threat
	
	if(shieldActive==true){ // Shield is active
		shieldSave--;
	} // end of Shield
	
	if(repellingActive==true){ // Repelling Shield is active
		repellingSave--;
	} // end of repelling shield
	
	if(enemyHealth>0){
		if(enemyStun==false){
			if(enemyLevel==1){
				enemy.sting();
			}else if(enemyLevel==2){
				enemy.maul();
			}else if(enemyLevel==3){
				enemy.slam();
			}else if(enemyLevel==4){
				enemy.claw();
			}else if(enemyLevel==5){
				enemy.bludgeon();
			}else if(enemyLevel==6){
				enemy.slash();
			}else if(enemyLevel==7){
				enemy.whip();
				$menuSpecial.removeClass('disabled');
			}else if(enemyLevel==8){
				enemy.eviscerate();
			}else if(enemyLevel==9){
				enemy.prismaticSpray();
			}else{
				enemy.smash();
			}
		}else{
			enemyAttack=0;
			$mainDisplay.append('<p>The enemy does nothing.</p>');
		}
	}else{
		enemyAttack=0;
		$mainDisplay.append('<p>You defeat the '+yourEnemy.name+'.</p>');
		$enemyCurrentHP.text('0');
		enemyDebuffReset(yourEnemy);
		playerBuffReset(yourClass);
		if(yourEnemy==Balrog){
			$mainDisplay.append('<p id="turnMessage">Congratulations!</p><p id="epilogue">> <span class="flickering">Epilogue</span></p>');
			$abilityPanel.hide();
			var $epilogue=$('#epilogue');
			$epilogue.click(function(){
				gameEnding();
			});
		}else{
			$mainDisplay.append('<p id="nextEnemy">> <span class="flickering">Next</span></p>');
			levelUp(yourClass);
			updateInfo(yourClass);
			$classSkills.removeClass('expended');
			$abilityPanel.hide();
		}
	}
	
	if(invisibilityActive==true){ // Invisibility condition
		enemyAttack=0;
		invisibilitySave--;
	} // end of Invisibility condition
	
	if(enemyAttack>=yourDefense){ // if the enemy attack hits 
		if(enemyStun==false){ // if enemy is not stunned
			$mainDisplay.append('<p>The attack hits and you take '+enemyDamage+' damage.</p>');
			if(kirresActive==true){ // if Kirre's Roar is active
				$mainDisplay.append('<p>You take '+(Math.floor((Dwarf.con-10)/2)+1)+' less damage.</p>');
				yourHealth-=enemyDamage-(Math.floor((Dwarf.con-10)/2)+1);
			}else if(repellingActive==true){ // Repelling Shield condition
				enemyHealth-=enemyDamage;
				$mainDisplay.append('<p>The enemy takes '+enemyDamage+' damage instead.</p>');
				updateEnemyHealth(yourEnemy);
			}else{
				yourHealth-=enemyDamage;
			}
			updateHealth(yourClass);
			if(enemyHealth<=0){ // if the enemy is dead
				enemyAttack=0;
				$mainDisplay.append('<p>You defeat the '+yourEnemy.name+'.</p>');
				$enemyCurrentHP.text('0');
				enemyDebuffReset(yourEnemy);
				playerBuffReset(yourClass);
				if(yourEnemy==Balrog){
					$mainDisplay.append('<p id="turnMessage">Congratulations!</p><p id="epilogue">> <span class="flickering">Epilogue</span></p>');
					$abilityPanel.hide();
					var $epilogue=$('#epilogue');
					$epilogue.click(function(){
						gameEnding();
					});
				}else{
					$mainDisplay.append('<p id="nextEnemy">> <span class="flickering">Next</span></p>');
					levelUp(yourClass);
					updateInfo(yourClass);
					$classSkills.removeClass('expended');
					$abilityPanel.hide();
				}
			}else if(yourHealth<=0){
				$mainDisplay.append('<p>You are defeated.</p>');
				$yourCurrentHP.text('0');
				$abilityPanel.hide();
			}else if(enemyHealth>0){
				$mainDisplay.append('<p id="turnMessage">It\'s your turn.</p>');
			}
		}else{
			if(enemyHealth>0){
				$mainDisplay.append('<p id="turnMessage">It\'s your turn.</p>');
			}
		} // if the enemy is stunned
	}else{
		if(enemyHealth>0){
			if(invisibilityActive==true){
				$mainDisplay.append('<p>But the enemy cannot see you.</p>');
			}else if(enemyStun==false){
				$mainDisplay.append('<p>But you manage to dodge the attack.</p>');
			}
			$mainDisplay.append('<p id="turnMessage">It\'s your turn.</p>');
		}
	} // if the attack misses
	
	if(yourHealth>0 && enemyHealth>0){
		if(blindSave==0){ // after 3 turns
			blindReset();
			$mainDisplay.append('<p>The enemy regains its sight.</p>');
			enemy.attackPenalty=0;
			$('.enemyattack').text(enemy.attack);
		} // blind ends
		
		if(dauntingSave==0){ // after 3 turns
			dauntingReset();
			$mainDisplay.append('<p>The enemy\'s defense becomes normal.</p>');
			enemy.defensePenalty=0;
			enemyDefense=enemy.defense;
			$('.enemydefense').text(enemy.defense);
		} // defense penalty ends
		
		if(mightySave==0){ // after 3 turns
			mightySurgeActive=false;
			mightySave=3;
			$mainDisplay.append('<p>Bonuses from Mighty Surge are gone now.</p>');
			yourClass.attackBonus=0;
			yourClass.defenseBonus=0;
			$('.yourattack').text(yourClass.attack);
			$('.yourdefense').text(yourClass.defense);
		} // mighty surge defense bonus ends
		
		if(debuffDefenseSave==0){ // after 3 turns
			debuffDefenseReset();
			$mainDisplay.append('<p>The enemy\'s defense becomes normal.</p>');
			enemy.defensePenalty=0;
			enemyDefense=enemy.defense;
			$('.enemydefense').text(enemy.defense);
		} // griffon's wrath defense penalty ends
		
		if(stunSave==0){ // after 3 turns
			stunReset();
			$mainDisplay.append('<p>The enemy is no longer stunned.</p>');
		} // stun ends
		
		if(kirresSave==0){ // after 3 turns
			kirresReset();
			$mainDisplay.append('<p>Your Damage Reduction is over.</p>');
		} // kirre's roar ends
		
		if(shieldSave==0){ // after 3 turns
			shieldActive=false;
			shieldSave=3;
			$mainDisplay.append('<p>Your Shield disappears.</p>');
		} // shield ends
		
		if(invisibilitySave==0){ // after 3 turns
			invisibilityReset();
			$mainDisplay.append('<p>You are no longer invisible to the enemy.</p>');
		} // invisibility ends
		
		if(repellingSave==0){ // after 3 turns
			repellingReset();
			$mainDisplay.append('<p>Your Repelling Shield disappears.</p>');
		} // repelling shield ends
	} // condition ends
} // end of enemy's behaviour