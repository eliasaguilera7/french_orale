import React, { useRef, useState, useEffect } from 'react';
import './TefReadingExample.css';
import restaurant from '../topics/topics_oral/restaurant'; // Adjust the path as necessary

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
  const [recordings, setRecordings] = useState(restaurant.groups.map(group => group.examples.map(() => null)));
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [currentExample, setCurrentExample] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(restaurant.groups.map(() => false));
  const audioRefs = useRef(audioFiles.map(() => null));
  const fullConversationAudioRef = useRef(null);
  const [fullConversationProgress, setFullConversationProgress] = useState(0);

  const handlePlayAudio = (audioIndex) => {
    audioRefs.current[audioIndex]?.play();
  };

  const handleStartRecording = async (groupIndex, exampleIndex) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        setIsRecording(true);
        setCurrentGroup(groupIndex);
        setCurrentExample(exampleIndex);

        const chunks = [];
        recorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/webm; codecs=opus' });
          const url = URL.createObjectURL(audioBlob);

          setRecordings((prevRecordings) => {
            const newRecordings = prevRecordings.map((groupRecordings, gIndex) => {
              if (gIndex === groupIndex) {
                return groupRecordings.map((rec, eIndex) => {
                  if (eIndex === exampleIndex) {
                    return url; // Override with the latest recording
                  } else {
                    return rec;
                  }
                });
              } else {
                return groupRecordings;
              }
            });
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
      setCurrentGroup(null);
      setCurrentExample(null);
    }
  };

  const toggleSuggestions = (groupIndex) => {
    setShowSuggestions((prevShowSuggestions) => {
      const newShowSuggestions = [...prevShowSuggestions];
      newShowSuggestions[groupIndex] = !newShowSuggestions[groupIndex];
      return newShowSuggestions;
    });
  };

  // Commented out the cleanup useEffect hook
  // useEffect(() => {
  //   // Cleanup recordings on session close
  //   const cleanupRecordings = () => {
  //     recordings.flat().forEach((url) => URL.revokeObjectURL(url));
  //   };
  //   window.addEventListener('beforeunload', cleanupRecordings);

  //   return () => {
  //     cleanupRecordings();
  //     window.removeEventListener('beforeunload', cleanupRecordings);
  //   };
  // }, [recordings]);

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

  let audioIndex = 0;

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
              {restaurant.groups.map((group, groupIndex) => (
                group.examples.map((example, exampleIndex) => {
                  const currentAudioIndex = audioIndex++;
                  return (
                    <div key={`${groupIndex}-${exampleIndex}`} className="audio-group">
                      <h3>{group.instruction}</h3>

                      {/* Your Response Section */}
                      <div className="audio-response">
                        
                        {!isRecording && (
                          <button onClick={() => handleStartRecording(groupIndex, exampleIndex)}>Record</button>
                        )}
                        {isRecording && currentGroup === groupIndex && currentExample === exampleIndex && (
                          <button onClick={handleStopRecording} style={{ backgroundColor: 'red' }}>
                            Stop Recording
                          </button>
                        )}
                        {recordings[groupIndex][exampleIndex] && (
                          <div>
                            <p></p>
                            <audio
                              key={recordings[groupIndex][exampleIndex]}
                              src={recordings[groupIndex][exampleIndex]}
                              controls
                              style={{ width: '100%' }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Example Section */}
                     {/*} <div className="audio-example">
                        <div className="example-item">
                          <p><strong>Q:</strong> {example.question}</p>
                          <p><strong>A:</strong> {example.answer}</p>
                        </div>
                        <button onClick={() => handlePlayAudio(currentAudioIndex)}>Play</button>
                        <audio
                          ref={(el) => (audioRefs.current[currentAudioIndex] = el)}
                          src={audioFiles[currentAudioIndex]}
                        />
                      </div>*/}

                      {/* Suggestions Section */}
                      <div className="suggestions-toggle">
                        <button onClick={() => toggleSuggestions(groupIndex)}>
                          {showSuggestions[groupIndex] ? 'Hide' : 'Show Suggestions'}
                          <span className={`arrow ${showSuggestions[groupIndex] ? 'open' : ''}`}>&#9654;</span>
                        </button>
                      </div>
                      {showSuggestions[groupIndex] && (
                        <div className="suggestions">
                          <h4>Alternative Questions</h4>
                          <ul>
                            {group.showSuggestion.alternativeQuestions.reserverTable.map((question, index) => (
                              <li key={index}>{question}</li>
                            ))}
                            {group.showSuggestion.alternativeQuestions.menuOptions.map((question, index) => (
                              <li key={index}>{question}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Conversation Section */}
      <div className="full-conversation">
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
        <div className="progress-bar">
          <div className="progress" style={{ width: `${fullConversationProgress}%` }}></div>
        </div>
        {restaurant.groups[0].fullConversation.map((line, index) => (
          <div key={index}>
            <p><strong>Q:</strong> {line.question}</p>
            <p><strong>A:</strong> {line.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TefReadingExample;