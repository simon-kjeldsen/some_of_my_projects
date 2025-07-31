# Vejr-App API Opsætning

## Sådan får du din gratis OpenWeatherMap API nøgle:

### 1. Opret en konto
- Gå til [OpenWeatherMap](https://openweathermap.org/)
- Klik på "Sign Up" og opret en gratis konto

### 2. Få din API nøgle
- Log ind på din konto
- Gå til "My API Keys" sektionen
- Du får automatisk en gratis API nøgle

### 3. Konfigurer miljøvariablen
Opret en `.env.local` fil i roden af dit projekt:

```bash
# .env.local
NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=din_api_nøgle_her
```

### 4. Test appen
- Start development serveren: `npm run dev`
- Gå til `/weather` for at teste live vejr-data

## Funktioner

✅ **Live vejr-data** fra OpenWeatherMap  
✅ **7-dages prognose** med detaljeret information  
✅ **By-skift** - vælg mellem danske byer  
✅ **Vejr-effekter** - regn, sne, torden baseret på rigtig vejr  
✅ **Fejlhåndtering** - graceful fallback ved API fejl  
✅ **Responsive design** - virker på alle enheder  

## Gratis API begrænsninger

- **1,000 calls per dag** (tilstrækkeligt for personlig brug)
- **Current weather** og **5-day forecast** inkluderet
- **Dansk sprog** understøttet
- **Metric units** (Celsius, km/h)

## Fejlfinding

Hvis appen ikke indlæser vejr-data:
1. Tjek at din API nøgle er korrekt i `.env.local`
2. Vent et par minutter efter oprettelse af API nøgle (aktivering)
3. Tjek din internetforbindelse
4. Se browser console for fejlmeddelelser

## Sikkerhed

- API nøglen er kun synlig på client-side (NEXT_PUBLIC_)
- Gratis tier er sikkert at bruge
- Ingen personlige data sendes til OpenWeatherMap 