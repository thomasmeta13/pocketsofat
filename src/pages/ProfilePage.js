import React, { useState, useEffect } from 'react';
import { Orbis } from "@orbisclub/orbis-sdk";
import { Chat } from "@orbisclub/components";
import "@orbisclub/components/dist/index.modern.css";
import Sidebar from './Sidebar';

/** Initialize the Orbis class object */
const orbis = new Orbis({});

const questions = [
    {
      question: 'How interested are you in sports?',
      answers: ['Not at all', 'A little', 'Somewhat', 'Very'],
      identifier: 'interest-sport',
    },
    // add more questions here...
  ];
  
  const Survey = ({ onAnswer }) => {
    return (
      <div>
        {questions.map(({ question, answers, identifier }) => (
          <div key={identifier}>
            <h2 style={{ color: '#f5f5f5' }}>{question}</h2>
            {answers.map((answer, i) => (
              <button
                key={i}
                style={{ padding: '10px 20px', backgroundColor: '#ff6347', color: '#f5f5f5', border: 'none', borderRadius: '5px', margin: '5px' }}
                onClick={() => onAnswer(identifier, i)}
              >
                {answer}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  };

export default function ProfilePage() {
  const [did, setDid] = useState(null);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [pfp, setPfp] = useState('');
  const [step, setStep] = useState(1);
  const [surveyAnswer, setSurveyAnswer] = useState('');
  const [answers, setAnswers] = useState({});

  const handleAnswer = async (identifier, value) => {
    setAnswers(prev => ({ ...prev, [identifier]: value }));
  };

  useEffect(() => {
    if (step === 3) {
      Object.entries(answers).forEach(async ([identifier, value]) => {
        const content = {
          [identifier]: value,
        };
        const res = await orbis.createTileDocument(content, ['survey'], '', 'orbis');
        console.log('TileDocument created:', res);
      });
    }
  }, [step, answers]);

  const connect = async () => {
    if (window.ethereum === undefined) {
      alert('Please install MetaMask or similar Ethereum wallet.');
      return;
    }

    let connection;
    try {
      connection = await orbis.connect_v2({
        provider: window.ethereum,
        chain: 'ethereum',
        lit: false,
      });
      if(connection.status == 200) {
        setDid(connection.did);
        setStep(2); // Proceed to step 2
      } else {
        console.error("Error connecting to Ceramic: ", connection);
      }
    } catch (error) {
      console.error('Error connecting to Orbis', error);
    }
  };

  const updateProfile = async () => {
    if (!did) {
      console.error('Failed to connect to Orbis');
      return;
    }

    let updateProfileResponse;
    try {
      updateProfileResponse = await orbis.updateProfile({
        pfp,
        username,
        description,
      });
      if (updateProfileResponse.status === 200) {
        setStep(3); // Proceed to step 3
      }
    } catch (error) {
      console.error('Error updating profile', error);
      return;
    }

    console.log('Profile updated successfully', updateProfileResponse);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1b1b1b', height: '100vh', color: '#f5f5f5' }}>
        <Sidebar step={step} />

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#1b1b1b', height: '100vh', color: '#f5f5f5' }}>
      <h1 style={{ marginBottom: '50px' }}>Profile Page</h1>
      {step === 1 && (
        <button onClick={connect} style={{ padding: '10px 20px', backgroundColor: '#ff6347', color: '#f5f5f5', border: 'none', borderRadius: '5px' }}>Connect Wallet</button>
      )}

      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
            alt="Profile"
            style={{width: '100px', height: '100px', borderRadius: '50%', marginBottom: '20px'}}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #f5f5f5' }}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #f5f5f5' }}
          />
          <input
            type="text"
            placeholder="Profile Picture URL"
            value={pfp}
            onChange={e => setPfp(e.target.value)}
            style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #f5f5f5' }}
          />
          <button onClick={updateProfile} style={{ padding: '10px 20px', backgroundColor: '#ff6347', color: '#f5f5f5', border: 'none', borderRadius: '5px' }}>Next</button>
        </div>
      )}

        {step === 3 && (
        <>
            <Survey onAnswer={handleAnswer} />
            <button style={{ padding: '10px 20px', backgroundColor: '#ff6347', color: '#f5f5f5', border: 'none', borderRadius: '5px' }} onClick={() => setStep(step + 1)}>Next</button>
        </>
        )}
        {step === 4 && (
        <div style={{ width: '80%', height: '500px', overflow: 'auto' }}>
            <Chat 
            theme="kjzl6cwe1jw1494e0hd9pgguxxg8jvt8vy8171wbc4e9u31uy67he7o4iaeqb6x" 
            context="kjzl6cwe1jw146dnlqxg0b4xva96d9vlhb6708fqdcxe8ukan67eiejpya8p9oy"
            />
        </div>
        )}

    </div>
    </div>
  );
}

