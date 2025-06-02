"use client";

// Import React and hooks
import React, { useEffect } from "react";

// Import Lottie for animations, Next.js router, and styled-components for styling
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";

// Import custom components for the landing page
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Login from "@/features/auth/Login";
import { useAppSelector } from "@/store/hooks";

// Home page component
export default function Home() {
  // Get authentication token from Redux store
  const { token } = useAppSelector((state) => state.auth);
  const router = useRouter();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token, router]);

  // Render landing page with header, login, animation, and footer
  return (
    <PageContainer>
      <Header />

      <MainContent>
        {/* Glass effect card with welcome and login */}
        <GlassCard>
          <Title>
            Welcome to <span className="thin">task</span>
            <span className="regular">OS</span>
          </Title>
          <Subtitle>Secure, real-time task management — reimagined.</Subtitle>
          <LoginSection>
            <Prompt>Let's get you started:</Prompt>
            <Login />
          </LoginSection>
        </GlassCard>

        {/* Animated illustration and blurb */}
        <BlurbContainer>
          <Lottie
            animationData={require("@/assets/animations/motionDesigner.json")}
            loop={true}
            autoplay={true}
            style={{ width: "100%", height: "100%" }}
          />
          <Blurb>
            <h2>Why taskOS?</h2>
            <p>
              taskOS simplifies your workflow and keeps your tasks organized
              across devices. Experience seamless task management today.
            </p>
          </Blurb>
        </BlurbContainer>
      </MainContent>

      <Footer />
    </PageContainer>
  );
}

// Styled Components

// Fade-in animation for card
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Main container for the landing page
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: #f1f5f9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Container for main content (card + animation)
const MainContent = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: auto;
`;

// Glass effect card for welcome and login
const GlassCard = styled.div`
  animation: ${fadeIn} 0.6s ease forwards;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  padding: 3rem 2rem;
  text-align: center;
  max-width: 450px;
  flex: 1 1 300px;
  min-width: 280px;

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
`;

// Title styling for the app name
const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;

  span.thin {
    font-weight: 200;
  }

  span.regular {
    font-weight: 400;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

// Subtitle under the title
const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #cbd5e1;
  margin-bottom: 2rem;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

// Section for login prompt and form
const LoginSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
`;

// Prompt text above login form
const Prompt = styled.p`
  margin-bottom: 0.75rem;
  color: #e2e8f0;
  font-weight: 500;
`;

// Container for animation and blurb
const BlurbContainer = styled.div`
  flex: 1 1 300px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #e2e8f0;
`;

// Blurb text below animation
const Blurb = styled.div`
  text-align: center;

  h2 {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.4;
  }
`;
