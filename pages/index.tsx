'use client';

import { useEffect, useState } from 'react';
import BarLoader from '../components/BarLoader';
import DebugGrid, { toggleDebugGrid } from '../components/DebugGrid';
import ActionButton from '../components/ActionButton';
import Badge from '../components/Badge';
import Image from 'next/image';
import styles from './index.module.scss';
import Card from '../components/Card';
import CardDouble from '../components/CardDouble';
import Message from '../components/Message';
import RSVPForm from '../custom-components/RSVPForm';
import Story from '../custom-components/Story';
import BarProgress from '../components/BarProgress';
import VenueSection from '../custom-components/VenueSection';
import StaysSection from '../custom-components/StaysSection';
import TravelSection from '../custom-components/TravelSection';
import FAQSection from '../custom-components/FAQSection';
import ConciergeSection from '../custom-components/ConciergeSection';
import MainNavigation from '../custom-components/MainNavigation';
import CustomLoader from '../custom-components/CustomLoader';
import Image1 from '../public/images/1.jpg';
import Image2 from '../public/images/2.jpg';
import Image3 from '../public/images/3.jpg';
import Image4 from '../public/images/4.jpg';
import Image5 from '../public/images/5.jpg';
import DesktopIcons from '../custom-components/DesktopIcons';
import Album from '../custom-components/Album';

