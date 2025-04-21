import React, { useRef, useState, useEffect } from 'react';
import './TefReadingExample.css';
import topicsOrale from '../topics/topics_oral/topicsOrale';

// Importing Material UI Pagination components
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const TefReadingExample = () => {
  const audioFiles = [
    'assets/audio/yoga_conversation/example1/audio1.mp3',
    'assets/audio/yoga_conversation/example1/audio2.mp3',
    'assets/audio/yoga_conversation/example1/audio3.mp3',
    'assets/audio/yoga_conversation/example2/audio1.mp3',
    'assets/audio/yoga_conversation/example2/audio2.mp3',
    'assets/audio/yoga_conversation/example2/audio3.mp3',
    'assets/audio/yoga_conversation/example3/audio1.mp3',
    'assets/audio/yoga_conversation/example3/audio2.mp3',
    'assets/audio/yoga_conversation/example3/audio3.mp3',
  ];

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const currentTopic = topicsOrale[0];
  const stepsCount = Object.keys(currentTopic.instructions).length;

  const [recordings, setRecordings] = useState(Array(stepsCount).fill(null));

  const audioRefs = useRef(audioFiles.map(() => null));
  const fullConversationAudioRef = useRef(null);
  const [fullConversationProgress, setFullConversationProgress] = useState(0);

  const [currentStep, setCurrentStep] = useState(1);
  const instructionKey = `step${currentStep}`;
  const currentInstruction = currentTopic.instructions[instructionKey];
  const currentSuggestions = currentTopic.suggestions[instructionKey];

  const [showCurrentSuggestions, setShowCurrentSuggestions] = useState(false);

  const handlePlayAudio = (audioIndex) => {
    audioRefs.current[audioIndex]?.play();
  };

  const handleStartRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        setIsRecording(true);

        const chunks = [];
        recorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/webm; codecs=opus' });
          const url = URL.createObjectURL(audioBlob);
          setRecordings((prevRecordings) => {
            const newRecordings = [...prevRecordings];
            newRecordings[currentStep - 1] = url;
            return newRecordings;
          });
        };

        recorder.start();
      } catch (error) {
        console.error('Error accessing audio devices:', error);
        alert('Unable to access the microphone. Please check your browser settings.');
      }
    } else {
      alert('MediaDevices API not supported in this browser.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
      setIsRecording(false);
    }
  };
  

  const handleFullConversationPlay = () => {
    if (fullConversationAudioRef.current) {
      fullConversationAudioRef.current.play();
    }
  };

  const handleFullConversationTimeUpdate = () => {
    if (fullConversationAudioRef.current) {
      const progress = (fullConversationAudioRef.current.currentTime / fullConversationAudioRef.current.duration) * 100;
      setFullConversationProgress(progress);
    }
  };

  const lines = currentTopic.conversation.split('\n').map(line => line.trim()).filter(l => l);
  const fullConversation = [];
  for (let i = 0; i < lines.length; i += 2) {
    const studentLine = lines[i]?.replace(/^Student:\s*/, '');
    const advertiserLine = lines[i + 1]?.replace(/^Advertiser:\s*/, '');
    if (studentLine && advertiserLine) {
      fullConversation.push({ question: studentLine, answer: advertiserLine });
    }
  }

  // Handle page changes from the MUI pagination
  const handlePageChange = (event, value) => {
    // reset suggestions toggle
    setShowCurrentSuggestions(false);
    setCurrentStep(value);
  };

  const handleNext = () => {
    if (currentStep < stepsCount) {
      setShowCurrentSuggestions(false); // Fix: Updated to setShowCurrentSuggestions
      setCurrentStep((prev) => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setShowCurrentSuggestions(false); // Fix: Updated to setShowCurrentSuggestions
      setCurrentStep((prev) => prev - 1);
    }
  };
 

  return (
    <div>
      <div className="tef-reading-container">
        <div className="navbar-placeholder"></div>
        <div className="content-container">
          <div className="left-side">
            <img src="/yoga_image_1.png" alt="Examples" className="example-image" />
            <div className="play-all-container"></div>
          </div>

          <div className="right-side">
            <div className="scroll-container">

            <div className="navigation-buttons">
  <button
    onClick={handlePrevious}
    disabled={currentStep === 1}
    className={`nav-button ${
      currentStep === 1 ? "disabled" : ""
    }`}
  >
    Previous
  </button>
  <button
    onClick={handleNext}
    disabled={currentStep === stepsCount}
    className={`nav-button ${
      currentStep === stepsCount ? "disabled" : ""
    }`}
  >
    Next
  </button>
</div>
              <h3>{currentInstruction}</h3>

              <div style={{ margin: '10px 0' }}></div>
              <div>
  <button onClick={() => setShowCurrentSuggestions(!showCurrentSuggestions)}>
    {showCurrentSuggestions ? 'Hide Suggestions' : 'Show Suggestions'}
  </button>
  {showCurrentSuggestions && currentSuggestions && (
    <div className="suggestions" style={{ marginTop: '10px' }}>
      <h4>Suggestions for {instructionKey}</h4>
      <ul>
        {currentSuggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  )}
</div>

<div className="audio-response">
  <button
    onClick={handleStartRecording}
    disabled={isRecording}
    style={{ marginBottom: "10px" }}
  >
    {isRecording ? "Recording in Progress..." : "Record Your Response"}
  </button>
  {isRecording && (
    <button
      onClick={handleStopRecording}
      style={{
        backgroundColor: "red",
        color: "white",
        marginBottom: "10px",
      }}
    >
      Stop Recording
    </button>
  )}
  {recordings[currentStep - 1] && (
    <div style={{ marginTop: "10px" }}>

      <audio
        key={recordings[currentStep - 1]}
        src={recordings[currentStep - 1]}
        controls
        style={{ width: "100%" }}
      />
    </div>
  )}
</div>








            </div>
          </div>
        </div>
      </div>

      {/* Full Conversation Section */}
      <div className="full-conversation" style={{ marginTop: '20px' }}>
        <h3>
          Full Conversation (Ready to Use):
          <button onClick={handleFullConversationPlay} style={{ marginLeft: '10px' }}>
            Play
          </button>
        </h3>
        <audio
          ref={fullConversationAudioRef}
          src="/assets/audio/full_conversation.mp3"
          onTimeUpdate={handleFullConversationTimeUpdate}
        />
        <div className="progress-bar" style={{ margin: '10px 0' }}>
          <div className="progress" style={{ width: `${fullConversationProgress}%`, height: '5px', background: 'blue' }}></div>
        </div>
        {fullConversation.map((line, index) => (
          <div key={index}>
            <p><strong>student:</strong> {line.question}</p>
            <p><strong>Avertiser:</strong> {line.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TefReadingExample;
