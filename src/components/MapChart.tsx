"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";
import { Map as MapIcon, Maximize2 } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface CountryStats {
  id: string;
  name: string;
  value: number;
}

const countryData: CountryStats[] = [
  { id: "AFG", name: "Afghanistan", value: 19.3 },
  { id: "ALB", name: "Albania", value: 3.3 },
  { id: "DZA", name: "Algeria", value: 2.5 },
  { id: "AGO", name: "Angola", value: 18.7 },
  { id: "ARG", name: "Argentina", value: 2 },
  { id: "ARM", name: "Armenia", value: 4.1 },
  { id: "BGD", name: "Bangladesh", value: 6.8 },
  { id: "BRB", name: "Barbados", value: 1.4 },
  { id: "BLR", name: "Belarus", value: 4.1 },
  { id: "BLZ", name: "Belize", value: 3.3 },
  { id: "BEN", name: "Benin", value: 19.9 },
  { id: "BTN", name: "Bhutan", value: 3.5 },
  { id: "BOL", name: "Bolivia", value: 13.6 },
  { id: "BRA", name: "Brazil", value: 1.8 },
  { id: "BFA", name: "Burkina Faso", value: 41.5 },
  { id: "BDI", name: "Burundi", value: 30.9 },
  { id: "KHM", name: "Cambodia", value: 12.6 },
  { id: "CMR", name: "Cameroon", value: 38.9 },
  { id: "CAF", name: "Central African Republic", value: 26.9 },
  { id: "TCD", name: "Chad", value: 39 },
  { id: "CHL", name: "Chile", value: 5.9 },
  { id: "COL", name: "Colombia", value: 7.1 },
  { id: "COM", name: "Comoros", value: 9.1 },
  { id: "COG", name: "Congo", value: 14.1 },
  { id: "CRI", name: "Costa Rica", value: 3.8 },
  { id: "CIV", name: "Côte d'Ivoire", value: 14.7 },
  { id: "PRK", name: "North Korea", value: 4.3 },
  { id: "COD", name: "DR Congo", value: 14.7 },
  { id: "DOM", name: "Dominican Republic", value: 3.8 },
  { id: "EGY", name: "Egypt", value: 3.6 },
  { id: "SLV", name: "El Salvador", value: 6.9 },
  { id: "SWZ", name: "Eswatini", value: 13.6 },
  { id: "ETH", name: "Ethiopia", value: 45 },
  { id: "FJI", name: "Fiji", value: 16.7 },
  { id: "GAB", name: "Gabon", value: 11.8 },
  { id: "GMB", name: "Gambia", value: 16.9 },
  { id: "GEO", name: "Georgia", value: 1.6 },
  { id: "GHA", name: "Ghana", value: 20.1 },
  { id: "GIN", name: "Guinea", value: 24.2 },
  { id: "GNB", name: "Guinea-Bissau", value: 17.2 },
  { id: "GUY", name: "Guyana", value: 6.4 },
  { id: "HTI", name: "Haiti", value: 35.5 },
  { id: "HND", name: "Honduras", value: 15.3 },
  { id: "IRQ", name: "Iraq", value: 4.5 },
  { id: "JAM", name: "Jamaica", value: 2.9 },
  { id: "JOR", name: "Jordan", value: 1.7 },
  { id: "KIR", name: "Kiribati", value: 16.5 },
  { id: "KGZ", name: "Kyrgyzstan", value: 22.3 },
  { id: "LAO", name: "Laos", value: 28.2 },
  { id: "LSO", name: "Lesotho", value: 13.9 },
  { id: "LBR", name: "Liberia", value: 27.8 },
  { id: "MDG", name: "Madagascar", value: 36.7 },
  { id: "MWI", name: "Malawi", value: 14 },
  { id: "MLI", name: "Mali", value: 22.7 },
  { id: "MRT", name: "Mauritania", value: 14 },
  { id: "MEX", name: "Mexico", value: 4.7 },
  { id: "MNG", name: "Mongolia", value: 14.7 },
  { id: "MNE", name: "Montenegro", value: 7.7 },
  { id: "MMR", name: "Myanmar", value: 9.9 },
  { id: "NPL", name: "Nepal", value: 21.7 },
  { id: "NER", name: "Niger", value: 34.4 },
  { id: "NGA", name: "Nigeria", value: 31.5 },
  { id: "MKD", name: "North Macedonia", value: 2.9 },
  { id: "PAK", name: "Pakistan", value: 11.4 },
  { id: "PAN", name: "Panama", value: 2.3 },
  { id: "PRY", name: "Paraguay", value: 17.9 },
  { id: "PER", name: "Peru", value: 14.5 },
  { id: "RWA", name: "Rwanda", value: 19 },
  { id: "LCA", name: "Saint Lucia", value: 3.3 },
  { id: "WSM", name: "Samoa", value: 13.9 },
  { id: "STP", name: "Sao Tome and Principe", value: 10.5 },
  { id: "SEN", name: "Senegal", value: 22.8 },
  { id: "SRB", name: "Serbia", value: 9.5 },
  { id: "SLE", name: "Sierra Leone", value: 25.2 },
  { id: "SLB", name: "Solomon Islands", value: 17.9 },
  { id: "ZAF", name: "South Africa", value: 3.6 },
  { id: "LKA", name: "Sri Lanka", value: 0.8 },
  { id: "PSE", name: "Palestine", value: 7.3 },
  { id: "SDN", name: "Sudan", value: 18.1 },
  { id: "SUR", name: "Suriname", value: 4.3 },
  { id: "TLS", name: "Timor-Leste", value: 9.2 },
  { id: "TGO", name: "Togo", value: 38.5 },
  { id: "TON", name: "Tonga", value: 26.1 },
  { id: "TTO", name: "Trinidad and Tobago", value: 4.3 },
  { id: "TUN", name: "Tunisia", value: 2.3 },
  { id: "TUR", name: "Turkey", value: 3.8 },
  { id: "TKM", name: "Turkmenistan", value: 0.3 },
  { id: "TCA", name: "Turks and Caicos", value: 6.1 },
  { id: "TUV", name: "Tuvalu", value: 4 },
  { id: "UGA", name: "Uganda", value: 18.1 },
  { id: "UKR", name: "Ukraine", value: 3.2 },
  { id: "TZA", name: "Tanzania", value: 24.8 },
  { id: "URY", name: "Uruguay", value: 4.2 },
  { id: "UZB", name: "Uzbekistan", value: 20.6 },
  { id: "VUT", name: "Vanuatu", value: 15.6 },
  { id: "VNM", name: "Vietnam", value: 6.9 },
  { id: "YEM", name: "Yemen", value: 15.9 },
  { id: "ZMB", name: "Zambia", value: 23 },
  { id: "ZWE", name: "Zimbabwe", value: 27.9 },
];