interface WeatherData {
  hourly: {
    temperature_2m: number[];
    time: string[];
  };
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [isCelsius, setIsCelsius] = useState(true);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showRSVP, setShowRSVP] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showVenue, setShowVenue] = useState(false);
  const [showStays, setShowStays] = useState(false);
  const [showTravel, setShowTravel] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showConcierge, setShowConcierge] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAlbum, setShowAlbum] = useState(true);
  const [albumFirstClose, setAlbumFirstClose] = useState(false);
  const [playlistLoading, setPlaylistLoading] = useState(true);
  const [storyHasPlayed, setStoryHasPlayed] = useState(false);
  const [playlistProgress, setPlaylistProgress] = useState(0);

  const handleRSVPClick = () => {
    resetAllSections();
    setShowRSVP(true);
  };

  const handleStoryClick = () => {
    resetAllSections();
    setShowStory(true);
    
  };

  const handleMenuClick = (section?: string) => {
    setShowRSVP(false);
    setShowStory(false);
    setShowPlaylist(false);
    setShowVenue(false);
    setShowStays(false);
    setShowTravel(false);
    setShowFAQ(false);
    setShowConcierge(false);
    setShowWelcome(false);
    setSelectedImage(null);
    
    if (section === 'venue') setShowVenue(true);
    if (section === 'stays') setShowStays(true);
    if (section === 'travel') setShowTravel(true);
    if (section === 'faq') setShowFAQ(true);
    if (section === 'concierge') setShowConcierge(true);
    if (section === 'welcome') setShowWelcome(true);
    if (section === 'album') setShowAlbum(true);
  };

  const handlePlaylistClick = () => {
    resetAllSections();
    setShowPlaylist(true);
    setPlaylistLoading(true);
  };

  const desktopIcons = [
    { 
      name: 'Album', 
      icon: 'album.ico',
      onClick: () => handleMenuClick('album')
    },
    { 
      name: 'Concierge', 
      icon: 'concierge.ico',
      onClick: () => handleMenuClick('concierge')
    },
    { 
      name: 'FAQ',
      icon: 'faq.ico',
      onClick: () => handleMenuClick('faq')
    },
    { 
      name: 'Programme', 
      icon: 'programme.ico',
      onClick: () => handleMenuClick('venue')
    },
    { 
      name: 'RSVP', 
      icon: 'rsvp.ico',
      onClick: handleRSVPClick
    },
    { 
      name: 'Stays', 
      icon: 'stays.ico',
      onClick: () => handleMenuClick('stays')
    },
    { 
      name: 'Story', 
      icon: 'story.ico',
      onClick: handleStoryClick
    },
    { 
      name: 'Travel', 
      icon: 'travel.ico',
      onClick: () => handleMenuClick('travel')
    },
    { 
      name: 'Welcome.txt', 
      icon: 'welcome.ico',
      onClick: () => handleMenuClick('welcome')
    },
    { 
      name: 'Playlist', 
      icon: 'playlist.ico',
      onClick: handlePlaylistClick
    },
  ];

  useEffect(() => {
    // Remove debug grid toggle on mount
    const fetchWeather = async () => {
      try {
        const response: Response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=27.2574&longitude=33.8129&hourly=temperature_2m',
          { next: { revalidate: 3600 } }
        );
        
        if (!response.ok) {
          throw new Error('Weather data fetch failed');
        }
        
        const data: WeatherData = await response.json();
        const currentTemp = data.hourly.temperature_2m[0];
        setTemperature(currentTemp);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    if (playlistLoading) {
      const duration = 3000; // 3 seconds
      const interval = 50; // Update every 50ms
      const steps = duration / interval;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setPlaylistProgress(Math.min((currentStep / steps) * 100, 100));
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setPlaylistLoading(false);
          setPlaylistProgress(0);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [playlistLoading]);

  const tempFahrenheit = temperature ? Math.round((temperature * 9/5) + 32) : null;
  const degreeSymbol = '°'; // Using Unicode degree symbol

  const resetAllSections = () => {
    setShowRSVP(false);
    setShowStory(false);
    setShowPlaylist(false);
    setShowVenue(false);
    setShowStays(false);
    setShowTravel(false);
    setShowFAQ(false);
    setShowConcierge(false);
    setShowWelcome(false);
    setSelectedImage(null);
  };

  const handleAlbumClick = (imageName: string) => {
    resetAllSections();
    setSelectedImage(imageName);
  };

  const handleAlbumClose = () => {
    setShowAlbum(false);
    setAlbumFirstClose(true);
  };

  return (
    <div className={styles.container}>
      <DebugGrid />
      {!loading && temperature && (
        <>
          <MainNavigation 
            temperature={temperature}
          />
          <div className={styles.content}>
            {showRSVP ? (
              <RSVPForm onClose={resetAllSections} />
            ) : showStory ? (
              <Story 
                onClose={resetAllSections}
                hasPlayed={storyHasPlayed}
                onAutoPlayComplete={() => setStoryHasPlayed(true)}
              />
            ) : showVenue ? (
              <VenueSection onClose={resetAllSections} />
            ) : showStays ? (
              <StaysSection onClose={resetAllSections} />
            ) : showTravel ? (
              <TravelSection onClose={resetAllSections} />
            ) : showFAQ ? (
              <FAQSection onClose={resetAllSections} />
            ) : showConcierge ? (
              <ConciergeSection onClose={resetAllSections} />
            ) : showWelcome ? (
              <div className="w-[500px] max-w-[90vw] mx-auto mt-20">
                <div className="relative">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4">
                    <ActionButton onClick={resetAllSections}>
                      X
                    </ActionButton>
                  </div>
                  <CardDouble title="Welcome.txt">
                    <div className="flex flex-col items-center space-y-4 p-4" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                      <Image
                        src="/images/floating/1.JPEG"
                        alt="Heidi and Kareem"
                        width={300}
                        height={375}
                        className="rounded-lg"
                        priority
                      />
                      <Message>
                        Dear Guests, 
                        <br />
                        <br />
                        Thank you for sharing in this joyous time with us. Your love and support mean the world, and we can't wait for you to experience the magic of Egypt together. We look forward to creating lifelong memories with all of you.
                        <br />
                        <br />
                        With love and gratitude,
                        <br />
                        Heidi & Kareem
                      </Message>
                    </div>
                  </CardDouble>
                </div>
              </div>
            ) : showPlaylist ? (
              <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
                <div className="w-full max-w-[90vw] md:max-w-[600px] px-4">
                  <div className="relative">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 z-50">
                      <ActionButton onClick={resetAllSections}>
                        X
                      </ActionButton>
                    </div>
                    <Card title="PLAYLIST">
                      <div className="relative w-full">
                        {playlistLoading && (
                          <div className="absolute inset-0 flex justify-center items-center">
                            <div className="w-[352px]">
                              <div className={styles.playlistLoader}>
                                <div className={styles.progressText}>
                                  Loading tunes...
                                </div>
                                <div className={styles.bar}>
                                  <div className={styles.barContent}>
                                    {'█'.repeat(Math.floor(playlistProgress / 2)) + '░'.repeat(50 - Math.floor(playlistProgress / 2))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <iframe 
                          className={`w-full transition-opacity duration-300 ${playlistLoading ? 'opacity-0' : 'opacity-100'}`}
                          style={{
                            borderRadius: "12px",
                          }} 
                          src="https://open.spotify.com/embed/playlist/1CoRxdb5G1QYu07Ztn4iOu?utm_source=generator" 
                          width="100%" 
                          height="352" 
                          frameBorder="0" 
                          allowFullScreen 
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                          loading="lazy"
                          onLoad={() => {}}
                        />
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            ) : selectedImage ? (
              <div className={styles.selectedImage}>
                <div className="relative">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 z-50">
                    <ActionButton 
                      onClick={resetAllSections}
                    >
                      X
                    </ActionButton>
                  </div>
                  <Card title={selectedImage.toUpperCase()}>
                    <div className={styles.imageContainer}>
                      <Image
                        src={`/images/album/${selectedImage}`}
                        alt={`Album image - ${selectedImage}`}
                        width={1200}
                        height={800}
                        className="w-auto h-auto"
                        priority
                        onError={(e) => {
                          console.error('Image failed to load:', `/images/album/${selectedImage}`);
                        }}
                      />
                    </div>
                  </Card>
                </div>
              </div>
            ) : (
              <>
                <div className="fixed inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <DesktopIcons icons={desktopIcons} />
                    {(!albumFirstClose || showAlbum) && <Album onClose={handleAlbumClose} />}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="fixed bottom-5 left-5 hidden md:block">
            <Badge>Made with &#10084; in NYC</Badge>
          </div>
        </>
      )}
      {loading && (
        <div className={styles.preloader}>
          <CustomLoader onLoadingComplete={() => setLoading(false)} />
        </div>
      )}
    </div>
  );
} 