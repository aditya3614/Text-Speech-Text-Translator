const box1=document.querySelector(".container");
const box2=document.querySelector(".container2");
const box3=document.querySelector(".container3");
const btn1=document.getElementById("button1");
const btn2=document.getElementById("button2");
const textarea= document.getElementById("txt");
 speechBtn=document.querySelector(".convertBtn");
 voiceList=document.getElementById("select")
 const inputTxt=document.getElementById("inputTxt");
 const mic=document.querySelector(".mic");
const back=document.querySelector(".back");
window.onload=()=>{
    btn1.addEventListener("click",()=>{
        box1.classList.add("hide");
        box2.classList.remove("hide");
        back.classList.remove("hide");

    })
    btn2.addEventListener("click",()=>{
        box1.classList.add("hide");
        box3.classList.remove("hide");
        back.classList.remove("hide");
    })
}

let synth = speechSynthesis,
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    speechSynthesis.speak(utterance)
    synth.speak(utterance);
    console.log("yha pochncha")
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }else{
                }
            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        }else{
            speechBtn.innerText = "Convert To Speech";
        }
    }
});

let select=document.getElementById("selectt");

mic.addEventListener("click",()=>{
    let recognition=new webkitSpeechRecognition();
    recognition.lang=select.value;
    recognition.onresult = function(event){
        inputTxt.value=event.results[0][0].transcript;
    }
    recognition.start();
})

back.addEventListener("click",()=>{
    location.reload();
})




