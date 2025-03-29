
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import WeatherCard from "@/components/dashboard/WeatherCard";
import DiseaseScanner from "@/components/dashboard/DiseaseScanner";
import VoiceAssistantPanel from "@/components/voiceassistant/VoiceAssistantPanel";

const Home = () => {
  return (
    <PageContainer>
      <WelcomeHeader />
      
      <div className="mt-4 mx-4">
        <WeatherCard />
      </div>
      
      <div className="mx-4 mt-6">
        <VoiceAssistantPanel />
      </div>
      
      <DiseaseScanner />
      
      <div className="mb-24"></div>
    </PageContainer>
  );
};

export default Home;
