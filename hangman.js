//global variables
var can_play = true;
var names = new Array('NISHANT', 'TERRIL', 'MORRISON', 'DALLAS', 'DILLON', 'TREVOR', 'JOHN', 'RYAN', 'OMAR', 'MARCUS', 'ANDY');
var to_guess = "";
var display_word = "";
var used_letters = "";
var wrong_guesses = 0;

function selectLetter(l) {
    if (can_play == false) {
        return;
    }
    if (used_letters.indexOf(l) != -1) {
        return;
    }
    //correct guesses
    used_letters += l;
    document.game.usedLetters.value = used_letters
    console.log(l + " is in " + to_guess);
    if (to_guess.indexOf(l) != -1) {
        pos = 0;
        temp_hidden = display_word;
        while (to_guess.indexOf(l, pos) != -1) {
            pos = to_guess.indexOf(l, pos);
            end = pos + 1;
            start_text = temp_hidden.substring(0, pos);
            end_text = temp_hidden.substring(end, temp_hidden.length);
            temp_hidden = start_text + l + end_text;
            pos = end;
        }
        display_word = temp_hidden;
        document.game.displayWord.value = display_word;
        console.log(document.game);
        if (display_word.indexOf("-") == -1) {
            // winner
            alert("You remembered my name! Thanks for hanging out, dude.");
            document.hm.src = "hmwin.png";
            can_play = false;
        }
    }
    // incorrect letter guess
    else {
        wrong_guesses += 1;
        eval("document.hm.src=\"hm" + wrong_guesses + ".png\"");
        if (wrong_guesses == 5) {
            // gameover
            alert("He left in an Uber. You totally forgot his name. Jerk.");
            can_play = false;
        }
    }
}
//resetting the game
function reset() {
    selectWord();
    document.game.usedLetters.value = "";
    used_letters = "";
    wrong_guesses = 0;
    document.hm.src = "hmstart.png";
}

function selectWord() {
    can_play = true;
    random_number = Math.round(Math.random() * (names.length - 1));
    to_guess = names[random_number];

    // display hidden word
    hiddenName = createHiddenName(to_guess);
    document.game.displayWord.value = hiddenName;
    display_word = hiddenName;
}

function createHiddenName(m) {
    hider = "";
    nameslength = m.length;
    for (i = 0; i < nameslength; i++) {
        hider += "-";
    }
    return hider;
}
