console.log("Hello from JavaScript!");

const textareaInput = document.getElementById("textarea-input");
const buttonGenerateJson = document.getElementById("generate-json");
const textareaOutput = document.getElementById("textarea-output");
const buttonCopyToClipboard = document.getElementById("copy-to-clipboard");

textareaOutput.value = "";

const schema = {
    Ord: "int",
    Word: "string",
    // Lemmata: "string",
    Length: "int",
    AllConsonants: "string",
    Uncompounded: "string",
    Phonetic: "string",
    Scansion: "string",
    AllVowels: "string",
    SyllableCount: "int",
    Stress: "int",
    UltimaRhyme: "string",
    RhymeVowels: "string",
    PerfectRhyme: "string",
    RhymeConsonants: "string",
    // Ultima: "string",
    RhymeVowelsAndUltimaCoda: "string",
    EcclesPhonetic: "string",
    EcclesVowels: "string",
    EcclesRhymeVowels: "string",
    EcclesRhymeVowelsAndUltimaCoda: "string",
    EcclesPerfectRhyme: "string",
    EcclesSort: "string",
    LemmaCount: "int",
    // Lemma1: "string",
    // Lemma2: "string",
    // Lemma3: "string",
    // Lemma4: "string",
    // Lemma5: "string",
    ScansionWithElision: "string",
    IsFitForDactyl: "int",
    LemmaArray: "array",
    IsLemma: "int",
    IsNonLemma: "int",
    // DuplicateWords: "string",
    // NewLemmata: "string",
    NoMacra: "string",
    NoMacraLowerCase: "string",
    AlphOrderNoMacra: "string",
    Sort: "string",
    // RepeatWord: "string",
}

const lastKey = "Sort";

let outputArray = [];

const output = (line) => {
    outputArray.push(line);
}

const generateJson = () => {
    const allInputRows = textareaInput.value.split("\n");
    const keys = allInputRows[0].split("\t");
    const countColumns = keys.length;
    const valueRows = allInputRows.slice(1, -1);
    const countRows = valueRows.length;
    console.log(countRows);
    console.log(keys);
    for (let i = 0; i < countRows; i++) {
        const rowOfValues = valueRows[i].split("\t");
        output("{");
        for (let j = 0; j < countColumns; j++) {
            const currentKey = keys[j];
            const currentValue = rowOfValues[j];
            const lineTerminator = currentKey == lastKey ? "" : ",";
            // console.log(currentKey, currentValue, schema[currentKey]);
            switch (schema[currentKey]) {
                case "int":
                    output(`"${currentKey}": ${currentValue}${lineTerminator}`);
                    break;
                case "string":
                    output(`"${currentKey}": "${currentValue}"${lineTerminator}`);
                    break;
                case "array":
                    output(`"${currentKey}": ${currentValue}${lineTerminator}`);
                    break;
                default:
                    break;
            }
        }
        output("}")
    }
    displayOutput();
}

const displayOutput = () => {
    textareaOutput.value = outputArray.join("\n");
}

const copyToClipboard = () => {
    textareaOutput.select();
    document.execCommand("copy");
}

buttonGenerateJson.addEventListener("click", ()=>{
    console.log("“Generate Json” button clicked!")
    generateJson();
});

buttonCopyToClipboard.addEventListener("click", ()=>{
    console.log("“Copy to Clipboard” button clicked!")
    copyToClipboard();
});