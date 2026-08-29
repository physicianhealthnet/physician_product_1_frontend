import React, { useState, useEffect, useRef } from "react";
import { Modal, Select, Button as AntButton, message, Spin, Input } from "antd";
import { Icon } from "@iconify/react";
import Button from "../ui/Button";

const { TextArea } = Input;
const { Option } = Select;

const AiScribeModal = ({ isOpen, onClose, patientId, encounterId = "ENC-20260829-001" }) => {
  const [language, setLanguage] = useState("en-US");
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        let currentTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        message.error("Speech recognition error: " + event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
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
        recognitionRef.current.lang = language;
        recognitionRef.current.start();
        setIsRecording(true);
        // Clear previous transcripts on new recording
        setTranscript("");
        setTranslatedText("");
      }
    }
  };

  const handleTranslate = async () => {
    if (!transcript.trim()) return;
    setIsTranslating(true);
    try {
      // Using MyMemory translation API as a free alternative for Tamil to English
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

    setIsSubmitting(true);
    try {
      const response = await fetch("https://physicianhealthnet.com/api/scribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "bd4037edf73e2270c9f59f1a9513952d6f023d7a12e741e4046a304dd2e93fc2",
        },
        body: JSON.stringify({
          patientId: patientId || "PAT-10025",
          encounterId: encounterId,
          transcript: finalTranscript,
        }),
      });

      if (response.ok) {
        message.success("Transcript sent to AI Scribe successfully!");
        onClose();
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
    <Modal
      title={
        <div className="flex items-center gap-2">
          <Icon icon="solar:microphone-3-bold-duotone" className="text-blue-500 text-xl" />
          <span>AI Scribe</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
      destroyOnClose
    >
      <div className="flex flex-col gap-4 mt-4">
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

        <div className="flex justify-center my-4">
          <button
            onClick={toggleRecording}
            className={`flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 ${
              isRecording 
                ? "bg-red-100 text-red-500 animate-pulse border-2 border-red-500" 
                : "bg-blue-100 text-blue-500 hover:bg-blue-200"
            }`}
          >
            <Icon icon={isRecording ? "solar:stop-circle-bold" : "solar:microphone-3-bold"} className="text-3xl" />
          </button>
        </div>
        
        {isRecording && (
          <p className="text-center text-sm text-red-500 font-medium">Recording in progress...</p>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Transcript</label>
          <TextArea
            rows={4}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Transcript will appear here..."
            className="w-full"
          />
        </div>

        {language === "ta-IN" && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-slate-700">English Translation</label>
              <AntButton size="small" type="link" onClick={handleTranslate} loading={isTranslating} disabled={!transcript || isRecording}>
                Translate Now
              </AntButton>
            </div>
            <TextArea
              rows={4}
              value={translatedText}
              onChange={(e) => setTranslatedText(e.target.value)}
              placeholder="Translated English text will appear here..."
              className="w-full"
            />
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
          <AntButton onClick={onClose} disabled={isSubmitting}>
            Cancel
          </AntButton>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isRecording || (!transcript && !translatedText) || isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? <Spin size="small" /> : <Icon icon="solar:plain-2-linear" />}
            Submit to AI Scribe
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AiScribeModal;
