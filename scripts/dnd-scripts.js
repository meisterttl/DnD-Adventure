// JavaScript Document

var $characters=$('#human, #dwarf, #elf');
var humanCleric=document.getElementById('human');
var dwarfFighter=document.getElementById('dwarf');
var elfWizard=document.getElementById('elf');

var yourLevel=1;
var actionPoint=2;
var skillClick=0;

var yourInitiative;var yourHealth;var yourAttack;var yourDamage;var yourDefense;
var enemyInitiative;var enemyHealth;var enemyAttack;var enemyDamage;var enemyDefense;

var $yourCurrentHP=$('.yourcurrenthp');var $enemyCurrentHP=$('.enemycurrenthp');

var $mainDisplay=$('.maindisplay');
var $abilityPanel=$('.yourabilities');
var $destination=$('#description p');

var $menuAttack=$('.mainmenu').children('div:first-child');
var $menuSpecial=$('.mainmenu').children('div:nth-child(2)');
var $menuUtilities=$('.mainmenu').children('div:nth-child(3)');
var $menuHeal=$('.mainmenu').children('div:last-child');

var $mainMenuButtons=$('#your_attack, #your_special, #your_utilities, #your_heal');
var $subMenuButtons=$('#human_submenu div p, #dwarf_submenu div p, #elf_submenu div p');

var $classSkills=$('.submenu').children('div').children('div').children('p');

$characters.click(function(){
	$(this).parent('div').hide();
	$menuSpecial.addClass('disabled');
	$menuUtilities.addClass('disabled');
	$abilityPanel.hide();
});

if(humanCleric,dwarfFighter,elfWizard){
	dwarfFighter.addEventListener('click',startEasyGame,true);
	humanCleric.addEventListener('click',startNormalGame,true);
	elfWizard.addEventListener('click',startHardGame,true);
}

