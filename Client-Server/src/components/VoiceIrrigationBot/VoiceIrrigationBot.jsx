import React, { useMemo, useRef, useState } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

const COMMAND_HINT = 'kya hme pani chalana chahiye';

const getIrrigationDecision = ({ soilMoisture, humidity, rainExpected }) => {
  const soilIsTooDry = soilMoisture < 35;
  const hasEnoughSoilWater = soilMoisture >= 55;
  const airIsAlreadyHumid = humidity >= 70;

  if (soilIsTooDry) {
    return {
      answer: 'haan',
      message: `haan - paani chala do, kyoki moisture kam hai. Soil moisture ${soilMoisture}% aur humidity ${humidity}% hai.`,
    };
  }

  if (hasEnoughSoilWater || airIsAlreadyHumid) {
    return {
      answer: 'nahi',
      message: `nahi - humidity aur moisture zyada hai, isliye paani chalane ki zarurat nahi hai. Soil moisture ${soilMoisture}% aur humidity ${humidity}% hai.`,
    };
  }

  if (rainExpected) {
    return {
      answer: 'nahi',
      message: `nahi - abhi paani mat chalao, kyoki baarish expected hai. Soil moisture ${soilMoisture}% aur humidity ${humidity}% hai.`,
    };
  }

  return {
    answer: 'haan',
    message: `haan - paani chala do, kyoki moisture kam hai. Soil moisture ${soilMoisture}% aur humidity ${humidity}% hai.`,
  };
};

export default function VoiceIrrigationBot({ soilMoisture, humidity, rainExpected = false }) {
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('Pani ke liye mic dabayein.');
  const [isSupported] = useState(
    () => Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)
  );

  const decision = useMemo(
    () => getIrrigationDecision({ soilMoisture, humidity, rainExpected }),
    [soilMoisture, humidity, rainExpected]
  );

  const speak = (text) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleTranscript = (spokenText) => {
    setTranscript(spokenText);

    setResponse(decision.message);
    speak(decision.message);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const startListening = () => {
    if (!isSupported) {
      setResponse('Voice support is browser mein available nahi hai.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
      setResponse('Sun raha hoon...');
    };

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      handleTranscript(spokenText);
    };

    recognition.onerror = () => {
      setResponse('Mic se sun nahi paya. Dobara try karein.');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <section className="fixed bottom-4 right-4 z-50 w-[min(20rem,calc(100vw-2rem))] rounded-lg border border-green-200 bg-white shadow-lg">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-gray-900">Voice Pani Bot</p>
            <p className="mt-1 text-xs text-gray-500">Boliye: "{COMMAND_HINT}"</p>
          </div>
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white transition-colors ${
              isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            }`}
            aria-label={isListening ? 'Stop listening' : 'Start voice command'}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
        </div>

        <div className="mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-900">
          <div className="flex items-center gap-2 font-semibold">
            <Volume2 className="h-4 w-4" />
            <span>{response}</span>
          </div>
          {transcript && (
            <p className="mt-2 text-xs text-green-800">
              Aapne bola: <span className="font-medium">{transcript}</span>
            </p>
          )}
        </div>

        <p className="mt-2 text-xs text-gray-500">
          Static data: soil moisture {soilMoisture}%, humidity {humidity}%.
        </p>
      </div>
    </section>
  );
}
