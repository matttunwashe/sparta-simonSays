var notes = [];
 var playerNotes = [];
 var intervalTime = 2000;
 var step = 0;
 var lvl = 0;
 var game = false;
 var strict = false;
 var seq, time;
 var disabled = false;


 $('#easy, #strict').on('click', function () {
     if (this.id === 'strict') {
         strict = true;
     }
     game = true;
     intervalTime = 500;
     $('#gameOff').hide();
     $('#tip').hide();
     $('#gameOn').show();
     $('#q, #w, #a, #s').html('');
     start();
 });

 $('#restart').on('click', function () {
     clearInterval(seq);
     clearTimeout(time);
     $('#gameOn').hide();
     $('#gameOff').show();
     game = false;
 });

 function reset() {
     notes = getNotes();
     playerNotes = [];
     step = 0;
     lvl = 0;
     $('.lvl').html('Level: 0');
 }

 function start() {
     reset();
     playNotes();
 }


 $(document).on('keyup', buttonKey);

 function buttonKey(e) {

     switch (e.which) {
         case 81:
             $('#q').click();
             break;
         case 87:
             $('#w').click();
             break;
         case 65:
             $('#a').click();
             break;
         case 83:
             $('#s').click();
             break;
     }

 }


 $('#q, #w, #a, #s').click(function () {

     if (game) {
         var clicked = this.id;
         playerNotes.push(clicked);

         if (playerNotes.length === step + 1) {
             if (checkNotes()) {
                 nextLvl();
             } else {
                 failLvl();
             }
         } else if (!checkPlayerNotes()) {
             failLvl();
         }
     }
 });


 function nextLvl() {
     step++;
     $('.lvl').html('Level: ' + step);
     playNotes();
     playerNotes = [];
 }

 function failLvl() {
     playerNotes = [];
     playNotes();
     failMsg();

     if (strict) {
         reset();
     }
 }

 function failMsg() {
     $('.lvl').addClass('fail');
     setTimeout(function () {
         $('.lvl').removeClass('fail');
     }, 1500)
 }
