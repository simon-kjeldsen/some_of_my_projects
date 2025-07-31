# News Aggregator API Opsætning

## Sådan får du din gratis NewsAPI nøgle:

### 1. Opret en konto
- Gå til [NewsAPI.org](https://newsapi.org/)
- Klik på "Get API Key" og opret en gratis konto

### 2. Få din API nøgle
- Log ind på din konto
- Du får automatisk en gratis API nøgle
- Kopier nøglen fra dashboard

### 3. Konfigurer miljøvariablen
Opret eller opdater `.env.local` filen i roden af dit projekt:

```bash
# .env.local
NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=din_weather_api_nøgle
NEXT_PUBLIC_NEWS_API_KEY=din_news_api_nøgle
```

### 4. Test appen
- Start development serveren: `npm run dev`
- Gå til `/news` for at teste live nyheds-data

## Funktioner

✅ **Live nyheds-data** fra NewsAPI.org  
✅ **7 kategorier**: Generelt, Erhverv, Teknologi, Sport, Underholdning, Sundhed, Videnskab  
✅ **Søgefunktion** med real-time søgning  
✅ **Responsive design** med flot UI  
✅ **Fejlhåndtering** - graceful fallback ved API fejl  
✅ **Live/Demo indikator** - viser om data er live eller mock  

## Gratis API begrænsninger

- **1,000 requests per day** (tilstrækkeligt for personlig brug)
- **Top headlines** og **Everything** endpoints inkluderet
- **Dansk sprog** understøttet (country=dk)
- **Real-time data** fra 70,000+ kilder

## Kategorier

- **Generelt** 📰 - Almindelige nyheder
- **Erhverv** 💼 - Virksomheder og økonomi
- **Teknologi** 💻 - Tech og innovation
- **Sport** ⚽ - Sportsnyheder
- **Underholdning** 🎬 - Film, musik, kultur
- **Sundhed** 🏥 - Sundhed og medicin
- **Videnskab** 🔬 - Forskning og videnskab

## Fejlfinding

Hvis appen ikke indlæser nyheder:
1. Tjek at din NewsAPI nøgle er korrekt i `.env.local`
2. Vent et par minutter efter oprettelse af API nøgle (aktivering)
3. Tjek din internetforbindelse
4. Se browser console for fejlmeddelelser

## Sikkerhed

- API nøglen er kun synlig på client-side (NEXT_PUBLIC_)
- Gratis tier er sikkert at bruge
- Ingen personlige data sendes til NewsAPI
- Alle links åbner i nye tabs (target="_blank") 