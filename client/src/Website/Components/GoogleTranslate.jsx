// import React, { useState } from "react";
// import { TranslationServiceClient } from "@google-cloud/translate";

// const GoogleTranslate = () => {
//     const [text, setText] = useState('');
//     const [translatedText, setTranslatedText] = useState('');
//     const [targetLanguage, setTargetLanguage] = useState('en'); // Default target language is English

//     const translateText = async () => {
//         const translatorClient = new TranslatorTextClient('<YOUR_API_KEY>');

//         try {
//             const translationResult = await translatorClient.translate(text, targetLanguage);
//             setTranslatedText(translationResult);
//         } catch (error) {
//             console.error('Error translating text:', error);
//         }
//     };

//     return (
//         <div>
//             <textarea
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 rows={5}
//                 cols={50}
//                 placeholder="Enter text to translate..."
//             ></textarea>
//             <br />
//             <select onChange={(e) => setTargetLanguage(e.target.value)}>
//                 <option value="en">English</option>
//                 <option value="fr">French</option>
//                 <option value="es">Spanish</option>
//                 {/* Add more language options as needed */}
//             </select>
//             <br />
//             <button onClick={translateText}>Translate</button>
//             <br />
//             <textarea
//                 value={translatedText}
//                 rows={5}
//                 cols={50}
//                 placeholder="Translated text will appear here..."
//                 readOnly
//             ></textarea>
//         </div>
//     );
// };
// export default GoogleTranslate;
