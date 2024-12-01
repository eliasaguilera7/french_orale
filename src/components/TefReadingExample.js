import React, { useRef, useState, useEffect } from 'react';
import './TefReadingExample.css';

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
  const [recordings, setRecordings] = useState([[], [], []]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState([false, false, false]);
  const audioRefs = useRef(audioFiles.map(() => null));

  const handlePlayAudio = (index) => {
    audioRefs.current[index]?.play();
  };

  const handleStartRecording = async (groupIndex) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        setIsRecording(true);
        setCurrentGroup(groupIndex);
        recorder.start();

        const chunks = [];
        recorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/mpeg' });
          const url = URL.createObjectURL(audioBlob);
          setRecordings((prevRecordings) => {
            const newRecordings = [...prevRecordings];
            newRecordings[groupIndex] = [...newRecordings[groupIndex], url];
            return newRecordings;
          });
        };
      } catch (error) {
        console.error('Error accessing audio devices.', error);
      }
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      setCurrentGroup(null);
    }
  };

  const toggleSuggestions = (groupIndex) => {
    setShowSuggestions((prevShowSuggestions) => {
      const newShowSuggestions = [...prevShowSuggestions];
      newShowSuggestions[groupIndex] = !newShowSuggestions[groupIndex];
      return newShowSuggestions;
    });
  };

  useEffect(() => {
    // Cleanup recordings on session close
    const cleanupRecordings = () => {
      recordings.flat().forEach((url) => URL.revokeObjectURL(url));
    };
    window.addEventListener('beforeunload', cleanupRecordings);

    return () => {
      cleanupRecordings();
      window.removeEventListener('beforeunload', cleanupRecordings);
    };
  }, [recordings]);

  return (
    <div className="tef-reading-container">
      <div className="navbar-placeholder"></div>
      <div className="content-container">
        <div className="left-side">
          <img src="/yoga_image_1.png" alt="Examples" className="example-image" />
          <div className="play-all-container"></div>
        </div>

        <div className="right-side">
          <div className="scroll-container">
            {[...Array(3)].map((_, groupIndex) => (
              <div key={groupIndex} className="audio-group">
                <h3>Group {groupIndex + 1}</h3>

                {/* Your Response Section */}
                <div className="audio-example">
                  <h3>Your Response</h3>
                  {!isRecording && (
                    <button onClick={() => handleStartRecording(groupIndex)}>
                      Record
                    </button>
                  )}
                  {isRecording && currentGroup === groupIndex && (
                    <button onClick={handleStopRecording}>Stop Recording</button>
                  )}
                  {recordings[groupIndex].map((url, index) => (
                    <div key={index}>
                      <p>Recording {index + 1}</p>
                      <audio src={url} controls style={{ width: '100%' }} />
                      <button onClick={() => new Audio(url).play()}>
                        <i className="fas fa-play"></i>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Example Section */}
                <div className="audio-example">
                  <h3>Example</h3>
                  <button onClick={() => handlePlayAudio(groupIndex)}>Play</button>
                  <audio
                    ref={(el) => (audioRefs.current[groupIndex] = el)}
                    src={audioFiles[groupIndex]}
                  />
                </div>

                <div className="suggestions-toggle">
                  <button onClick={() => toggleSuggestions(groupIndex)}>
                    {showSuggestions[groupIndex]
                      ? 'Hide Suggestions'
                      : 'Show Suggestions'}
                  </button>
                  {showSuggestions[groupIndex] && (
                    <div className="suggestions">
                      <div>
                        a. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Praesent eget nisl eu arcu gravida tristique nec sed purus.
                        Fusce non nunc in turpis hendrerit venenatis at non nulla.
                      </div>
                      &nbsp;
                      <div>
                        b. Vestibulum ante ipsum primis in faucibus orci luctus et.
                        Morbi feugiat velit vel libero posuere, eget aliquet felis
                        venenatis. Cras dignissim mi nec elit sollicitudin, non
                        feugiat velit.
                      </div>
                      &nbsp;
                      <div>
                        c. Curabitur non nulla sit amet nisl tempus convallis quis ac.
                        Quisque nec arcu in dolor elementum tristique id nec lorem.
                        Ut faucibus velit vitae justo sollicitudin, a aliquam libero.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TefReadingExample;
