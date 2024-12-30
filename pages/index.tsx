'use client';

import { useEffect, useState } from 'react';
import BarLoader from '../components/BarLoader';
import DebugGrid, { toggleDebugGrid } from '../components/DebugGrid';
import ActionButton from '../components/ActionButton';
import Badge from '../components/Badge';
import CirclingElements from '../custom-components/CirclingElements';
import Image from 'next/image';
import styles from './index.module.scss';
import TreeView from '../components/TreeView';
import Card from '../components/Card';
import RSVPForm from '../custom-components/RSVPForm';
import Story from '../custom-components/Story';
import BarProgress from '../components/BarProgress';
import VenueSection from '../custom-components/VenueSection';
import StaysSection from '../custom-components/StaysSection';
import TravelSection from '../custom-components/TravelSection';
import FAQSection from '../custom-components/FAQSection';
import ConciergeSection from '../custom-components/ConciergeSection';
import MainNavigation from '../custom-components/MainNavigation';
import Drawer from '../components/Drawer';
import CustomLoader from '../custom-components/CustomLoader';
import Image1 from '../public/images/1.jpg';
import Image2 from '../public/images/2.jpg';
import Image3 from '../public/images/3.jpg';
import Image4 from '../public/images/4.jpg';
import Image5 from '../public/images/5.jpg';

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
  const [playlistLoading, setPlaylistLoading] = useState(true);
  const [storyHasPlayed, setStoryHasPlayed] = useState(false);
  const [playlistProgress, setPlaylistProgress] = useState(0);

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
    setSelectedImage(null);
  };

  const handleAlbumClick = (imageName: string) => {
    resetAllSections();
    setSelectedImage(imageName);
  };

  const handleRSVPClick = () => {
    resetAllSections();
    setShowRSVP(true);
  };

  const handleStoryClick = () => {
    resetAllSections();
    setShowStory(true);
  };

  const handleMenuClick = (section?: string) => {
    resetAllSections();
    setShowVenue(section === 'venue');
    setShowStays(section === 'stays');
    setShowTravel(section === 'travel');
    setShowFAQ(section === 'faq');
    setShowConcierge(section === 'concierge');
  };

  const handlePlaylistClick = () => {
    resetAllSections();
    setShowPlaylist(true);
    setPlaylistLoading(true);
  };

  return (
    <div className={styles.container}>
      <DebugGrid />
      {!loading && temperature && (
        <>
          <MainNavigation 
            temperature={temperature}
            onStoryClick={handleStoryClick}
            onAlbumClick={handleAlbumClick}
            onDetailsClick={(section) => handleMenuClick(section)}
            onMenuClick={handleMenuClick}
            onRSVPClick={handleRSVPClick}
            onConciergeClick={() => handleMenuClick('concierge')}
            onFAQClick={() => handleMenuClick('faq')}
            onPlaylistClick={handlePlaylistClick}
          />
          {/* Add padding to account for fixed top bar */}
          <div className="pt-16 flex">
            {/* Left drawer */}
            <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] z-50">
              <Drawer defaultValue={false}>
                <div className="w-[300px]" style={{ background: 'var(--theme-background)' }}>
                  <Card title="FILESYSTEM.EXE">
                    <TreeView 
                      title="FILES" 
                      defaultValue={true} 
                      isRoot 
                      expandedTitle="COLLAPSE FILES"
                      collapsedTitle="EXPAND FILES"
                    >
                      <TreeView title="ALBUM">
                        <TreeView 
                          title="a.JPG" 
                          isFile 
                          onClick={() => handleAlbumClick('a.JPG')}
                        />
                        <TreeView 
                          title="b.JPG" 
                          isFile 
                          onClick={() => handleAlbumClick('b.JPG')}
                        />
                        <TreeView 
                          title="c.JPG" 
                          isFile 
                          onClick={() => handleAlbumClick('c.JPG')}
                        />
                        <TreeView 
                          title="d.JPG" 
                          isFile 
                          onClick={() => handleAlbumClick('d.JPG')}
                        />
                        <TreeView 
                          title="e.JPG" 
                          isFile 
                          onClick={() => handleAlbumClick('e.JPG')}
                        />
                        <TreeView 
                          title="f.JPG" 
                          isFile 
                          onClick={() => handleAlbumClick('f.JPG')}
                        />
                        <TreeView 
                          title="g.JPG" 
                          isFile 
                          onClick={() => handleAlbumClick('g.JPG')}
                        />
                        <TreeView 
                          title="h.JPG" 
                          isFile 
                          onClick={() => handleAlbumClick('h.JPG')}
                        />
                        <TreeView 
                          title="i.JPG" 
                          isFile 
                          onClick={() => handleAlbumClick('i.JPG')}
                        />
                        <TreeView 
                          title="j.JPG" 
                          isFile 
                          onClick={() => handleAlbumClick('j.JPG')}
                        />
                        <TreeView 
                          title="k.JPG" 
                          isFile 
                          onClick={() => handleAlbumClick('k.JPG')}
                        />
                        <TreeView 
                          title="l.JPG" 
                          isFile 
                          onClick={() => handleAlbumClick('l.JPG')}
                        />
                        <TreeView 
                          title="m.JPG" 
                          isFile 
                          onClick={() => handleAlbumClick('m.JPG')}
                        />
                      </TreeView>
                      <TreeView 
                        title="CONCIERGE" 
                        isFile 
                        onClick={() => handleMenuClick('concierge')}
                      />
                      <TreeView 
                        title="DETAILS"
                      >
                        <TreeView 
                          title="PROGRAMME" 
                          isFile 
                          onClick={() => handleMenuClick('venue')}
                        />
                        <TreeView 
                          title="STAYS" 
                          isFile 
                          onClick={() => handleMenuClick('stays')}
                        />
                        <TreeView 
                          title="TRAVEL" 
                          isFile 
                          onClick={() => handleMenuClick('travel')}
                        />
                      </TreeView>
                      <TreeView 
                        title="FAQ" 
                        isFile 
                        onClick={() => handleMenuClick('faq')}
                      />
                      <TreeView 
                        title="PLAYLIST" 
                        isFile 
                        onClick={handlePlaylistClick}
                      />
                      <TreeView 
                        title="RSVP" 
                        isFile 
                        onClick={handleRSVPClick}
                      />
                      <TreeView 
                        title="STORY" 
                        isFile 
                        onClick={handleStoryClick}
                      />
                    </TreeView>
                  </Card>
                </div>
              </Drawer>
            </div>
            {/* Main content */}
            <div className="flex-1 pl-12">
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
                              <div className="absolute inset-0 flex justify-center items-center bg-white">
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
                  <CirclingElements radius={150} duration={20}>
                    <div className="w-[min(195px,19.5vw)] h-[min(195px,19.5vw)]">
                      <Image 
                        src={Image1}
                        alt="Wedding Image 1" 
                        className="rounded-lg object-cover"
                        fill
                        sizes="(max-width: 195px) 19.5vw, 195px"
                        priority
                      />
                    </div>
                    <div className="w-[min(195px,19.5vw)] h-[min(195px,19.5vw)]">
                      <Image 
                        src={Image2}
                        alt="Wedding Image 2" 
                        className="rounded-lg object-cover"
                        fill
                        sizes="(max-width: 195px) 19.5vw, 195px"
                        priority
                      />
                    </div>
                    <div className="w-[min(195px,19.5vw)] h-[min(195px,19.5vw)]">
                      <Image 
                        src={Image3}
                        alt="Wedding Image 3" 
                        className="rounded-lg object-cover"
                        fill
                        sizes="(max-width: 195px) 19.5vw, 195px"
                        priority
                      />
                    </div>
                    <div className="w-[min(195px,19.5vw)] h-[min(195px,19.5vw)]">
                      <Image 
                        src={Image4}
                        alt="Wedding Image 4" 
                        className="rounded-lg object-cover"
                        fill
                        sizes="(max-width: 195px) 19.5vw, 195px"
                        priority
                      />
                    </div>
                    <div className="w-[min(195px,19.5vw)] h-[min(195px,19.5vw)]">
                      <Image 
                        src={Image5}
                        alt="Wedding Image 5" 
                        className="rounded-lg object-cover"
                        fill
                        sizes="(max-width: 195px) 19.5vw, 195px"
                        priority
                      />
                    </div>
                  </CirclingElements>
                )}
              </div>
            </div>
          </div>

          <div className="fixed bottom-5 left-5">
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