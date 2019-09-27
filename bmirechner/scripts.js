// Importiere die BMI Klasse aus der Datei bmiClass.js
import { BMI } from './bmiClass.js'

// Erstelle das bmiObject - zu diesem Zeitpunkt noch leer
const bmiObject = new BMI()

// Hole relevante Elemente: Eingaben & Ausgaben
const gewichtElement = document.getElementById('gewicht')
const groesseElement = document.getElementById('groesse')
const bmiElement = document.getElementById('bmi')
const bmiBeschreibungElement = document.getElementById('bmi_beschreibung')

// Setzt und holt Werte aus der BMI Klasse
const updateBmiOutput = () => {
    bmiObject.gewicht = gewichtElement.value
    bmiObject.groesse = groesseElement.value
    bmiElement.value = bmiObject.bmi
    bmiBeschreibungElement.value = bmiObject.bmiKlasse
}

// Höre auf Änderungen. 'change' ist universell - 'keyup' meistens schneller ;)
// https://www.w3schools.com/jsref/event_onkeyup.asp
gewichtElement.addEventListener('change', updateBmiOutput)
gewichtElement.addEventListener('keyup', updateBmiOutput)
gewichtElement.addEventListener('keydown', updateBmiOutput)
groesseElement.addEventListener('change', updateBmiOutput)
groesseElement.addEventListener('keyup', updateBmiOutput)
groesseElement.addEventListener('keydown', updateBmiOutput)

// Starte mit anständigen Werten
gewichtElement.value = 80
groesseElement.value = 170
updateBmiOutput()