export function MapChart() {
  const [hoveredCountry, setHoveredCountry] = useState<CountryStats | { name: string; id: string; value: null } | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isMobile) {
      setMousePos({ x: event.clientX, y: event.clientY });
    }
  };

  const handleTouch = (country: any, event: any) => {
    if (isMobile) {
      setHoveredCountry(country);
      // On mobile, the tooltip might be better positioned relative to the touch or just at a fixed spot
      setMousePos({ x: event.touches[0].clientX, y: event.touches[0].clientY });
    }
  };

  const getCountryColor = (value: number | null) => {
    if (value === null) return "hsl(var(--secondary))";
    if (value > 15) return "hsl(var(--destructive))";
    if (value > 5) return "hsl(var(--accent))";
    return "hsl(var(--primary))";
  };

  return (
    <div className="relative w-full" onMouseMove={handleMouseMove}>
      <Card className="p-2 sm:p-4 bg-card border shadow-xl relative overflow-hidden min-h-[400px] md:min-h-[600px] flex items-center justify-center">
        <div className="absolute top-4 left-4 z-10 pointer-events-none sm:top-6 sm:left-6">
          <h3 className="text-sm md:text-xl font-headline font-bold text-primary flex items-center gap-2">
            <MapIcon className="h-4 w-4 md:h-5 md:h-5" /> Global Prevalence Map
          </h3>
          <p className="text-[10px] md:text-sm text-muted-foreground hidden xs:block">Interact with regions to explore data.</p>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-10 bg-background/90 backdrop-blur-sm p-2 sm:p-3 rounded-lg border shadow-sm space-y-1.5 sm:space-y-2 max-w-[120px] sm:max-w-none">
          <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5 sm:mb-1">Key</p>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-destructive" />
            <span className="text-[9px] sm:text-xs">Critical (&gt;15%)</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-accent" />
            <span className="text-[9px] sm:text-xs">High (5-15%)</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary" />
            <span className="text-[9px] sm:text-xs">Low (&lt;5%)</span>
          </div>
        </div>

        <div className="w-full h-full max-w-[1000px]">
          <ComposableMap
            projectionConfig={{
              rotate: [-10, 0, 0],
              scale: isMobile ? 120 : 147
            }}
            className="w-full h-auto"
          >
            <Sphere stroke="hsl(var(--muted))" strokeWidth={0.5} fill="transparent" id="sphere" />
            <Graticule stroke="hsl(var(--muted)/0.3)" strokeWidth={0.5} />
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const country = countryData.find(c => 
                    c.id === geo.properties.ISO_A3 || 
                    c.id === geo.properties.ISO_A2 || 
                    c.name === geo.properties.name
                  );
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        if (!isMobile) setHoveredCountry(country || { name: geo.properties.name, id: geo.properties.ISO_A3 || geo.properties.name, value: null });
                      }}
                      onMouseLeave={() => {
                        if (!isMobile) setHoveredCountry(null);
                      }}
                      onTouchStart={(e) => handleTouch(country || { name: geo.properties.name, id: geo.properties.ISO_A3 || geo.properties.name, value: null }, e)}
                      style={{
                        default: { 
                          fill: getCountryColor(country?.value ?? null),
                          stroke: "hsl(var(--border))",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: { 
                          fill: country ? "hsl(var(--primary)/0.8)" : "hsl(var(--muted))",
                          stroke: "hsl(var(--primary))",
                          strokeWidth: 1,
                          outline: "none",
                          cursor: country ? "pointer" : "default"
                        },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        {/* Mobile Reset Hint */}
        {isMobile && hoveredCountry && (
          <button 
            onClick={() => setHoveredCountry(null)}
            className="absolute top-4 right-4 z-20 bg-background/80 p-2 rounded-full border shadow-sm text-xs font-medium"
          >
            Clear Selection
          </button>
        )}
      </Card>

      {/* Floating Tooltip */}
      {hoveredCountry && (
        <div 
          className={isMobile 
            ? "fixed bottom-20 left-1/2 -translate-x-1/2 z-[100] bg-background border border-border px-4 py-3 rounded-xl shadow-2xl min-w-[200px] text-center"
            : "fixed pointer-events-none z-[100] bg-background/95 backdrop-blur-sm border border-border px-3 py-2 rounded-md shadow-lg animate-in fade-in zoom-in-95 duration-150"
          }
          style={!isMobile ? { 
            left: mousePos.x + 15, 
            top: mousePos.y + 15 
          } : undefined}
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">
              {hoveredCountry.name}
            </span>
            <span className="text-xl font-bold font-headline text-primary">
              {hoveredCountry.value !== null ? `${hoveredCountry.value}%` : "No Data"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
