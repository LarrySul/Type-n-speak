//  Init SpeechSynth API
const synth  = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const body = document.querySelector('body');


// Init voice array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();

    // Loop through voices and create an option for each one
    voices.forEach(voice => {
        // Create option element
        const option  = document.createElement('option');
        // Fill option with voice and language
        option.textContent = voice.name + '('+ voice.lang +')';

        //  Set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);

    });
};

getVoices();

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () =>{
   
    // Check if speaking
    if(synth.speaking){
        console.error('Already speakng');
        return;
    }

    if(textInput.value !== ''){
         // Add background animation
        body.style.background = '#141414 url(https://larrysul.github.io/Type-n-speak/img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        // Get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        // Speak end
        speakText.onend = e => {
            body.style.background = '#141414';
            console.log('Done speaking....');
        }

        // Speak error
        speakText.onerror = e =>{
            console.error('Something went wrong');
        }

        // Selected voice 
        const SelectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Loop through voices
        voices.forEach(voice => {
            if(voice.name === SelectedVoice){
                speakText.voice = voice;
            }
        });

        // Set pitch and rate
        speakText.rate = rate.value;

        // Speak
        synth.speak(speakText);

    }
}


// Event Listeners

// text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate value change
rate.addEventListener('change', e=> (rateValue.textContent = rate.value));


// voice select change
voiceSelect.addEventListener('change', e=> speak());
