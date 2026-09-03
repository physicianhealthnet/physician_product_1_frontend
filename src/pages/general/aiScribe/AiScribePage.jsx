import React, { useState, useEffect, useRef } from "react";
import { Select, Button as AntButton, message, Spin, Input } from "antd";
import { Icon } from "@iconify/react";
import Button from "../../../component/ui/Button";
import Card from "../../../component/ui/Card";

const { TextArea } = Input;
const { Option } = Select;

const AiScribePage = () => {
  const [language, setLanguage] = useState("en-US");
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patientId, setPatientId] = useState("");
  
  const recognitionRef = useRef(null);
  const baseTranscriptRef = useRef("");
  const latestTranscriptRef = useRef("");

  useEffect(() => {
    latestTranscriptRef.current = transcript;
  }, [transcript]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => console.log("[SpeechRecognition] onstart - Microphone is active");
      recognition.onaudiostart = () => console.log("[SpeechRecognition] onaudiostart - Audio capturing started");
      recognition.onsoundstart = () => console.log("[SpeechRecognition] onsoundstart - Sound detected");
      recognition.onspeechstart = () => console.log("[SpeechRecognition] onspeechstart - Speech detected");
      
      recognition.onresult = (event) => {
        console.log("[SpeechRecognition] onresult - Data received", event.results);
        let currentSessionTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          currentSessionTranscript += event.results[i][0].transcript;
        }
        let prefix = baseTranscriptRef.current;
        if (prefix && !prefix.endsWith(" ") && currentSessionTranscript && !currentSessionTranscript.startsWith(" ")) {
            prefix += " ";
        }
        setTranscript(prefix + currentSessionTranscript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        if (event.error !== "no-speech") {
          message.error("Speech recognition error: " + event.error);
        }
        setIsRecording(false);
      };

      recognition.onend = () => {
        console.log("[SpeechRecognition] onend - Recording session ended");
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      message.error("Speech Recognition API is not supported in this browser.");
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      if (recognitionRef.current) {
        baseTranscriptRef.current = latestTranscriptRef.current;
        recognitionRef.current.lang = language;
        recognitionRef.current.start();
        setIsRecording(true);
        setTranslatedText("");
      }
    }
  };

  const handleTranslate = async () => {
    if (!transcript.trim()) return;
    setIsTranslating(true);
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(transcript)}&langpair=ta|en`);
      const data = await res.json();
      if (data && data.responseData && data.responseData.translatedText) {
        setTranslatedText(data.responseData.translatedText);
      } else {
        throw new Error("Translation failed");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to translate the text.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSubmit = async () => {
    const finalTranscript = language === "ta-IN" ? translatedText : transcript;
    
    if (!finalTranscript.trim()) {
      message.warning("Transcript is empty. Please record or enter some text.");
      return;
    }
    
    if (language === "ta-IN" && !translatedText.trim()) {
        message.warning("Please translate the Tamil transcript to English before submitting.");
        return;
    }

    if (!patientId.trim()) {
      message.warning("Please provide a Patient ID.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://physicianhealthnet.com/api/scribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "bd4037edf73e2270c9f59f1a9513952d6f023d7a12e741e4046a304dd2e93fc2",
        },
        body: JSON.stringify({
          patientId: patientId,
          encounterId: "ENC-" + new Date().toISOString().slice(0,10).replace(/-/g,"") + "-001",
          transcript: finalTranscript,
        }),
      });

      if (response.ok) {
        message.success("Transcript sent to AI Scribe successfully!");
        setTranscript("");
        setTranslatedText("");
      } else {
        throw new Error("API responded with an error");
      }
    } catch (error) {
      console.error("API error:", error);
      message.error("Failed to send transcript to AI Scribe.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto my-6 p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <Icon icon="solar:microphone-3-bold-duotone" className="text-blue-500 text-3xl" />
        <h1 className="text-2xl font-bold text-slate-800 m-0">AI Scribe</h1>
      </div>

      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Patient ID <span className="text-red-500">*</span>
            </label>
            <Input 
              placeholder="e.g. PAT-10025" 
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              disabled={isRecording || isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Select Spoken Language <span className="text-red-500">*</span>
            </label>
            <Select
              value={language}
              onChange={(val) => setLanguage(val)}
              className="w-full"
              disabled={isRecording}
            >
              <Option value="en-US">English</Option>
              <Option value="ta-IN">Tamil (தமிழ்)</Option>
            </Select>
          </div>
        </div>

        <div className="flex justify-center my-6">
          <button
            onClick={toggleRecording}
            className={`flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 shadow-md ${
              isRecording 
                ? "bg-red-100 text-red-500 animate-pulse border-4 border-red-500" 
                : "bg-blue-100 text-blue-500 hover:bg-blue-200"
            }`}
          >
            <Icon icon={isRecording ? "solar:stop-circle-bold" : "solar:microphone-3-bold"} className="text-4xl" />
          </button>
        </div>
        
        {isRecording && (
          <p className="text-center text-sm text-red-500 font-medium">Recording in progress...</p>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Transcript</label>
          <TextArea
            rows={5}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Live transcript will appear here as you speak..."
            className="w-full text-base"
          />
        </div>

        {language === "ta-IN" && (
          <div className="mt-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-700">English Translation</label>
              <AntButton size="small" type="primary" ghost onClick={handleTranslate} loading={isTranslating} disabled={!transcript || isRecording}>
                Translate Now
              </AntButton>
            </div>
            <TextArea
              rows={5}
              value={translatedText}
              onChange={(e) => setTranslatedText(e.target.value)}
              placeholder="Translated English text will appear here..."
              className="w-full text-base"
            />
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isRecording || (!transcript && !translatedText) || isSubmitting}
            className="flex items-center gap-2 px-6"
          >
            {isSubmitting ? <Spin size="small" /> : <Icon icon="solar:plain-2-linear" />}
            Submit to AI Scribe
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AiScribePage;