function startEasyGame(){
	yourClass=Dwarf;
	yourClass.reset();
	classID='dwarf';
	$('.yourlevel').text(Dwarf.level);
	$('.yourclass').text(Dwarf.class);
	$('.yourweapon').text(Dwarf.weapon);
	$('.yourarmor').text(Dwarf.armor);
	updateInfo(yourClass);
	yourEnemy=Slime;
	updateEnemyInfo(yourEnemy);
	
	var $whoGoesFirst=$('#whoGoesFirst');
	$whoGoesFirst.click(function(){
		yourClass.initiativeRoll();
		yourEnemy.initiativeRoll();
		if(yourInitiative>enemyInitiative){ // if your initiative is higher
			$mainDisplay.append('<p id="turnMessage">You go first!</p>');
			$abilityPanel.show();
			$menuAttack.removeClass('disabled');
			$menuHeal.removeClass('disabled');
		}else if(yourInitiative<enemyInitiative){ // if enemy's initiative is higher
			$mainDisplay.append('<p id="turnMessage">The enemy goes first!</p>');
			enemyMove(yourEnemy);
			$abilityPanel.show();
		}else{ // if your and enemy's initiative are equal
			if(yourClass.initiative>yourEnemy.initiative){ // if your initiative bonus is higher
				$mainDisplay.append('<p id="turnMessage">You go first!</p>');
				$abilityPanel.show();
				$menuAttack.removeClass('disabled');
				$menuHeal.removeClass('disabled');
			}else{ // if your initiative bonus is lower than enemy's
				enemyMove(yourEnemy);
				$abilityPanel.show();
			}
		} // end of if - initiative
		$('.submenu').children('div').children('div').removeClass('appear'); // this hides submenu
	}); // this button begins the game
	
	$subMenuButtons.click(function(){
		var $skillLevel=$(this).attr('id');
		if($skillLevel=='dwarf_lvl1'){ // Brash Strike
			actionPoint-=2
			yourClass.brashStrike();
			if(yourAttack>=enemyDefense){
				enemyHealth-=yourDamage;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+yourDamage+' blunt damage.</p>');
			}else{
				$mainDisplay.append('<p>But you miss.</p>');
			} // end of Brash Strike behaviour
		}else if($skillLevel=='dwarf_heal'){ // Dwarf Healing skills
			if(skillClick>1){
				skillClick=0;
			}
			++skillClick;
			if(yourHealth<yourClass.maxhp){
				actionPoint-=1
				yourClass.healingSurge();
				$(this).addClass('expended');
			}else{
				$mainDisplay.append('<p>You are already at max hit points. You cannot use your healing ability.</p>');
				if(skillClick>1){
					$mainDisplay.children('p:last-child').remove();
					$mainDisplay.html('<p>You are already at max hit points. You cannot use your healing ability.</p>');
				}
			}
			updateHealth(yourClass);
			// end of Healing abilities behaviour
		}else if($skillLevel=='dwarf_lvl2'){ // Mighty Surge
			if(skillClick>1){
				skillClick=0;
			}
			++skillClick;
			if(yourHealth<yourClass.maxhp){
				actionPoint-=1
				yourClass.mightySurge();
				$(this).addClass('expended');
				mightySurgeActive=true;
				playerBuff(yourClass);
			}else{
				$mainDisplay.append('<p>You are already at max hit points. You cannot use your healing ability.</p>');
				if(skillClick>1){
					$mainDisplay.children('p:last-child').remove();
					$mainDisplay.html('<p>You are already at max hit points. You cannot use your healing ability.</p>');
				}
			}
			updateHealth(yourClass);
			// end of Mighty Surge behaviour
		}else if($skillLevel=='dwarf_lvl3'){ // Griffon's Wrath
			actionPoint-=2
			yourClass.griffonsWrath();
			$(this).addClass('expended');
			if(yourAttack>=enemyDefense){
				enemyHealth-=yourDamage;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+yourDamage+' blunt damage. The enemy takes -2 penalty to defense for 3 turns.</p>');
				enemyDebuffDefense=true;
			}else{
				$mainDisplay.append('<p>But you miss.</p>');
			} // end of Searing Brand behaviour
		}else if($skillLevel=='dwarf_lvl4'){ // Rain of Blows
			actionPoint-=2
			yourClass.rainOfBlows();
			$(this).addClass('expended');
			if(yourAttack>=enemyDefense){
				enemyHealth-=yourDamage;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+yourDamage+' blunt damage.</p>');
			}else{
				$mainDisplay.append('<p>You miss the first attack.</p>');
			} 
			if(secondAttack>=enemyDefense){
				enemyHealth-=secondDamage;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+secondDamage+' blunt damage.</p>');
			}else{
				$mainDisplay.append('<p>You miss the second attack.</p>');
			}
			if(lastAttack>=enemyDefense){
				enemyHealth-=lastDamage;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+lastDamage+' blunt damage.</p>');
			}else{
				$mainDisplay.append('<p>You miss the last attack.</p>');
			}
			// end of Rain of Blows behaviour			
		}else if($skillLevel=='dwarf_lvl5'){ // Anvil of Doom
			actionPoint-=2
			yourClass.anvilOfDoom();
			$(this).addClass('expended');
			if(yourAttack>=enemyDefense){
				enemyHealth-=yourDamage;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+yourDamage+' blunt damage. The enemy is now stunned.</p>');
				enemyStun=true;
			}else{
				$mainDisplay.append('<p>But you miss.</p>');
			} // end of Anvil of Doom behaviour
		}else if($skillLevel=='dwarf_lvl6'){ // Kirre's Roar
			actionPoint-=1
			yourClass.kirresRoar();
			$(this).addClass('expended');
			$mainDisplay.append('<p>You take '+(Math.floor((Dwarf.con-10)/2)+1)+' less damage for a 3 turn.</p>');
			// end of Kirre's Roar behaviour
		}else if($skillLevel=='dwarf_lvl7'){ // Driving Attack
			actionPoint-=2
			yourClass.drivingAttack();
			$(this).addClass('expended');
			if(yourAttack>=enemyDefense){
				enemyHealth-=yourDamage;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+yourDamage+' blunt damage.</p>');
				if(followUp>=enemyDefense){
					enemyHealth-=followUpDmg;
					$mainDisplay.append('<p>You successfully hit the enemy and deal an additional '+followUpDmg+' blunt damage.</p>');
				}else{
					$mainDisplay.append('<p>However you miss the follow-up attack.</p>');
				}
			}else{
				$mainDisplay.append('<p>But you miss.</p>');
			} // end of Driving Attack behaviour
		}else if($skillLevel=='dwarf_lvl8'){ // Rain of Steel
			actionPoint-=1
			yourClass.rainOfSteel();
			$(this).addClass('expended');
			$mainDisplay.append('<p>In the beginning of enemy\'s turn, you automatically deal damage to the enemy.</p>');
			// end of Rain of Steel behaviour
		}else if($skillLevel=='dwarf_lvl9'){ // Dancing Defense
			actionPoint-=1
			yourClass.dancingDefense();
			$(this).addClass('expended');
			// end of Dancing Defense behaviour
		}else{ // Glowering Threat
			actionPoint-=1
			yourClass.gloweringThreat();
			$(this).addClass('expended');
		} // end of Glowering Threat behaviour
		updateEnemyHealth(yourEnemy); // Update enemy's health

		var classSubmenu=('#'+classID+'_submenu');
		if(actionPoint<=0){ // Your turn ends
			$(classSubmenu).children('div').removeClass('appear');
			actionPoint=2;		
			if(dancingActive==true){ // when dancing defense is active
				if(yourAttack>=enemyDefense){
					followUp=rollD20()+Dwarf.attack+Dwarf.bonus+Dwarf.attackBonus;
					followUpDmg=rollDamage(6,2)+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2;
					$mainDisplay.append('<p>You successfully hit the enemy and deal an additional '+followUpDmg+' blunt damage from Dancing Defense.</p>');
				}else if(secondAttack>=enemyDefense){
					followUp=rollD20()+Dwarf.attack+Dwarf.bonus+Dwarf.attackBonus;
					followUpDmg=rollDamage(6,2)+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2;
					$mainDisplay.append('<p>You successfully hit the enemy and deal an additional '+followUpDmg+' blunt damage from Dancing Defense.</p>');
				}else if(lastAttack>=enemyDefense){
					followUp=rollD20()+Dwarf.attack+Dwarf.bonus+Dwarf.attackBonus;
					followUpDmg=rollDamage(6,2)+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2;
					$mainDisplay.append('<p>You successfully hit the enemy and deal an additional '+followUpDmg+' blunt damage from Dancing Defense.</p>');
				}
			} // end of Dancing Defense
			secondAttack=0;
			lastAttack=0;
			if(enemyHealth>0){ // Enemy's turn begins
				$abilityPanel.hide();
				$mainDisplay.append('<p id="turnMessage">It\'s the enemy\'s turn.</p>');
				enemyMove(yourEnemy);
				if(yourHealth>0 && enemyHealth>0){
					$abilityPanel.show();
				}
			}else{ // Enemy dies
				$enemyCurrentHP.text('0');
				enemyDebuffReset(yourEnemy);
				playerBuffReset(yourClass);
				if(yourLevel<10){
					levelUp(yourClass);
				}
				updateInfo(yourClass);
				$classSkills.removeClass('expended');
				$abilityPanel.hide();
				$mainDisplay.append('<p id="turnMessage">You defeat the '+yourEnemy.name+'!</p>');
				if(enemyLevel==1){ // end of Slime Battle
					$menuUtilities.removeClass('disabled');
					$mainDisplay.append('<p>You are now Level 2. You gain a new utility skill \'Mighty Surge\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==2){ // end of Dire Bear Battle
					$mainDisplay.append('<p>You are now Level 3. You gain a new Attack Skill \'Griffon\'s Wrath\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==3){ // end of Treant Battle
					$mainDisplay.append('<p>You are now Level 4. You gain a new Attack Skill \'Rain of Blows\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==4){ // end of Werewolf Battle
					$mainDisplay.append('<p>You are now Level 5. You gain a new Attack Skill \'Anvil of Doom\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==5){ // end of Orc Guardian Battle
					$mainDisplay.append('<p>You are now Level 6. You gain a new Utility Skill \'Kirre\'s Roar\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==6){ // end of Undead Skeleton Battle
					$menuSpecial.removeClass('disabled');
					$mainDisplay.append('<p>You are now Level 7. You gain a new Special Skill \'Driving Attack\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==7){ // end of Succubus Battle
					$mainDisplay.append('<p>You are now Level 8. You gain a new Special Skill \'Rain of Steel\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==8){ // end of Abomination Battle
					$mainDisplay.append('<p>You are now Level 9. You gain a new Special Skill \'Dancing Defense\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==9){ // end of Lich Battle
					$mainDisplay.append('<p>You are now Level 10. You gain a new Special Skill \'Glowering Threat\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else{ // end of Balrog Battle
					$mainDisplay.append('<p id="turnMessage">Congratulations!</p><p id="epilogue">> <span class="flickering">Epilogue</span></p>');
					var $epilogue=$('#epilogue');
					$epilogue.click(function(){
						gameEnding();
					});
				} // You beat the game
			} // end of enemying dying behaviour
		}else if(actionPoint==1){ // end of your turn
			$mainDisplay.append('<p>You can perform one more action.</p>');
		}
		
		var $nextEnemy=$('#nextEnemy');
		$nextEnemy.click(function(){
			if(enemyLevel==1){ // When Slime is defeated
				yourEnemy=Direbear;
				$mainDisplay.html('<p>After you defeat the Slime, you continue your journey.</p><p>You see a incredibly giant Dire Bear blocking your path.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==2){ // When Dire Bear is defeated
				yourEnemy=Treant;
				$mainDisplay.html('<p>After you defeat the Bear, you continue your journey through the forest.</p><p>You suddenly see a tree coming to life.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==3){ // When Treant is defeated
				yourEnemy=Werewolf;
				$mainDisplay.html('<p>After you defeat the Treant, you set up a camp to rest. It\'s a full moon tonight.</p><p>You suddenly hear the sound of wolf howling and see a werewolf running toward you.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==4){ // When Werewolf is defeated
				yourEnemy=OrcGuardian;
				$mainDisplay.html('<p>After you defeat the Werewolf, you fall asleep immediately. When you wake up, you feel refreshed.</p><p>Next morning, you arrive at Balrog\'s fortress and you see a muscular Orc guarding the gate.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==5){ // When Orc Guardian is defeated
				yourEnemy=UndeadSkeleton;
				$mainDisplay.html('<p>After you defeat the Orc Gate Guard, you explore the castle to find Balrog\'s chamber.</p><p>On the second floor, you see an undead skeleton wondering around with a nasty-looking axe and a shield.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==6){ // When Undead Skeleton is defeated
				yourEnemy=Succubus;
				$mainDisplay.html('<p>After you defeat the Undead Skeleton, you look for a place to rest.</p><p>On the third floor, you see a beautiful woman sitting by the fire.</p><p>When she sees you, you sense animosity coming toward you and she slowly turns into a succubus.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==7){ // When Succubus is defeated
				yourEnemy=Abomination;
				$mainDisplay.html('<p>After you defeat the Succubus, you make sure the immediate area is secured and rest your exhaused body.</p><p>You feel refreshed and leave the area.</p><p>On the fourth floor, you see a disgusting, disease-ridden creature waiting for you.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==8){ // When Abomination is defeated
				yourEnemy=Lich;
				$mainDisplay.html('<p>After you defeat the Demonic Abomination, you sense someone or something piercing with a chilling gaze.</p><p>You don\'t find any enemy around the immediate area but on the fifth floor, you see a Lich.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else{ // When Lich is defeated
				yourEnemy=Balrog;
				$mainDisplay.html('<p>After you defeat the Lich, you ascend the final stairway to face the mighty Demon Lord, Balrog.</p><p>On the roof, you see a 20ft tall giant fiery demon about to obliterate you to pieces.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}
			updateEnemyInfo(yourEnemy);
			
			var $whoGoesFirst=$('#whoGoesFirst');
			$whoGoesFirst.click(function(){
				yourClass.initiativeRoll();
				yourEnemy.initiativeRoll();
				$abilityPanel.show();
				if(yourInitiative>enemyInitiative){ // if your initiative is higher
					$mainDisplay.append('<p id="turnMessage">You go first!</p>');
				}else if(yourInitiative<enemyInitiative){ // if enemy's initiative is higher
					$mainDisplay.append('<p id="turnMessage">The enemy goes first!</p>');
					enemyMove(yourEnemy);
				}else{ // if your and enemy's initiative are equal
					if(yourClass.initiative>yourEnemy.initiative){ // if your initiative bonus is higher
						$mainDisplay.append('<p id="turnMessage">You go first!</p>');
					}else{ // if your initiative bonus is lower than enemy's
						enemyMove(yourEnemy);
					}
				} // end of if - initiative
				$('.submenu').children('div').children('div').removeClass('appear'); // this hides submenu
			}); // this button begins the game
			
		}); // You level up and move on to the next level.
	}); // end of Sub Menu click behaviour
} // Dwarf Fighter - Easy Difficulty

function startNormalGame(){
	yourClass=Human;
	yourClass.reset();
	classID='human';
	$('.yourlevel').text(Human.level);
	$('.yourclass').text(Human.class);
	$('.yourweapon').text(Human.weapon);
	$('.yourarmor').text(Human.armor);
	updateInfo(yourClass);
	yourEnemy=Slime;
	updateEnemyInfo(yourEnemy);

	var $whoGoesFirst=$('#whoGoesFirst');
	$whoGoesFirst.click(function(){
		yourClass.initiativeRoll();
		yourEnemy.initiativeRoll();
		if(yourInitiative>enemyInitiative){ // if your initiative is higher
			$mainDisplay.append('<p id="turnMessage">You go first!</p>');
			$abilityPanel.show();
			$menuAttack.removeClass('disabled');
			$menuHeal.removeClass('disabled');
		}else if(yourInitiative<enemyInitiative){ // if enemy's initiative is higher
			$mainDisplay.append('<p id="turnMessage">The enemy goes first!</p>');
			enemyMove(yourEnemy);
			$abilityPanel.show();
		}else{ // if your and enemy's initiative are equal
			if(yourClass.initiative>yourEnemy.initiative){ // if your initiative bonus is higher
				$mainDisplay.append('<p id="turnMessage">You go first!</p>');
				$abilityPanel.show();
				$menuAttack.removeClass('disabled');
				$menuHeal.removeClass('disabled');
			}else{ // if your initiative bonus is lower than enemy's
				enemyMove(yourEnemy);
				$abilityPanel.show();
			}
		} // end of if - initiative
		$('.submenu').children('div').children('div').removeClass('appear'); // this hides submenu
	}); // this button begins the game

	$subMenuButtons.click(function(){
		var $skillLevel=$(this).attr('id');
		if($skillLevel=='human_lvl1'){ // Sacred Flame
			actionPoint-=2
			yourClass.sacredFlame();
			if(yourAttack>=enemyDefense){
				enemyHealth-=yourDamage;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+yourDamage+' holy damage.</p>');
			}else{
				$mainDisplay.append('<p>But you miss.</p>');
			} // end of Sacred Flame behaviour
		}else if($skillLevel=='human_heal1' || $skillLevel=='human_heal2' || $skillLevel=='human_heal3'){ // Human Healing skills
			if(skillClick>1){
				skillClick=0;
			}
			++skillClick;
			if(yourHealth<yourClass.maxhp){
				actionPoint-=1
				yourClass.healingSurge();
				$(this).addClass('expended');
			}else{
				$mainDisplay.append('<p>You are already at max hit points. You cannot use your healing ability.</p>');
				if(skillClick>1){
					$mainDisplay.children('p:last-child').remove();
					$mainDisplay.html('<p>You are already at max hit points. You cannot use your healing ability.</p>');
				}
			}
			updateHealth(yourClass);
			// end of Healing abilities behaviour
		}else if($skillLevel=='human_lvl2'){ // Cure Serious Wound
			if(skillClick>1){
				skillClick=0;
			}
			++skillClick;
			if(yourHealth<yourClass.maxhp){
				actionPoint-=1
				yourClass.cureSeriousWound();
				$(this).addClass('expended');
			}else{
				$mainDisplay.append('<p>You are already at max hit points. You cannot use your healing ability.</p>');
				if(skillClick>1){
					$mainDisplay.children('p:last-child').remove();
					$mainDisplay.html('<p>You are already at max hit points. You cannot use your healing ability.</p>');
				}
			}
			updateHealth(yourClass);
			// end of Cure Serious Wound behaviour
		}else if($skillLevel=='human_lvl3'){ // Searing Brand
			actionPoint-=2
			yourClass.searingBrand();
			$(this).addClass('expended');
			if(yourAttack>=enemyDefense){
				enemyHealth-=yourDamage;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+yourDamage+' holy damage. The enemy is now blinded.</p>');
				enemyBlind=true;
			}else{
				$mainDisplay.append('<p>But you miss.</p>');
			} // end of Searing Brand behaviour
		}else if($skillLevel=='human_lvl4'){ // Sundering Might
			actionPoint-=2
			yourClass.sunderingMight();
			$(this).addClass('expended');
			if(yourAttack>=enemyDefense){
				enemyHealth-=yourDamage;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+yourDamage+' blunt damage.</p>');
			}else{
				$mainDisplay.append('<p>But you miss.</p>');
			} // end of Sundering Might behaviour
		}else if($skillLevel=='human_lvl5'){ // Daunting Light
			actionPoint-=2
			yourClass.dauntingLight();
			$(this).addClass('expended');
			if(yourAttack>=enemyDefense){
				enemyHealth-=yourDamage;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+yourDamage+' holy damage.</p>');
				enemyDaunting=true;
			}else{
				$mainDisplay.append('<p>But you miss.</p>');
			} // end of Daunting Light behaviour
		}else if($skillLevel=='human_lvl6'){ // Bless
			actionPoint-=1
			yourClass.bless();
			$(this).addClass('expended');
			$mainDisplay.append('<p>You gain a +2 bonus to your attacks until the battle ends.</p>');
			playerBuff(yourClass);
			// end of Bless behaviour
		}else if($skillLevel=='human_lvl7'){ // Punish the Profane
			actionPoint-=2
			yourClass.punishTheProfane();
			$(this).addClass('expended');
			if(yourAttack>=enemyDefense){
				enemyHealth-=yourDamage;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+yourDamage+' holy damage.</p>');
				if(followUp>=enemyDefense){
					enemyHealth-=followUpDmg;
					$mainDisplay.append('<p>You successfully hit the enemy and deal an additional '+followUpDmg+' holy damage.</p>');
				}else{
					$mainDisplay.append('<p>However you miss the follow-up attack.</p>');
				}
			}else{
				$mainDisplay.append('<p>But you miss.</p>');
			} // end of Punish the Profane behaviour
		}else if($skillLevel=='human_lvl8'){ // Divine Juggernaut
			actionPoint-=2
			yourClass.divineJuggernaut();
			$(this).addClass('expended');
			if(yourAttack>=enemyDefense){
				enemyHealth-=yourDamage;
				healAmount=Human.maxhp-yourHealth;
				yourHealth=Human.maxhp;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+yourDamage+' blunt damage.</p>');
				updateHealth(yourClass);
				$mainDisplay.append('<p>You regain '+healAmount+' HP.</p>');
				$mainDisplay.append('<p>The enemy takes -2 penalty to its defense for 3 turns.</p>');
			}else{
				$mainDisplay.append('<p>But you miss.</p>');
			} // end of Divine Juggernaut behaviour
		}else if($skillLevel=='human_lvl9'){ // Flame Strike
			actionPoint-=2
			yourClass.flameStrike();
			$(this).addClass('expended');
			if(yourAttack>=enemyDefense){
				enemyHealth-=yourDamage;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+yourDamage+' fire damage.</p>');
				$mainDisplay.append('<p>The enemy will take additional '+flameDotDamage+' fire damage in the beginning of its turn until the battle ends.</p>');
				ongoingFlameStrike=true;
			}else{
				enemyHealth-=Math.floor(yourDamage/2);
				$mainDisplay.append('<p>But you miss. You still deal '+Math.floor(yourDamage/2)+' fire damage to the enemy although it\'s not very effective.</p>');
			} // end of Flame Strike behaviour
		}else{ // Shielding Word
			actionPoint-=1
			yourClass.shieldingWord();
			$(this).addClass('expended');
			playerBuff(yourClass);
		} // end of Shielding Word behaviour
		updateEnemyHealth(yourEnemy); // Update enemy's health

		var classSubmenu=('#'+classID+'_submenu');
		if(actionPoint<=0){ // Your turn ends
			$(classSubmenu).children('div').removeClass('appear');
			actionPoint=2;
			if(enemyHealth>0){ // Enemy's turn begins
				$abilityPanel.hide();
				$mainDisplay.append('<p id="turnMessage">It\'s the enemy\'s turn.</p>');
				enemyMove(yourEnemy);
				if(yourHealth>0 && enemyHealth>0){
					$abilityPanel.show();
				}
			}else{ // Enemy dies
				$enemyCurrentHP.text('0');
				enemyDebuffReset(yourEnemy);
				playerBuffReset(yourClass);
				if(yourLevel<10){
					levelUp(yourClass);
				}
				updateInfo(yourClass);
				$classSkills.removeClass('expended');
				$abilityPanel.hide();
				$mainDisplay.append('<p id="turnMessage">You defeat the '+yourEnemy.name+'!</p>');
				if(enemyLevel==1){ // end of Slime Battle
					$menuUtilities.removeClass('disabled');
					$mainDisplay.append('<p>You are now Level 2. You gain a new utility skill \'Cure Serious Wound\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==2){ // end of Dire Bear Battle
					$mainDisplay.append('<p>You are now Level 3. You gain a new Attack Skill \'Searing Brand\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==3){ // end of Treant Battle
					$mainDisplay.append('<p>You are now Level 4. You gain a new Attack Skill \'Sundering Might\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==4){ // end of Werewolf Battle
					$mainDisplay.append('<p>You are now Level 5. You gain a new Attack Skill \'Daunting Light\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==5){ // end of Orc Guardian Battle
					$mainDisplay.append('<p>You are now Level 6. You gain a new Utility Skill \'Bless\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==6){ // end of Undead Skeleton Battle
					$menuSpecial.removeClass('disabled');
					$mainDisplay.append('<p>You are now Level 7. You gain a new Special Skill \'Punish the Profane\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==7){ // end of Succubus Battle
					$mainDisplay.append('<p>You are now Level 8. You gain a new Special Skill \'Divine Juggernaut\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==8){ // end of Abomination Battle
					$mainDisplay.append('<p>You are now Level 9. You gain a new Special Skill \'Flame Strike\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==9){ // end of Lich Battle
					$mainDisplay.append('<p>You are now Level 10. You gain a new Special Skill \'Shielding Word\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else{ // end of Balrog Battle
					$mainDisplay.append('<p id="turnMessage">Congratulations!</p><p id="epilogue">> <span class="flickering">Epilogue</span></p>');
					var $epilogue=$('#epilogue');
					$epilogue.click(function(){
						gameEnding();
					});
				} // You beat the game
			} // end of enemying dying behaviour
		}else if(actionPoint==1){ // end of your turn
			$mainDisplay.append('<p>You can perform one more action.</p>');
		}

		var $nextEnemy=$('#nextEnemy');
		$nextEnemy.click(function(){
			if(enemyLevel==1){ // When Slime is defeated
				yourEnemy=Direbear;
				$mainDisplay.html('<p>After you defeat the Slime, you continue your journey.</p><p>You see a incredibly giant Dire Bear blocking your path.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==2){ // When Dire Bear is defeated
				yourEnemy=Treant;
				$mainDisplay.html('<p>After you defeat the Bear, you continue your journey through the forest.</p><p>You suddenly see a tree coming to life.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==3){ // When Treant is defeated
				yourEnemy=Werewolf;
				$mainDisplay.html('<p>After you defeat the Treant, you set up a camp to rest. It\'s a full moon tonight.</p><p>You suddenly hear the sound of wolf howling and see a werewolf running toward you.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==4){ // When Werewolf is defeated
				yourEnemy=OrcGuardian;
				$mainDisplay.html('<p>After you defeat the Werewolf, you fall asleep immediately. When you wake up, you feel refreshed.</p><p>Next morning, you arrive at Balrog\'s fortress and you see a muscular Orc guarding the gate.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==5){ // When Orc Guardian is defeated
				yourEnemy=UndeadSkeleton;
				$mainDisplay.html('<p>After you defeat the Orc Gate Guard, you explore the castle to find Balrog\'s chamber.</p><p>On the second floor, you see an undead skeleton wondering around with a nasty-looking axe and a shield.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==6){ // When Undead Skeleton is defeated
				yourEnemy=Succubus;
				$mainDisplay.html('<p>After you defeat the Undead Skeleton, you look for a place to rest.</p><p>On the third floor, you see a beautiful woman sitting by the fire.</p><p>When she sees you, you sense animosity coming toward you and she slowly turns into a succubus.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==7){ // When Succubus is defeated
				yourEnemy=Abomination;
				$mainDisplay.html('<p>After you defeat the Succubus, you make sure the immediate area is secured and rest your exhaused body.</p><p>You feel refreshed and leave the area.</p><p>On the fourth floor, you see a disgusting, disease-ridden creature waiting for you.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==8){ // When Abomination is defeated
				yourEnemy=Lich;
				$mainDisplay.html('<p>After you defeat the Demonic Abomination, you sense someone or something piercing with a chilling gaze.</p><p>You don\'t find any enemy around the immediate area but on the fifth floor, you see a Lich.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else{ // When Lich is defeated
				yourEnemy=Balrog;
				$mainDisplay.html('<p>After you defeat the Lich, you ascend the final stairway to face the mighty Demon Lord, Balrog.</p><p>On the roof, you see a 20ft tall giant fiery demon about to obliterate you to pieces.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}
			updateEnemyInfo(yourEnemy);
			
			var $whoGoesFirst=$('#whoGoesFirst');
			$whoGoesFirst.click(function(){
				yourClass.initiativeRoll();
				yourEnemy.initiativeRoll();
				$abilityPanel.show();
				if(yourInitiative>enemyInitiative){ // if your initiative is higher
					$mainDisplay.append('<p id="turnMessage">You go first!</p>');
				}else if(yourInitiative<enemyInitiative){ // if enemy's initiative is higher
					$mainDisplay.append('<p id="turnMessage">The enemy goes first!</p>');
					enemyMove(yourEnemy);
				}else{ // if your and enemy's initiative are equal
					if(yourClass.initiative>yourEnemy.initiative){ // if your initiative bonus is higher
						$mainDisplay.append('<p id="turnMessage">You go first!</p>');
					}else{ // if your initiative bonus is lower than enemy's
						enemyMove(yourEnemy);
					}
				} // end of if - initiative
				$('.submenu').children('div').children('div').removeClass('appear'); // this hides submenu
			}); // this button begins the game
			
		}); // You level up and move on to the next level.
	}); // end of Sub Menu click behaviour
} // Human Cleric - Normal Difficulty

function startHardGame(){
	yourClass=Elf;
	yourClass.reset();
	classID='elf';
	$('.yourlevel').text(Elf.level);
	$('.yourclass').text(Elf.class);
	$('.yourweapon').text(Elf.weapon);
	$('.yourarmor').text(Elf.armor);
	updateInfo(yourClass);
	yourEnemy=Slime;
	updateEnemyInfo(yourEnemy);
	
	var $whoGoesFirst=$('#whoGoesFirst');
	$whoGoesFirst.click(function(){
		yourClass.initiativeRoll();
		yourEnemy.initiativeRoll();
		if(yourInitiative>enemyInitiative){ // if your initiative is higher
			$mainDisplay.append('<p id="turnMessage">You go first!</p>');
			$abilityPanel.show();
			$menuAttack.removeClass('disabled');
			$menuHeal.removeClass('disabled');
		}else if(yourInitiative<enemyInitiative){ // if enemy's initiative is higher
			$mainDisplay.append('<p id="turnMessage">The enemy goes first!</p>');
			enemyMove(yourEnemy);
			$abilityPanel.show();
		}else{ // if your and enemy's initiative are equal
			if(yourClass.initiative>yourEnemy.initiative){ // if your initiative bonus is higher
				$mainDisplay.append('<p id="turnMessage">You go first!</p>');
				$abilityPanel.show();
				$menuAttack.removeClass('disabled');
				$menuHeal.removeClass('disabled');
			}else{ // if your initiative bonus is lower than enemy's
				enemyMove(yourEnemy);
				$abilityPanel.show();
			}
		} // end of if - initiative
		$('.submenu').children('div').children('div').removeClass('appear'); // this hides submenu
	}); // this button begins the game

	$subMenuButtons.click(function(){
		var $skillLevel=$(this).attr('id');
		if($skillLevel=='elf_lvl1'){ // Magic Missile
			actionPoint-=2
			yourClass.magicMissile();
			enemyHealth-=yourDamage;
			$mainDisplay.append('<p>You deal automatic '+yourDamage+' force damage.</p>');
			// end of Magic Missile behaviour
		}else if($skillLevel=='elf_heal'){ // Elf Healing skills
			if(skillClick>1){
				skillClick=0;
			}
			++skillClick;
			if(yourHealth<yourClass.maxhp){
				actionPoint-=1
				yourClass.healingSurge();
				$(this).addClass('expended');
			}else{
				$mainDisplay.append('<p>You are already at max hit points. You cannot use your healing ability.</p>');
				if(skillClick>1){
					$mainDisplay.children('p:last-child').remove();
					$mainDisplay.html('<p>You are already at max hit points. You cannot use your healing ability.</p>');
				}
			}
			updateHealth(yourClass);
			// end of Healing abilities behaviour
		}else if($skillLevel=='elf_lvl2'){ // Shield
			actionPoint-=1
			yourClass.shield();
			$(this).addClass('expended');
			$mainDisplay.append('<p>You gain +4 bonus to your defense for 3 turns.</p>');
			playerBuff(yourClass);
			// end of Shield behaviour
		}else if($skillLevel=='elf_lvl3'){ // Burning Hand
			actionPoint-=2
			yourClass.burningHand();
			$(this).addClass('expended');
			if(yourAttack>=enemyDefense){
				enemyHealth-=yourDamage;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+yourDamage+' fire damage.</p>');
			}else{
				enemyHealth-=Math.floor(yourDamage/2);
				$mainDisplay.append('<p>But you miss. You still deal '+Math.floor(yourDamage/2)+' fire damage to the enemy although it\'s not very effective.</p>');
			} // end of Burning Hand behaviour
		}else if($skillLevel=='elf_lvl4'){ // Ray of Frost
			actionPoint-=2
			yourClass.rayOfFrost();
			$(this).addClass('expended');
			if(yourAttack>=enemyDefense){
				enemyHealth-=yourDamage;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+yourDamage+' ice damage.</p>');
			}else{
				enemyHealth-=Math.floor(yourDamage/2);
				$mainDisplay.append('<p>But you miss. You still deal '+Math.floor(yourDamage/2)+' ice damage to the enemy although it\'s not very effective.</p>');
			} // end of Ray of Frost behaviour
		}else if($skillLevel=='elf_lvl5'){ // Lightning Bolt
			actionPoint-=2
			yourClass.lightningBolt();
			$(this).addClass('expended');
			if(yourAttack>=enemyDefense){
				enemyHealth-=yourDamage;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+yourDamage+' lightning damage.</p>');
			}else{
				enemyHealth-=Math.floor(yourDamage/2);
				$mainDisplay.append('<p>But you miss. You still deal '+Math.floor(yourDamage/2)+' lightning damage to the enemy although it\'s not very effective.</p>');
			} // end of Lightning Bolt behaviour
		}else if($skillLevel=='elf_lvl6'){ // Invisibility
			actionPoint-=1
			yourClass.invisibility();
			$(this).addClass('expended');
			// end of Invisibility behaviour
		}else if($skillLevel=='elf_lvl7'){ // Acid Arrow
			actionPoint-=2
			yourClass.acidArrow();
			$(this).addClass('expended');
			if(yourAttack>=enemyDefense){ // First Acid Arrow
				enemyHealth-=yourDamage;
				$mainDisplay.append('<p>Your first arrow hit the enemy and deal '+yourDamage+' acid damage.</p>');
			}else{
				enemyHealth-=Math.floor(yourDamage/2);
				$mainDisplay.append('<p>First arrow miss. You still deal '+Math.floor(yourDamage/2)+' acid damage to the enemy although it\'s not very effective.</p>');
			} // end of First Acid Arrow behaviour
			if(secondAttack>=enemyDefense){ // Second Acid Arrow
				enemyHealth-=secondDamage;
				$mainDisplay.append('<p>Your second arrow hit the enemy and deal '+secondDamage+' acid damage.</p>');
			}else{
				enemyHealth-=Math.floor(yourDamage/2);
				$mainDisplay.append('<p>Second arrow misses. You still deal '+Math.floor(secondDamage/2)+' acid damage to the enemy although it\'s not very effective.</p>');
			} // end of Second Acid Arrow behaviour
		}else if($skillLevel=='elf_lvl8'){ // Fireball
			actionPoint-=2
			yourClass.fireball();
			$(this).addClass('expended');
			if(yourAttack>=enemyDefense){
				enemyHealth-=yourDamage;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+yourDamage+' fire damage.</p>');
			}else{
				enemyHealth-=Math.floor(yourDamage/2);
				$mainDisplay.append('<p>But you miss. You still deal '+Math.floor(yourDamage/2)+' fire damage to the enemy although it\'s not very effective.</p>');
			} // end of Fireball behaviour
		}else if($skillLevel=='elf_lvl9'){ // Ice Storm
			actionPoint-=2
			yourClass.iceStorm();
			$(this).addClass('expended');
			if(yourAttack>=enemyDefense){
				enemyHealth-=yourDamage;
				$mainDisplay.append('<p>You successfully hit the enemy and deal '+yourDamage+' ice damage.</p>');
			}else{
				enemyHealth-=Math.floor(yourDamage/2);
				$mainDisplay.append('<p>But you miss. You still deal '+Math.floor(yourDamage/2)+' ice damage to the enemy although it\'s not very effective.</p>');
			} // end of Ice Storm behaviour
		}else{ // Repelling Shield
			actionPoint-=1
			yourClass.repellingShield();
			$(this).addClass('expended');
		} // end of Repelling Shield behaviour
		updateEnemyHealth(yourEnemy); // Update enemy's health

		var classSubmenu=('#'+classID+'_submenu');
		if(actionPoint<=0){ // Your turn ends
			$(classSubmenu).children('div').removeClass('appear');
			actionPoint=2;
			if(enemyHealth>0){ // Enemy's turn begins
				$abilityPanel.hide();
				$mainDisplay.append('<p id="turnMessage">It\'s the enemy\'s turn.</p>');
				enemyMove(yourEnemy);
				if(yourHealth>0 && enemyHealth>0){
					$abilityPanel.show();
				}
			}else{ // Enemy dies
				$enemyCurrentHP.text('0');
				enemyDebuffReset(yourEnemy);
				playerBuffReset(yourClass);
				if(yourLevel<10){
					levelUp(yourClass);
				}
				updateInfo(yourClass);
				$classSkills.removeClass('expended');
				$abilityPanel.hide();
				$mainDisplay.append('<p id="turnMessage">You defeat the '+yourEnemy.name+'!</p>');
				if(enemyLevel==1){ // end of Slime Battle
					$menuUtilities.removeClass('disabled');
					$mainDisplay.append('<p>You are now Level 2. You gain a new utility skill \'Shield\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==2){ // end of Dire Bear Battle
					$mainDisplay.append('<p>You are now Level 3. You gain a new Attack Skill \'Burning Hand\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==3){ // end of Treant Battle
					$mainDisplay.append('<p>You are now Level 4. You gain a new Attack Skill \'Ray of Frost\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==4){ // end of Werewolf Battle
					$mainDisplay.append('<p>You are now Level 5. You gain a new Attack Skill \'Lightning Bolt\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==5){ // end of Orc Guardian Battle
					$mainDisplay.append('<p>You are now Level 6. You gain a new Utility Skill \'Invisibility\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==6){ // end of Undead Skeleton Battle
					$menuSpecial.removeClass('disabled');
					$mainDisplay.append('<p>You are now Level 7. You gain a new Special Skill \'Acid Arrow\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==7){ // end of Succubus Battle
					$mainDisplay.append('<p>You are now Level 8. You gain a new Special Skill \'Fireball\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==8){ // end of Abomination Battle
					$mainDisplay.append('<p>You are now Level 9. You gain a new Special Skill \'Ice Storm\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else if(enemyLevel==9){ // end of Lich Battle
					$mainDisplay.append('<p>You are now Level 10. You gain a new Special Skill \'Repelling Shield\'.</p><p id="nextEnemy">> <span class="flickering">Next</span></p>');
				}else{ // end of Balrog Battle
					$mainDisplay.append('<p id="turnMessage">Congratulations!</p><p id="epilogue">> <span class="flickering">Epilogue</span></p>');
					var $epilogue=$('#epilogue');
					$epilogue.click(function(){
						gameEnding();
					});
				} // You beat the game
			} // end of enemying dying behaviour
		}else if(actionPoint==1){ // end of your turn
			$mainDisplay.append('<p>You can perform one more action.</p>');
		}

		var $nextEnemy=$('#nextEnemy');
		$nextEnemy.click(function(){
			if(enemyLevel==1){ // When Slime is defeated
				yourEnemy=Direbear;
				$mainDisplay.html('<p>After you defeat the Slime, you continue your journey.</p><p>You see a incredibly giant Dire Bear blocking your path.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==2){ // When Dire Bear is defeated
				yourEnemy=Treant;
				$mainDisplay.html('<p>After you defeat the Bear, you continue your journey through the forest.</p><p>You suddenly see a tree coming to life.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==3){ // When Treant is defeated
				yourEnemy=Werewolf;
				$mainDisplay.html('<p>After you defeat the Treant, you set up a camp to rest. It\'s a full moon tonight.</p><p>You suddenly hear the sound of wolf howling and see a werewolf running toward you.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==4){ // When Werewolf is defeated
				yourEnemy=OrcGuardian;
				$mainDisplay.html('<p>After you defeat the Werewolf, you fall asleep immediately. When you wake up, you feel refreshed.</p><p>Next morning, you arrive at Balrog\'s fortress and you see a muscular Orc guarding the gate.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==5){ // When Orc Guardian is defeated
				yourEnemy=UndeadSkeleton;
				$mainDisplay.html('<p>After you defeat the Orc Gate Guard, you explore the castle to find Balrog\'s chamber.</p><p>On the second floor, you see an undead skeleton wondering around with a nasty-looking axe and a shield.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==6){ // When Undead Skeleton is defeated
				yourEnemy=Succubus;
				$mainDisplay.html('<p>After you defeat the Undead Skeleton, you look for a place to rest.</p><p>On the third floor, you see a beautiful woman sitting by the fire.</p><p>When she sees you, you sense animosity coming toward you and she slowly turns into a succubus.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==7){ // When Succubus is defeated
				yourEnemy=Abomination;
				$mainDisplay.html('<p>After you defeat the Succubus, you make sure the immediate area is secured and rest your exhaused body.</p><p>You feel refreshed and leave the area.</p><p>On the fourth floor, you see a disgusting, disease-ridden creature waiting for you.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else if(enemyLevel==8){ // When Abomination is defeated
				yourEnemy=Lich;
				$mainDisplay.html('<p>After you defeat the Demonic Abomination, you sense someone or something piercing with a chilling gaze.</p><p>You don\'t find any enemy around the immediate area but on the fifth floor, you see a Lich.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}else{ // When Lich is defeated
				yourEnemy=Balrog;
				$mainDisplay.html('<p>After you defeat the Lich, you ascend the final stairway to face the mighty Demon Lord, Balrog.</p><p>On the roof, you see a 20ft tall giant fiery demon about to obliterate you to pieces.</p><p id="whoGoesFirst">&gt; <span class="flickering">Click here to Roll Initiative.</span></p>');
			}
			updateEnemyInfo(yourEnemy);
			
			var $whoGoesFirst=$('#whoGoesFirst');
			$whoGoesFirst.click(function(){
				yourClass.initiativeRoll();
				yourEnemy.initiativeRoll();
				$abilityPanel.show();
				if(yourInitiative>enemyInitiative){ // if your initiative is higher
					$mainDisplay.append('<p id="turnMessage">You go first!</p>');
				}else if(yourInitiative<enemyInitiative){ // if enemy's initiative is higher
					$mainDisplay.append('<p id="turnMessage">The enemy goes first!</p>');
					enemyMove(yourEnemy);
				}else{ // if your and enemy's initiative are equal
					if(yourClass.initiative>yourEnemy.initiative){ // if your initiative bonus is higher
						$mainDisplay.append('<p id="turnMessage">You go first!</p>');
					}else{ // if your initiative bonus is lower than enemy's
						enemyMove(yourEnemy);
					}
				} // end of if - initiative
				$('.submenu').children('div').children('div').removeClass('appear'); // this hides submenu
			}); // this button begins the game
			
		}); // You level up and move on to the next level.
	}); // end of Sub Menu click behaviour
}// Elf Wizard - Hard Difficulty

$mainMenuButtons.click(function(){
	var subMenuID=$(this).attr('id').split('_');
	var classSubmenu=('#'+classID+'_submenu');
	var targetSubmenu=('#'+classID+'_'+subMenuID[1]);
	$(targetSubmenu).addClass('appear');
	$(targetSubmenu).siblings('div').removeClass('appear');
	$(targetSubmenu).children('p').addClass('hideskill');
	if(yourLevel==1){
		$(classSubmenu).children('div:first-child').children('p:first-child').removeClass('hideskill');
		$(classSubmenu).children('div:last-child').children('p').removeClass('hideskill');
	}else if(yourLevel==2){
		$(classSubmenu).children('div:first-child, div:nth-child(3)').children('p:first-child').removeClass('hideskill');
		$(classSubmenu).children('div:last-child').children('p').removeClass('hideskill');
	}else if(yourLevel==3){
		$(classSubmenu).children('div:first-child').children('p:first-child, p:nth-child(2)').removeClass('hideskill');
		$(classSubmenu).children('div:nth-child(3)').children('p:first-child').removeClass('hideskill');
		$(classSubmenu).children('div:last-child').children('p').removeClass('hideskill');
	}else if(yourLevel==4){
		$(classSubmenu).children('div:first-child').children('p').not('p:last-child').removeClass('hideskill');
		$(classSubmenu).children('div:nth-child(3)').children('p:first-child').removeClass('hideskill');
		$(classSubmenu).children('div:last-child').children('p').removeClass('hideskill');
	}else if(yourLevel==5){
		$(classSubmenu).children('div:first-child, div:last-child').children('p').removeClass('hideskill');
		$(classSubmenu).children('div:nth-child(3)').children('p:first-child').removeClass('hideskill');
	}else if(yourLevel==6){
		$(classSubmenu).children('div:first-child, div:last-child').children('p').removeClass('hideskill');
		$(classSubmenu).children('div:nth-child(3)').children('p:first-child, p:nth-child(2)').removeClass('hideskill');
	}else if(yourLevel==7){
		$(classSubmenu).children('div:first-child, div:last-child').children('p').removeClass('hideskill');
		$(classSubmenu).children('div:nth-child(2)').children('p:first-child').removeClass('hideskill');
		$(classSubmenu).children('div:nth-child(3)').children('p:first-child, p:nth-child(2)').removeClass('hideskill');
	}else if(yourLevel==8){
		$(classSubmenu).children('div:first-child, div:last-child').children('p').removeClass('hideskill');
		$(classSubmenu).children('div:nth-child(2), div:nth-child(3)').children('p:first-child, p:nth-child(2)').removeClass('hideskill');
	}else if(yourLevel==9){
		$(classSubmenu).children('div').not('div:nth-child(3)').children('p').removeClass('hideskill');
		$(classSubmenu).children('div:nth-child(3)').children('p:first-child, p:nth-child(2)').removeClass('hideskill');
	}else{
		$(targetSubmenu).children('p').removeClass('hideskill');
	}
}); // Main menu buttons behaviour

$subMenuButtons.hover(function(){
	var $skillID=$(this).attr('id');
	if($skillID=='human_lvl1'){
		$destination.text('You deal 1d8+'+(Math.floor((Human.wis-10)/2)+Human.bonus+2)+' ('+(1+(Math.floor((Human.wis-10)/2)+Human.bonus+2))+'~'+(8+(Math.floor((Human.wis-10)/2)+Human.bonus+2))+') holy damage to the enemy. This is your basic attack.');
	}else if($skillID=='human_heal1' || $skillID=='human_heal2' || $skillID=='human_heal3'){
		$destination.text('You regain '+Math.floor(Human.maxhp/2)+' Hit Points once per battle.');
	}else if($skillID=='human_lvl2'){
		$destination.text('You fully heal your Hit Points once per battle.');
	}else if($skillID=='human_lvl3'){
		$destination.text('You deal 1d8+'+(Math.floor((Human.wis-10)/2)+Human.bonus+2)+' ('+(1+(Math.floor((Human.wis-10)/2)+Human.bonus+2))+'~'+(8+(Math.floor((Human.wis-10)/2)+Human.bonus+2))+') holy damage and blinds the enemy for 3 turns. You can use this once per battle.');
	}else if($skillID=='human_lvl4'){
		$destination.text('You deal 2d8+'+(Math.floor((Human.wis-10)/2)+Human.bonus+2+2)+' ('+(2+(Math.floor((Human.wis-10)/2)+Human.bonus+2+2))+'~'+(16+(Math.floor((Human.wis-10)/2)+Human.bonus+2+2))+') blunt damage to the enemy. You can use this once per battle.');
	}else if($skillID=='human_lvl5'){
		$destination.text('You deal 2d10+'+(Math.floor((Human.wis-10)/2)+Human.bonus+2)+' ('+(2+(Math.floor((Human.wis-10)/2)+Human.bonus+2))+'~'+(20+(Math.floor((Human.wis-10)/2)+Human.bonus+2))+') holy damage and lower the enemy\'s defense by 2 for 3 turns. You can use this once per battle.');
	}else if($skillID=='human_lvl6'){
		$destination.text('You gain a +2 bonus to your attack until the battle ends.');
	}else if($skillID=='human_lvl7'){
		$destination.text('You make 2 attacks that deal 2d10+'+(Math.floor((Human.wis-10)/2)+Human.bonus+2)+' ('+(2+(Math.floor((Human.wis-10)/2)+Human.bonus+2))+'~'+(20+(Math.floor((Human.wis-10)/2)+Human.bonus+2))+') holy damage and '+(5+(Math.floor((Human.wis-10)/2)+Human.bonus+2))+' holy damage. You can use this once per battle.');
	}else if($skillID=='human_lvl8'){
		$destination.text('You deal 2d10+'+(Math.floor((Human.wis-10)/2)+Human.bonus+2)+' ('+(2+(Math.floor((Human.wis-10)/2)+Human.bonus+2))+'~'+(20+(Math.floor((Human.wis-10)/2)+Human.bonus+2))+') blunt damage and heal '+Math.floor(Human.maxhp/2)+' HP. You can use this once per battle.');
	}else if($skillID=='human_lvl9'){
		$destination.text('You deal 2d12+'+(Math.floor((Human.wis-10)/2)+Human.bonus+2)+' ('+(2+(Math.floor((Human.wis-10)/2)+Human.bonus+2))+'~'+(24+(Math.floor((Human.wis-10)/2)+Human.bonus+2))+') fire damage and the enemy takes '+(5+(Math.floor((Human.wis-10)/2)+Human.bonus+2))+' fire damage until the battle ends. You can use this once per battle.');
	}else if($skillID=='human_lvl10'){
		$destination.text('You gain a +4 bonus to your defense until the battle ends.');
	}else if($skillID=='dwarf_lvl1'){
		$destination.text('You deal 2d6+'+(Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2+Math.floor((Dwarf.con-10)/2))+' ('+(2+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2+Math.floor((Dwarf.con-10)/2))+'~'+(12+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2+Math.floor((Dwarf.con-10)/2))+') blunt damage to the enemy. This is your basic attack.');
	}else if($skillID=='dwarf_heal'){
		$destination.text('You regain '+Math.floor(Dwarf.maxhp/2)+' Hit Points once per battle.');
	}else if($skillID=='dwarf_lvl2'){
		$destination.text('You heal '+Math.floor(Dwarf.maxhp/2)+' HP and gain +2 bonuses to your attack and defense for 3 turns. You can use this once per battle.');
	}else if($skillID=='dwarf_lvl3'){
		$destination.text('You deal 4d6+'+(Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2)+' ('+(4+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2)+'~'+(24+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2)+') blunt damage and lower the enemy\'s defense by 2 for 3 turn. You can use this once per battle.');
	}else if($skillID=='dwarf_lvl4'){
		$destination.text('You make 3 attacks that deal 2d6+'+(Dwarf.bonus+2)+' ('+(2+Dwarf.bonus+2)+'~'+(12+Dwarf.bonus+2)+') blunt damage per attack. You can use this once per battle.');
	}else if($skillID=='dwarf_lvl5'){
		$destination.text('You deal 4d6+'+(Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2)+' ('+(4+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2)+'~'+(24+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2)+') blunt damage and stun the enemy for 3 turns. You can use this once per battle.');
	}else if($skillID=='dwarf_lvl6'){
		$destination.text('You take '+(Math.floor((Dwarf.con-10)/2)+1)+' less damage for 3 turns. You can use this once per battle.');
	}else if($skillID=='dwarf_lvl7'){
		$destination.text('You make 2 attacks that deal 4d6+'+(Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2)+' ('+(4+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2)+'~'+(24+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2)+') and 2d6+'+(Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2)+' ('+(2+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2)+'~'+(12+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2)+') blunt damage. You can use this once per battle.');
	}else if($skillID=='dwarf_lvl8'){
		$destination.text('Until the battle ends, you deal automatic 2d6+'+(Dwarf.bonus+2)+' ('+(2+Dwarf.bonus+2)+'~'+(12+Dwarf.bonus+2)+') blunt damage in the beginning of the enemy\'s turn.');
	}else if($skillID=='dwarf_lvl9'){
		$destination.text('Until the battle ends, whenever your attack hits, you make an additional attack that deal 2d6+'+(Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2)+' ('+(2+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2)+'~'+(12+Math.floor((Dwarf.str-10)/2)+Dwarf.bonus+2)+') blunt damage.');
	}else if($skillID=='dwarf_lvl10'){
		$destination.text('You lower the enemy\'s attack by 5 until the battle ends. You can use this once per battle.');
	}else if($skillID=='elf_lvl1'){
		$destination.text('The enemy takes automatic '+(Math.floor((Elf.int-10)/2)+Elf.bonus+8)+' force damage. This is your basic attack.');
	}else if($skillID=='elf_heal'){
		$destination.text('You regain '+Math.floor(Elf.maxhp/2)+' Hit Points. You can use this once per battle.');
	}else if($skillID=='elf_lvl2'){
		$destination.text('You gain a +4 bonus to your defense for 3 turns. You can use this once per battle.');
	}else if($skillID=='elf_lvl3'){
		$destination.text('You deal 3d10+'+(Math.floor((Elf.int-10)/2)+Elf.bonus+6)+' ('+(3+Math.floor((Elf.int-10)/2)+Elf.bonus+6)+'~'+(30+Math.floor((Elf.int-10)/2)+Elf.bonus+6)+') fire damage to the enemy. You can use this once per turn.');
	}else if($skillID=='elf_lvl4'){
		$destination.text('You deal 3d10+'+(Math.floor((Elf.int-10)/2)+Elf.bonus+6)+' ('+(3+Math.floor((Elf.int-10)/2)+Elf.bonus+6)+'~'+(30+Math.floor((Elf.int-10)/2)+Elf.bonus+6)+') ice damage to the enemy. You can use this once per turn.');
	}else if($skillID=='elf_lvl5'){
		$destination.text('You deal 3d10+'+(Math.floor((Elf.int-10)/2)+Elf.bonus+6)+' ('+(3+Math.floor((Elf.int-10)/2)+Elf.bonus+6)+'~'+(30+Math.floor((Elf.int-10)/2)+Elf.bonus+6)+') lightning damage to the enemy. You can use this once per turn.');
	}else if($skillID=='elf_lvl6'){
		$destination.text('The enemy automatically misses you for 3 turns. You can use this once per battle.');
	}else if($skillID=='elf_lvl7'){
		$destination.text('You make 2 attacks that deal 2d10+'+(Math.floor((Elf.int-10)/2)+Elf.bonus+6)+' ('+(2+Math.floor((Elf.int-10)/2)+Elf.bonus+6)+'~'+(20+Math.floor((Elf.int-10)/2)+Elf.bonus+6)+') acid damage and the enemy takes 5 ongoing acid damage. You can use this once per turn.');
	}else if($skillID=='elf_lvl8'){
		$destination.text('You deal 5d10+'+(Math.floor((Elf.int-10)/2)+Elf.bonus+6)+' ('+(5+Math.floor((Elf.int-10)/2)+Elf.bonus+6)+'~'+(50+Math.floor((Elf.int-10)/2)+Elf.bonus+6)+') fire damage to the enemy. You can use this once per turn.');
	}else if($skillID=='elf_lvl9'){
		$destination.text('You deal 6d10+'+(Math.floor((Elf.int-10)/2)+Elf.bonus+6)+' ('+(6+Math.floor((Elf.int-10)/2)+Elf.bonus+6)+'~'+(60+Math.floor((Elf.int-10)/2)+Elf.bonus+6)+') ice damage to the enemy. You can use this once per turn.');
	}else{
		$destination.text('You reflect the enemy\'s attack and the target instead takes the damage for 3 turns. You can use this once per battle.');
	}
},function(){
	$destination.text('');
}); // Sub Menu buttons hover behaviour

function gameEnding(){
	var ending=Math.floor((Math.random()*10)+1);
	console.log('ending '+ending);
	if(ending==1){ // setting up for bad ending
		var worse=Math.floor((Math.random()*10)+1);
		console.log('worse '+worse);
		if(worse==1){ // bad ending
			$mainDisplay.html('<p>You are too late.</p>');
		}else{ // normal ending
			$mainDisplay.html('<p>You are knighted.</p>');
		}
	}else if(ending>1 && ending<10){ // normal ending
		$mainDisplay.html('<p>You are knighted.</p>');
	}else{ // setting up for good ending
		var better=Math.floor((Math.random()*10)+1);
		console.log('better '+better);
		if(better==10){ // good ending
			$mainDisplay.html('<p>You are the Legendary Demonslayer.</p>');
		}else{ // normal ending
			$mainDisplay.html('<p>You are knighted.</p>');
		}
	}
	$mainDisplay.append('<p id="replay" class="flickering">Replay the game?</p>');
	
	var $replay=$('#replay');
	$replay.click(function(){ // replay
		window.location.reload();
	});
} // for ending