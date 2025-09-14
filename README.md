# TypeScript Examination World Clock 

## Dokumentation 

### Hur tänkte du när du skissade gränssnitt? Gärna länk till skisser.

När jag började fundera på hur jag ville att gränssnittet skulle vara ville jag att det skulle vara enkelt och tydligt så att vem som helst kan använda min applikation. 
[Länk till Figma](https://www.figma.com/design/Qu5LdzFKVbjgxQiNditeU2/Untitled?node-id=0-1&m=dev&t=W4cBhsFydOv5ZIJv-1)

---

### Hur har du valt att dela upp din applikation?
Jag valde att dela upp min applikation i flera komponenter för att lätt kunna hålla koden organiserad och återandvändbar och lätt att kunna gå tillbaka till specifik fil om jag skulle vilja göra om något i framtiden eller om det skulle uppstå buggar. 
**App.tsx**: Min huvudkomponent som hanterar routing mellan vyerna.
**AddCityForm.tsx**: Formuläret för att lägga till en stad antingen från den färdiga listan eller via egen tidszon.
**CitiesView.tsx**: Visar min lista över städerna med digital klocka, datum och knappar för att vis analog klocka samt ta bort knapp.
**CityClockView.tsx**: Visar dom analoga klockorna för specifik stad och navigering mellan dom olika städerna med hjälpa av pilar.
**TimeDisplay.tsx**: Ansvarar för att rendera både digital och analog klocka. 

--- 
### Vilka funktioner/logik ligger utanför komponenter? Varför? 
**useLocalStorage.tsx**: Ansvarar för att spara och hämta städerna i localStorage.
**Types.ts**: Alla olika typer och interface som city,ClockSettings och Timezone. 
Dom ligger utanför komponenter eftersom den är generell och kan återanvändas i flera delar av applikationen.

### Förklara och motivera din val av struktur (enligt ovanstående punkter)
Separationen mellan UI-komponenter, logik och typer gör koden mer läsbar, återandvändbar och lättare att underhålla vid antingen buffar eller om man vill bygga vidare på den.

---

### Förklara minst 3 ställen där TypeScript ger fördelar jämfört med JavaScript i din kod

**1. Strukturerade data med interface**

```ts 
export interface City {
  id: string;
  name: string;
  timezone: TimeZone;
  imageUrl?: string;
}
```
Här får jag en tydlig bild av hur en stad ska se ut och TypeScript kommer att stoppa med direkt om jag glömt ett fält eller skriver fel typ. I JavaScript hade jag bara upptäckt det när jag kört applikationen.

**2. Säker routing med UseParams**

```ts
const { id } = useParams<{ id: string }>();
````
Genom att jag har <{ id: string }> vet jag att id alltid ska vara en string och utan detta hade id kunnat vara undefined eller fel typ utan varning. TypeScript minskar risken för buggar när jag använder id för att hitta rätt stad.

**3. Strikare kontroll på datum**
```ts
const [validTime, setValidTime] = useState<Date>(new Date());
````
Här ser TypeScript till att validTime alltid är en Date, om jag försöker spara något annat t.ex. en string får jag fel direkt. I JavaScript hade jag kunnat fått konstiga buggar för när klockan försöker rendera.

### Hur gick du tillväga när du använde Git, samt när du testade att programmet faktiskt fungerade som det ska.
Jag gjorde min sida först direkt i VS code utan Git, men sen gjorde jag en repsitory och började om med koden just för att jag ville få in rutinen att göra commits och komma in mer i Git igen. Så då gjorde jag en commit efter varje fil jag gjorde, tills jag var inne i ett flow och glömde göra en commit och började hålla på på fler ställen och gjorde inte commit för varje fil utan råkade blir för alla ändring jag hade gjort för stunden. När jag testade min sida gjorde jag det i webbläsaren och jag hade alltid igång min sida i webbläsare eftersom att man ser ändringar direkt när man ändrar nånting. Testade att all funktionalitet fungerade som att både digitala och analoga klockorna visade rätt tid. Att knapparna jag lagt till visade rätt saker och fungerade som dom skulle.

---
### Vilka typer och interfaces har du valt att lägga i egna filer för återanvändning?

**1. TimeZone - type**

```ts
export type TimeZone = 
| "Europe/Stockholm"
| "Europe/Paris"
| "Europe/London"
| "America/New_York"
| "America/Los_Angeles"
| "Asia/Tokyo"
| "Asia/Shanghai"
| "Australia/Sydney"
| (string & {});
```
Används i AddCityFrom och TimeDisplay

**2. City - Interface**

```ts
export interface City {
    id: string;         
    name: string        
    timezone: TimeZone; 
    imageUrl?: string;  
}
````
Används i CitiesView, AddCityForm och i TimeDisplay

**3. ClockSettings - interface**

```ts
export interface ClockSettings {
    mode: "digital" | "analog"
}
````
Används i TimeDisplay

---

### Fördelar med Typescript jämfört med JavaScript

**1: Strika typer för props**

```ts
interface ClockProps {
  timezone: TimeZone | string;
  mode: "digital" | "analog";
  radius?: number;
}
````
TypeScript ser till att jag inte råkar skicka in felaktiga props. Tillexmpel om jag istället hade skrivit mode="clock" iställer för "digital" | "analog" får jag ett fel direkt i Vs code men i JavScript hade jag först sett felet i webbläsaren när jag hade kört koden.


**2. Interfaces och återanvändbara typer**
```ts
export interface City {
  id: string;
  name: string;
  timezone: TimeZone;
  imageUrl?: string;
}
````
Alla filer vet exakt att City-objektet innehåller om jag glömmer att skicka med id när jag skapar en ny stad kommer TypScript att varna direkt. Vilket inte JavSCript hade gjort.

---

### Beskriva hur TypeScript transpileras till JavaScript i ditt projekt.

TypeScript går inte att köra direkt i webbläsare, därför måste koden transpileras med andra ord översättas till vanlig JavaScript. Eftersom att jag använder Vite i mitt projekt så tar Vite hand om procesen automatiskt. Så när jag kör npm run dev i terminalen för att köra applikationen så kontrolleras min kod så om jag har skrivit fel nånstans t.ex. satt en sträng där de ska vara number får jag ett fel. Sen tas alla typer bort för dom syns aldrig i den färdiga JavaScript koden. Därefter transpileras koden till vanlig JAvaScript och webbläsaren förstår då koden. 

---

## Loggbok för World Clock

### Dag 1

Började hålla på och gjorde en Trello för user stories och to do, samt en Figma för hur jag ville ha min design. La mycket tid på designen då det är en del jag tycker är roligt.

### Dag 2-3 
Började sätta upp projektet, starta react, vite,  hämta react router , uuid för att kunna skapa unika ID:n för städerna, göra mapparna, components, hooks. Började att göra Types filen där jag lagt in mina färdiga städer som kommer finnas i min dropdown och interfaces för att veta vad informationen för städerna ska vara. Samt localstorage filen som kommer ihåg vilka städer som har lagts till när du stänger ner sidan eller laddar om sidan. 

### Dag 4-5
Gjorde CityClockView filen som är för den analoga klockan, när man går in på en analog klockan av dom som finns i listan så är det en bakgrundsbild för varje stad, på dom klockorna som man skrivit in själv så har jag valt en bakgrundsbild till dom också men där blir det samma bild för dom själv inskrivna städerna.  Andra filen jag gjorde var TimeDisplay där funktionen för både den digitala klockan och analogas klockans funktion ligger. Eftersom att jag nu gjort all funktion så la jag Router i App.tsx filen för att komma till analoga klockan och att man ska komma tillbaka till första sidan. Här blev commiten till GitHub lite fel då jag la in CSS , bilderna och kommenterade från svenska till engelska kommentarer i AddCityForm och var bara meningen att den skulle läggas upp men skrev in fel så CSSen och bilderna lades upp i den commiten också. Sista jag gjorde för denna dag var att jag valde att lägga in dagens datum på både digitala klockan och analoga klockan. Samt ändrade lite i CSSen. 

### Dag 6-7
Små ändringar som tilläggning av engelska kommentar och fin pill i design samt skrivning av dokumentaionens frågor.