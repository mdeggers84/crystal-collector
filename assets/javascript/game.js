$(document).ready(function() {

	var target;
	var ding = $("#ding")[0];
	var theme = $("#theme")[0];
	var score = 0;
	var wins = 0;
	var losses = 0;
	var crystalObj = {
		crystal1: 0,
		crystal2: 0,
		crystal3: 0,
		crystal4: 0
	};

	// single function to generate inclusive random number based on parameters passed
	function randomNumGen(max, min) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	// called at beginning of game and on reset to assign the random target number
	function targetNum() {
		target = randomNumGen(19, 120);
		$("#rndm-num").html("Target: " + target);
	}

	// loops through to assign each key in crystal object a random number
	function crystalNum() {
		for (var i = 1; i <= 4; i++) {
			var crystal = "crystal" + i;
			crystalObj[crystal] = randomNumGen(1, 12);
		}
	}

	// compares target to score to check win/loss state
	function compareNum() {
		if (score > target) {
			losses ++;
			resetGame();
		} else if (score === target) {
			wins ++;
			resetGame();
		} else {
			updateStats();
		}
	}

	// single function to update stats
	function updateStats() {
		$("#score").html("Score: " + score);
		$("#wins").html("Wins: " + wins);
		$("#losses").html("Losses: " + losses);
	}

	// gets new randoms for target and crystals, resets score, then updates stat boards
	function resetGame() {
		targetNum();
		crystalNum();
		score = 0;
		updateStats();
	}

	// lower volume for sanity
	function setAudio() {
		ding.volume = "0.2";
		theme.volume = "0.4";
	}

	targetNum();
	crystalNum();
	setAudio();

	// on click event to add crystal value to score
	$(".crystal").on("click", function() {
		ding.play();
		switch ($(this).attr("id")) {
			case "crystal-1":
				score += crystalObj.crystal1;
				break;
			case "crystal-2":
				score += crystalObj.crystal2;
				break;
			case "crystal-3":
				score += crystalObj.crystal3;
				break;
			case "crystal-4":
				score += crystalObj.crystal4;
				break;
		}
		compareNum();
	});

});