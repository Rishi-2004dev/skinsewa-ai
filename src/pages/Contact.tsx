
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

// Declare the google maps types
declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: any) => any;
        Marker: new (options: any) => any;
      };
    };
  }
}

export default function Contact() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "Thank you for contacting us. We will get back to you soon.",
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  useEffect(() => {
    // Initialize Google Maps
    const loadGoogleMaps = () => {
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      googleMapScript.async = true;
      googleMapScript.defer = true;
      googleMapScript.onload = initMap;
      document.head.appendChild(googleMapScript);
    };

    const initMap = () => {
      if (!mapLoaded && window.google && document.getElementById('googleMap')) {
        // New Delhi coordinates
        const newDelhi = { lat: 28.6139, lng: 77.2090 };
        
        // Create map
        const map = new window.google.maps.Map(document.getElementById('googleMap'), {
          center: newDelhi,
          zoom: 15,
          styles: [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{ color: '#263c3f' }]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#6b9a76' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#38414e' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#212a37' }]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#9ca5b3' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{ color: '#746855' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#1f2835' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#f3d19c' }]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{ color: '#2f3948' }]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#17263c' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#515c6d' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#17263c' }]
            }
          ]
        });
        
        // Add marker
        new window.google.maps.Marker({
          position: newDelhi,
          map,
          title: 'SkinSewa Headquarters'
        });
        
        setMapLoaded(true);
      }
    };

    // Instead of loading actual Google Maps (which requires API key), we'll create a placeholder
    // In a real application, you would uncomment this:
    // loadGoogleMaps();
    
    return () => {
      // Cleanup if needed
    };
  }, [mapLoaded]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card className="overflow-hidden border border-border dark:bg-gray-800/50">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Get in Touch</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Have questions about our services? Want to book an appointment? Reach out to us.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-skinsewa-pink mt-1" />
                    <div>
                      <h3 className="font-medium">Our Location</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        123 Skin Care Avenue, New Delhi 110001, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-skinsewa-pink mt-1" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-300">+91-11-12345678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-skinsewa-pink mt-1" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300">info@skinsewa.in</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-skinsewa-pink mt-1" />
                    <div>
                      <h3 className="font-medium">Office Hours</h3>
                      <div className="text-gray-600 dark:text-gray-300 space-y-1">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-border dark:bg-gray-800/50">
              <CardContent className="p-0 h-[350px]">
                <div id="googleMap" className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <div className="text-center p-4 space-y-2">
                    <div className="mx-auto w-10 h-10 rounded-full bg-skinsewa-pink/20 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-skinsewa-pink" />
                    </div>
                    <p>SkinSewa Headquarters</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">123 Skin Care Avenue, New Delhi 110001, India</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      (Interactive Google Maps would appear here with valid API key)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="border border-border dark:bg-gray-800/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 dark:text-gray-200">
                      Name
                    </label>
                    <Input 
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 dark:text-gray-200">
                      Email
                    </label>
                    <Input 
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1 dark:text-gray-200">
                      Message
                    </label>
                    <Textarea 
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      className="dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-skinsewa-pink hover:bg-skinsewa-pink/90 dark:bg-skinsewa-pink dark:hover:bg-skinsewa-pink/90"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
