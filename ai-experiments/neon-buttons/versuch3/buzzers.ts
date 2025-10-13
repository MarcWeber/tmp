import { GoogleGenAI } from "@google/genai"
import fs from "node:fs";
import path from "node:path";
import { geminiAIImages } from "./src";

// --- Configuration ---
// Replace with your actual model name
const modelName = 'imagen-4.0-generate-preview-06-06';

// Initialize the GoogleGenAI client (will automatically look for GEMINI_API_KEY env var)
const ai = new GoogleGenAI({}); 

async function generateAndSaveImage() {

    // 6 eckige
    const buzzing_button_description = (show_text: boolean = true) => `
        Buzzing BUttons sehen wie folgt aus:
        - 4cm hoch
        - große rote rote Fläche ${show_text ? "mit dem Logo >SpielJetzt< eingraviert" : ""} in der Mitte zum draufhauhen 
        `

    const topics = {
        // 'buzzers_at_wall': `
        //     Erstelle ein Bild von einem Kind welches vor einer Wand steht.
        //     Man sieht den Rücken des Kindes !
        //     Es drückt agility buttons an der Wand.

        //     Das Bild zeigt auch folgende Hinweise:
        //     fördert:
        //     - Flexibilität
        //     - Reaktionsgeschwindigkeit
        //     - Gehirnverbindungen
        //     - Gehirndrainage

        //     ${buzzing_button_description()}
        // `,

        // 'two_children_competing': `
        //     Zwei Kinder sitzen an einem Tisch mit der Hand direkt über dem Buzzing-Button.
        //     Sie hören einem Handy zu welches die Frage stellt: "Wer hat .. ?"

        //     ${buzzing_button_description()}
        // `,

        // 'math_challenge': `
        //     10 Buzzing-Buttons sind auf dem Tisch verteilt in der Form

        //         1 2 3
        //         3 4 5
        //         7 8 9

        //         wie eine Telefontastatur.

        //     Das Handy frägt "3x9"
        //     Und das Kind haut seine Hand auf den Knopf an der Position 2


        //     ${buzzing_button_description()}
        // `,

        // 'multiple_choice': `
        //     5 Buzzing-Buttons sind auf dem Tisch in in der Reihe verteilt.

        //     Das Handy frägt "Wer ist schneller: 1) eine Ameise 2) ein Pferd 3) ein Habicht"

        //     Ein Kind sitzt am Tisch und drückt Button 2

        //     ${buzzing_button_description()}
        // `,


        // 'essen_ist_fertig': `
        //     In der Küche mit Herd und Kühlschrank und Abzug gibts einen Buzzer an der Wand.
        //     Die etwas sexy aber nicht nuttig aussehende Hausfrau drückt drauf
        //     und 3 Personen bekommen >essen ist fertig< auf ihr Handy

        //     ${buzzing_button_description(false)}
        // `,

        'langlebig_und_vielseitig': `
            Grosser Text >Auch als Smart-Home BUttons verwendendbar<

            3 Buzzer an der Wand mit den Aufschriften
            "öffnet Garagentor"
            "schaltet Sauna an"
            "Kaffee"

            ${buzzing_button_description(false)}
        `
    }
  
  try {

        const erstell_bilder = async (k: string, v: string) => {
                console.log(k);
                const prompt = `Erstelle mir diesse Werbe-Bild in leuchtendem Neon-Stil: ${v}`

                const genimages = geminiAIImages()("imagen-4.0-generate-preview-06-06")
                const images = await genimages({
                    prompt,
                    numberOfImages: 4
                })

                for (let [i, v] of images.asbuffers().entries()){
                    const path = `${k}-${i}.jpg`
                    fs.writeFileSync(path, v)
                }
        }

        await Promise.all(Object.entries(topics).map(([k,v]) => erstell_bilder(k,v)))

  } catch (error) {
    console.error("An error occurred during image generation or saving:");
    // Log the full error to help with debugging API key/permissions/quota issues
    console.error(error);
  }
}

generateAndSaveImage();
