// Auf wie viele Stellen nach dem Komma wollen wir runden?
const AUF_STELLEN_RUNDEN = 1

// Falls sich der BMI mal ändert (Hallo Amerika :) hier zum leichter konfigurieren)
const BMI_KLASSE_1_UNTERGEWICHT_STARK = { von: 0, bis: 16, beschreibung: 'starkes Untergewicht' }
const BMI_KLASSE_2_UNTERGEWICHT_MAESSIG = { von: 16, bis: 17, beschreibung: 'mäßiges Untergewicht' }
const BMI_KLASSE_3_UNTERGEWICHT_LEICHT = { von: 17, bis: 18.5, beschreibung: 'leichtes Untergewicht' }
const BMI_KLASSE_4_UNTERGEWICHT_NORMAL = { von: 18.5, bis: 25, beschreibung: 'Normalgewicht' }
const BMI_KLASSE_5_UNTERGEWICHT_PRAE = { von: 25, bis: 30, beschreibung: 'Präadipositas' }
const BMI_KLASSE_6_UNTERGEWICHT_ADI1 = { von: 30, bis: 35, beschreibung: 'Adipositas I' }
const BMI_KLASSE_7_UNTERGEWICHT_ADI2 = { von: 35, bis: 40, beschreibung: 'Adipositas II' }
const BMI_KLASSE_8_UNTERGEWICHT_ADI3 = { von: 40, bis: Infinity, beschreibung: 'Adipositas III' }

// Außerdem wollen wir alle BMI-Klassen zusammenfassen
const BMI_KLASSEN = [
    BMI_KLASSE_1_UNTERGEWICHT_STARK,
    BMI_KLASSE_2_UNTERGEWICHT_MAESSIG,
    BMI_KLASSE_3_UNTERGEWICHT_LEICHT,
    BMI_KLASSE_4_UNTERGEWICHT_NORMAL,
    BMI_KLASSE_5_UNTERGEWICHT_PRAE,
    BMI_KLASSE_6_UNTERGEWICHT_ADI1,
    BMI_KLASSE_7_UNTERGEWICHT_ADI2,
    BMI_KLASSE_8_UNTERGEWICHT_ADI3
]

// Diese klasse wollen wir exportieren, damit wir sie mit
//    import { BMI } from './DATEINAME.js'
// importieren können
// Dafür also "export class"
export class BMI {
    // Der Konstruktor wird aufgerufen, wenn wir mit `new BMI()`
    // eine Klasse erstellen
    constructor() {
        this._groesse = 0
        this._gewicht = 0
        this._bmi = 0
    }

    // Mit dieser Klasse berechnen wir this._bmi neu.
    calcBmi() {
        const RUNDUNG = 10 * AUF_STELLEN_RUNDEN

        // Null abfangen, da wir sonst durch 0 teilen.
        if (this._groesse === 0) {
            this._bmi = -1
            return
        }

        // Wir geben die Größe in cm an - BMI Formel will aber m
        const groesseInMetern = this.groesse / 100

        // Die eigentliche Formel nach Wikipedia:
        // -> https://de.wikipedia.org/wiki/Body-Mass-Index
        const bmi = this.gewicht / (groesseInMetern * groesseInMetern)

        // BMI nach festgelegter Rundung runden
        this._bmi = Math.round(RUNDUNG * bmi) / RUNDUNG
    }

    // Getter - einfach mal werte zurück geben.
    get bmi() { return this._bmi }
    get groesse() { return this._groesse }
    get gewicht() { return this._gewicht }

    // Setter - da wir ja nicht einfach object.groesse setzen wollen,
    // sondern direkt auch den BMI neu berechnen :)
    set groesse(newGroesse) {
        this._groesse = Number(newGroesse)
        this.calcBmi()
    }

    set gewicht(newGewicht) {
        this._gewicht = Number(newGewicht)
        this.calcBmi()
    }

    // Fancy rückgabe der BMI Klasse
    get bmiKlasse() {
        // lokal für weniger schreiben :D
        const bmi = Number(this._bmi)

        const gewichtsKlasse = BMI_KLASSEN.filter(klasse => klasse.von <= bmi && klasse.bis > bmi)[0]

        return gewichtsKlasse.beschreibung
    }
}

// Ach ja, vllt wird nicht ganz klar,
// warum ich hier manche Bezeichner groß, klein oder mit ._ geschrieben habe.
// Ich habe gegoogelt, was die Leute im WWW für die jetzige best Practice erachten. 
// Im Schnitt kommen auf 2 Programmierer 3 Meinungen glaube ich :)
// Ich habe die Büchse der Pandora geöffnet (neeeeiiiinnn)
// Aber tolle Dinge gelernt: https://www.w3schools.com/js/js_es6.asp 
// https://stackoverflow.com/questions/22156326/private-properties-in-javascript-es6-classes#28165599
// die komplett groß geschriebenen Konstanten sind Skalar. 
// ich hoffe ich habe alles richtig angewendet. 
// Kritik und Anregungen Willkommen! Herzlichen Dank :)