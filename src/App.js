import { useRef, useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./App.css";
import microPhoneIcon from "./icons/microphone.svg";
import avatar from "./icons/avatar.png";
import avatar1 from "./icons/avatar1.png";
import avatar2 from "./icons/avatar2.png";
import { useSpeechSynthesis, } from 'react-speech-kit';

function App() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const [transcript2, setTranscript2] = useState("Click start and state your name.");
  const delayTime = 300;
  const { speak, voices } = useSpeechSynthesis();

  //useEffect Hook which plays the current transcript of the avatar when the transcript2 state is changed
  useEffect(() => {
    speak({ text: transcript2, voice: voices[49], rate: 0.7, pitch: 1 })
  }, [transcript2])

  //If the browser does not support the Speech Recognition library, display text stating that this is the case
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="microphone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }

  // When handleListening is called:
  // Speech Recognition library starts listening
  const handleListening = () => {
    document.getElementById('a').style.display = 'none';
    document.getElementById('a2').style.display = 'none';
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  // When stopHandle is called:
  // Transcript2 is reset
  // Speech Recognition library stops listening
  const stopHandle = () => {
    setTranscript2("");
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };

  const handleReset = () => {
    stopHandle();
    resetTranscript();
    document.getElementById('a').style.display = 'block';
    document.getElementById('a2').style.display = 'block';

    // Hard coded dialogue which progresses each time the user clicks the next button
    if (counter === 0) {
      setTimeout(
        function () {
          setTranscript2("Hi! My name is Emma. Are you ready to begin?");
        }
        , delayTime
      );
    }
    else if (counter === 1)
      setTimeout(
        function () {
          setTranscript2("I love eating oranges. What is your favorite fruit?");
        }
        , delayTime
      );
    else if (counter === 2)
      setTimeout(
        function () {
          setTranscript2("Thank you for sharing. Now, take a look at this image. What does it remind you of?")
        }
        , delayTime
      );
    else if (counter === 3)
      setTimeout(
        function () {
          setTranscript2("Now, tell me what you see in this picture.")
        }
        , delayTime
      );
    else if (counter === 4)
      setTimeout(
        function () {
          setTranscript2("What memory comes to mind when you see this?");
        }
        , delayTime
      );

    // State var counter is incremented by 1
    setCounter(counter + 1);
  };

  return (
    <section style={{ display: 'flex', overflowY: 'hidden', }}>
      <div className="leftWrapper">
        <div className="avatarWrapper">
          {/*  Avatar */}
          <img className="avatar" src={avatar} height='1500px' alt="Drawing of person" />
          <img className="animation" id="a" src={avatar1} height='1500px' alt="Drawing of person speaking" />
          <img className="animation1" id="a2" src={avatar2} height='1500px' alt="Drawing of person speaking" />
        </div>
        {!isListening && (
          <div className="avatarText">
            <div >{transcript2}</div>
          </div>
        )}
      </div>
      <div className="microphone-wrapper">
        <div className="microphone-container">
          <div
            className="microphone-icon-container"
            ref={microphoneRef}
            onClick={handleListening}
          >
            <img src={microPhoneIcon} className="microphone-icon" alt="microphone" />
          </div>
          <div className="microphone-status">
            {isListening ? "Listening..." : "Start"}
          </div>
          {isListening && (
            <button className="microphone-stop btn" onClick={stopHandle}>
              Stop
            </button>
          )}
        </div>
        {transcript && (
          <div className="microphone-result-container">
            <div className="microphone-result-text">{transcript}</div>
            <button className="microphone-reset btn" onClick={handleReset}>
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
export default App;
