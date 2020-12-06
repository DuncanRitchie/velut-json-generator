console.log("Hello from JavaScript!");

const textareaInput = document.getElementById("textarea-input");
const textByGenerateJson = document.getElementById("text-by-generate-json");
const buttonGenerateJson = document.getElementById("generate-json");
const textareaOutput = document.getElementById("textarea-output");
const textByCopyToClipboard = document.getElementById("text-by-copy-to-clipboard");
const buttonCopyToClipboard = document.getElementById("copy-to-clipboard");

textareaOutput.value = "";

const wordsSchema = {
    Ord: "int",
    Word: "string",
    // Lemmata: "string",
    Length: "int",
    AllConsonants: "string",
    Uncompounded: "string",
    Phonetic: "string",
    Scansion: "string",
    ScansionWithElision: "string",
    IsFitForDactyl: "int",
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
};

const lemmataSchema = {
    Ord: "int",
    Lemma: "string",
    PartOfSpeech: "string",
    Meanings: "string",
    Notes: "string",
    Transliterations: "string",
    // SpareCol: "string",
    // RootCheck: "string",
    Scansion: "string",
    SyllableCount: "int",
    Root: "string",
    // FreqRank: "int",
    FormCount: "int",
    NoTypeTag: "string",
    NoMacra: "string",
    NoMacraLowerCase: "string",
};

const getSchemaFromHeaderRow = (headerRow) => {
    switch (headerRow[1]) {
        case "Word":
            return wordsSchema;
        case "Lemma":
            return lemmataSchema;
        default:
            return;
    }
}

const getEmptyTextReplacementFromHeaderRow = (headerRow) => {
    switch (headerRow[1]) {
        case "Word":
            return "0";
        default:
            return "null";
    }
}

const getLastKey = (schema) => {
    const keys = Object.keys(schema);
    return keys[keys.length - 1];
}

let outputArray = [];

const output = (line) => {
    outputArray.push(line);
}

const generateJson = () => {
    textByGenerateJson.textContent = "Generating Json, please wait...";
    textByCopyToClipboard.textContent = "";
    outputArray.length = 0;
    const allInputRows = textareaInput.value.split("\n");
    const headerRow = allInputRows[0].split("\t");
    const schema = getSchemaFromHeaderRow(headerRow);
    const emptyTextReplacement = getEmptyTextReplacementFromHeaderRow(headerRow);
    const lastKeyInSchema = getLastKey(schema);
    const countColumns = headerRow.length;
    const valueRows = allInputRows.slice(1);
    const countRows = valueRows.length;
    console.log(countRows);
    console.log(headerRow);
    for (let i = 0; i < countRows; i++) {
        if (valueRows[i] == "") { continue; }

        const rowOfValues = valueRows[i].split("\t");
        output("{");

        let valuesAsObject = {};
        for (let j = 0; j < countColumns; j++) {
            const currentKey = headerRow[j];
            const currentValue = rowOfValues[j];
            valuesAsObject[currentKey] = currentValue;
        }

        for (let currentKey in schema) {
            const currentValue = valuesAsObject[currentKey];
            const lineTerminator = currentKey == lastKeyInSchema ? "" : ",";
            switch (schema[currentKey]) {
                case "int":
                    output(`"${currentKey}": ${currentValue ? currentValue : "null"}${lineTerminator}`);
                    break;
                case "string":
                    output(`"${currentKey}": ${currentValue ? `"${currentValue}"` : emptyTextReplacement}${lineTerminator}`);
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
    textByGenerateJson.textContent = "Json generated!";
}

const displayOutput = () => {
    textareaOutput.value = outputArray.join("\n");
}

const copyToClipboard = () => {
    textByCopyToClipboard.textContent = "Copying to clipboard...";
    textByGenerateJson.textContent = "";
    textareaOutput.select();
    document.execCommand("copy");
    textByCopyToClipboard.textContent = "Copied!";
}

buttonGenerateJson.addEventListener("click", ()=>{
    console.log("“Generate Json” button clicked!")
    generateJson();
});

buttonCopyToClipboard.addEventListener("click", ()=>{
    console.log("“Copy to Clipboard” button clicked!")
    copyToClipboard();
});