// 3/4 Time Signature

// Cycles Per Minute
setcpm(60);

// ==========================================
// 0. INIT
// Do NOT comment out anything here, but instead scroll-down to SWITCHES
// ==========================================

// Arrays for arrangements ;)
const arrRight = new Array(); var right = (n) => 0;
const arrLeft = new Array();  var left = (n) => 0;

const pushRight = (n) => arrRight.push(n);
const pushLeft = (n) => arrLeft.push(n);


// ==========================================
// 1. SWITCHES
// Toggle entire hands on/off here just like practice mode!
// ==========================================

right = (n) => pushRight(n);
left = (n) => pushLeft(n);

const section1 = true;
const section2 = true;
const loop = true;



samples({
  'piano-mp3': {

    // Octave 4
    'c4': 'C4.mp3', 'c#4': 'Db4.mp3', 'd4': 'D4.mp3', 'd#4': 'Eb4.mp3', 
    'e4': 'E4.mp3', 'f4': 'F4.mp3', 'f#4': 'Gb4.mp3', 'g4': 'G4.mp3', 'g#4': 'Ab4.mp3', 
    'a4': 'A4.mp3', 'a#4': 'Bb4.mp3', 'b4': 'B4.mp3',

    // Octave 5 (Your main theme notes)
    'c5': 'C5.mp3', 'c#5': 'Db5.mp3', 'd5': 'D5.mp3', 'd#5': 'Eb5.mp3', 
    'e5': 'E5.mp3', 'f5': 'F5.mp3', 'f#5': 'Gb5.mp3', 'g5': 'G5.mp3', 'g#5': 'Ab5.mp3', 
    'a5': 'A5.mp3', 'a#5': 'Bb5.mp3', 'b5': 'B5.mp3',

    // Octave 6
    'c6': 'C6.mp3', 'c#6': 'Db6.mp3', 'd6': 'D6.mp3', 'd#6': 'Eb6.mp3', 
    'e6': 'E6.mp3', 'f6': 'F6.mp3', 'f#6': 'Gb6.mp3', 'g6': 'G6.mp3', 'g#6': 'Ab6.mp3', 
    'a6': 'A6.mp3', 'a#6': 'Bb6.mp3', 'b6': 'B6.mp3',
  }
}, 'https://raw.githubusercontent.com/scriptmaster/piano-mp3/main/piano-mp3/');


// ==========================================
// 2. FULL MEASURE ARRANGEMENT (Treble over Bass)
// ==========================================

if (section1) {
  // Measure 1: Intro Pick-up
  right(note("~@2 b4@1"));
  left(note("~@3"));

  // Measure 2: Phrase 1 (Bass enters on E)
  right(note("e5@1.5 g5@0.5 f#5@1"));
  left(note("e4@3").clip(4/3));

  // Measure 3: Phrase 2
  right(note("e5@2 b5"));
  left(note("~@3"));

  // Measure 4: Phrase 3 (Bass hits another E anchor)
  right(note("a5@3"));
  left(note("e4@3").clip(4/3));

  // Measure 5: Phrase 4
  right(note("f#5"));
  left(note("~@3"));

  // Measure 6: Phrase 5 (Second Half Return)
  right(note("e5@1.5 g5@0.5 f#5@1"));
  left(note("e4@3").clip(4/3));

  // Measure 7: Phrase 6 (B-flat/A# under the D shift)
  right(note("d5@2 f5@1"));
  left(note("a#4@2 ~@1"));

  // Measure 8: Phrase 7 (Bass lands on E, hand hand hand-off begins)
  right(note("b4@2 ~@1"));
  left(note("e4@2 g4@1"));
}

if (section2) {
  // Measure 9: Phrase 8 (Hand-off Resolution & New Pickup)
  right(note("~@2 b4@1"));
  left(note("b4@2 ~@1"));

  // Measure 10: Peak Phrase Start
  right(note("e5@1.5 g5@0.5 f#5@1"));
  left(note("e4@3").clip(4/3));

  // Measure 11: Climb up to B5
  right(note("e5@2 b5"));
  left(note("~@3"));

  // Measure 12: High Dramatic Shift (Fixed: Added @1 duration)
  right(note("d6@2 c#6@1"));
  left(note("g4@3"));

  // Measure 13: High Resolution Descent (Fixed: Added @1 duration)
  right(note("c6@2 g#5@1"));
  left(note("f4@3"));

  // Measure 14: Chromatic Descent Triplet Feel
  right(note("c6@1.5 b5@0.5 a#5"));
  left(note("e4@3"));

  // Measure 15: Low Pivot Jump
  right(note("a#4@2 g5"));
  left(note("f#4@3"));

  // Measure 16: Final Section Resolution
  right(note("e5@3"));
  left(note("e4@3"));
}

// ==========================================
// 3. EXECUTION AND PLAYBACK LAYERS
// ==========================================

const activeRight = arrRight.length > 0 ? slowcat(...arrRight) : silence;
const activeLeft = arrLeft.length > 0 ? slowcat(...arrLeft) : silence;

const track = stack(
  // Right Hand Sounds (Treble Staff)
  activeRight.s("gm_piano").pan(slider(0.8,0,1)).gain(slider(0.8,0,2)),
  // activeRight.s("gm_epiano1").pan(0.5).gain(0.4),
  activeRight.s("piano-mp3").pan(slider(0.5,0,1)).gain(slider(2.157,0,4)),
  // activeRight.s("gm_harpsichord").pan(0.5).gain(0.4),

  // Left Hand Sounds (Bass Staff - Fixed to read activeLeft)
  // activeLeft.transpose(-12).s("gm_piano").pan(0.3).gain(0.7),
  // activeLeft.s("gm_piano").pan(slider(0.3,0,1)).gain(slider(0.7,0,1)),
  activeLeft.s("piano-mp3").pan(slider(0.3,0,1)).gain(slider(1.364,0,4)),
  // activeLeft.s("gm_harpsichord").pan(0.5).gain(0.4),
)
.room(slider(0.413,0,1))
._punchcard({label: 1})

// Safely converts raw array length into a Strudel time-signal
const totalCycles = pure(arrRight.length);

console.log(totalCycles); // needed in export

// Uses mask to mute the audio track completely once the final measure finishes
loop ? track : track.mask(time.lt(totalCycles));
