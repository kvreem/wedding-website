'use client';

import { useEffect, useState } from 'react';
import BarLoader from '../components/BarLoader';
import DebugGrid, { toggleDebugGrid } from '../components/DebugGrid';
import ActionButton from '../components/ActionButton';
import Badge from '../components/Badge';
import CirclingElements from '../components/CirclingElements';
import Image from 'next/image';
import styles from './index.module.scss';
import TreeView from '../components/TreeView';
import Card from '../components/Card';
import RSVPForm from '../components/RSVPForm';
import Story from '../components/Story';

interface WeatherData {
  hourly: {
    temperature_2m: number[];
    time: string[];
  };
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isCelsius, setIsCelsius] = useState(true);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showRSVP, setShowRSVP] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [storyHasPlayed, setStoryHasPlayed] = useState(false);

  useEffect(() => {
    // Show grid on mount
    toggleDebugGrid();
    
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
    const duration = 5000;
    const interval = 40;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setLoading(false);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const tempFahrenheit = temperature ? Math.round((temperature * 9/5) + 32) : null;
  const degreeSymbol = '°'; // Using Unicode degree symbol

  const handleAlbumClick = (imageName: string) => {
    setShowRSVP(false);
    setShowStory(false);
    setSelectedImage(imageName);
  };

  const handleRSVPClick = () => {
    setShowRSVP(true);
    setSelectedImage(null);
  };

  const handleStoryClick = () => {
    setShowStory(true);
    setShowRSVP(false);
    setSelectedImage(null);
  };

  const handleMenuClick = () => {
    setShowRSVP(false);
    setShowStory(false);
    setSelectedImage(null);
  };

  return (
    <div className={styles.container}>
      <DebugGrid />
      {!loading && temperature && (
        <>
          <div className={styles.topBar}>
            <div className={styles.names}>
              <span>Heidi + Kareem</span>
              <span className={styles.date}> La Maison Bleue El Gouna, Hurghada, Egypt September 26th, 2025</span>
            </div>
            <div className={styles.weather}>
              <span className={styles.weatherIcon}>&#9788;</span>
              <span className="hidden md:inline">Temperature in Gouna: </span>
              <span className="md:hidden">Gouna: </span>
              <span>{isCelsius ? `${temperature}${degreeSymbol}C` : `${tempFahrenheit}${degreeSymbol}F`}</span>
              <ActionButton onClick={() => setIsCelsius(!isCelsius)}>
                {isCelsius ? `${degreeSymbol}F` : `${degreeSymbol}C`}
              </ActionButton>
            </div>
          </div>

          {/* Always visible menu */}
          <div className={styles.menu}>
            <Card>
              <TreeView title="Menu" defaultValue={true} isRoot>
                <TreeView 
                  title="RSVP" 
                  isFile 
                  onClick={handleRSVPClick}
                />
                <TreeView 
                  title="Story" 
                  isFile 
                  onClick={handleStoryClick}
                />
                <TreeView title="Album">
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
                  title="Details" 
                  isFile 
                  onClick={handleMenuClick}
                />
                <TreeView 
                  title="FAQ" 
                  isFile 
                  onClick={handleMenuClick}
                />
                <TreeView 
                  title="Concierge" 
                  isFile 
                  onClick={handleMenuClick}
                />
              </TreeView>
            </Card>
          </div>

          <div className="fixed bottom-5 left-5">
            <Badge>Made with &#10084; in NYC</Badge>
          </div>

          <div className={styles.content}>
            {showRSVP ? (
              <RSVPForm onClose={() => setShowRSVP(false)} />
            ) : showStory ? (
              <Story 
                onClose={() => setShowStory(false)} 
                hasPlayed={storyHasPlayed}
                onAutoPlayComplete={() => setStoryHasPlayed(true)}
              />
            ) : selectedImage ? (
              <div className={styles.selectedImage}>
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
                  <div className="absolute top-0 right-0 -mt-4 -mr-4">
                    <ActionButton 
                      onClick={() => {
                        console.log('Clearing selected image');
                        setSelectedImage(null);
                      }}
                    >
                      X
                    </ActionButton>
                  </div>
                </div>
              </div>
            ) : (
              <CirclingElements radius={150} duration={20}>
                <div className="w-[min(150px,15vw)] h-[min(150px,15vw)]">
                  <Image 
                    src="/images/1.jpg" 
                    alt="Wedding Image 1" 
                    width={150} 
                    height={150} 
                    className="rounded-lg object-cover w-full h-full"
                    priority
                  />
                </div>
                <div className="w-[min(150px,15vw)] h-[min(150px,15vw)]">
                  <Image 
                    src="/images/2.jpg" 
                    alt="Wedding Image 2" 
                    width={150} 
                    height={150} 
                    className="rounded-lg object-cover w-full h-full"
                    priority
                  />
                </div>
                <div className="w-[min(150px,15vw)] h-[min(150px,15vw)]">
                  <Image 
                    src="/images/3.jpg" 
                    alt="Wedding Image 3" 
                    width={150} 
                    height={150} 
                    className="rounded-lg object-cover w-full h-full"
                    priority
                  />
                </div>
                <div className="w-[min(150px,15vw)] h-[min(150px,15vw)]">
                  <Image 
                    src="/images/4.jpg" 
                    alt="Wedding Image 4" 
                    width={150} 
                    height={150} 
                    className="rounded-lg object-cover w-full h-full"
                    priority
                  />
                </div>
                <div className="w-[min(150px,15vw)] h-[min(150px,15vw)]">
                  <Image 
                    src="/images/5.jpg" 
                    alt="Wedding Image 5" 
                    width={150} 
                    height={150} 
                    className="rounded-lg object-cover w-full h-full"
                    priority
                  />
                </div>
              </CirclingElements>
            )}
          </div>
        </>
      )}
      {loading && (
        <div className={styles.preloader}>
          <div className={styles.loaderWrapper}>
            <BarLoader progress={progress} />
          </div>
        </div>
      )}
    </div>
  );
} 