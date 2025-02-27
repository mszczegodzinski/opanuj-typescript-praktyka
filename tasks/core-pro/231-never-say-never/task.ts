/* Masz do ulepszenia system przetwarzający różne rodzaje zdarzeń w aplikacji.

Typ zdarzenia jest reprezentowany przez unię eventów. Funkcja obsługi zdarzeń wykorzystuje switch oraz typ never do zapewnienia, że wszystkie przypadki są obsłużone.

Dodano nowy typ zdarzenia, ale nie został on uwzględniony w funkcji obsługi, co powoduje błąd kompilacji.

Aby się z tym uporać, dodaj obsługę logowania nowego zdarzenia zgodnie z wzorcem "Zmieniono rozmiar na ${event.width}x${event.height}"
*/

export type Event =
  | { type: 'click'; x: number; y: number }
  | { type: 'keydown'; key: string }
  | { type: 'resize'; width: number; height: number };

export function handleEvent(event: Event) {
  switch (event.type) {
    case 'click':
      console.log(`Kliknięto w punkcie (${event.x}, ${event.y})`);
      break;
    case 'keydown':
      console.log(`Naciśnięto klawisz ${event.key}`);
      break;
    case 'resize':
      console.log(`Zmieniono rozmiar na ${event.width}x${event.height}`);
      break;
    default:
      const _exhaustiveCheck: never = event;
      throw new Error(`Nieobsługiwane zdarzenie: ${JSON.stringify(_exhaustiveCheck)}`);
  }
}

const resizeEvent: Event = { type: 'resize', width: 1024, height: 768 };
handleEvent(resizeEvent);
