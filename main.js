const buttonLoadSampleDataLemmata = document.getElementById("load-sample-data-lemmata");
const buttonLoadSampleDataWords = document.getElementById("load-sample-data-words");
const textareaInput = document.getElementById("textarea-input");
const textByGenerateJson = document.getElementById("text-by-generate-json");
const buttonGenerateJson = document.getElementById("generate-json");
const textareaOutput = document.getElementById("textarea-output");
const textByCopyToClipboard = document.getElementById("text-by-copy-to-clipboard");
const buttonCopyToClipboard = document.getElementById("copy-to-clipboard");

textareaOutput.value = "";


//// Schemata. Commented-out properties will not be used.

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


//// Sample data the user can load if they don’t have my Excel file:

const sampleDataLemmata = 
`Ord	Lemma	PartOfSpeech	Meanings	Notes	Transliterations	Scansion	SyllableCount	Root	FormCount	NoTypeTag	NoMacra	NoMacraLowerCase
8483	excellō	Verb	excel; be distinguished; ‘excelsus’ = distinguished			–––	3	collis	48	excellō	excello	excello
8484	antecellō	Verb	be better	+dative; rare except in Cicero		–⏑––	4	collis	23	antecellō	antecello	antecello
8485	praecellō	Verb	be eminent; be better; rule over	usually +dative; “rule over” in Tacitus		–––	3	collis	24	praecellō	praecello	praecello
8486	compitum	Noun	crossroads	usually in plural		–⏑–	3	petō	5	compitum	compitum	compitum
8487	mūliō	Noun	mule-driver			–⏑–	3	mūlus	1	mūliō	mulio	mulio
8488	titiō	Noun	torch	late		⏑⏑–	3	taeda	1	titiō	titio	titio
8489	taeda	Noun	pitch-pine-tree; torch			–⏑	2	taeda	6	taeda	taeda	taeda
8490	īnfectus[adj]	Adjective	not done; unmade			––⏑	3	faciō	12	īnfectus	infectus	infectus
8491	īnfectus[n]	Noun	dyeing	post-Augustan		––⏑	3	faciō	7	īnfectus	infectus	infectus
8492	Echīōn	Proper noun	father of Pentheus; one of the Argonauts; character in the Satyricon	 	Ἐχίων	⏑––	3	Echīōn	1	Echīōn	Echion	echion
8493	badizō	Verb	go	in Plautus	βαδίζω	⏑––	3	veniō	10	badizō	badizo	badizo
8494	colaphus	Noun	box to the ear	in slaves’ language	κόλαφος	⏑⏑⏑	3	colaphus	7	colaphus	colaphus	colaphus
`

const sampleDataWords =
`Ord	Word	Lemmata	Length	AllConsonants	Uncompounded	Phonetic	Scansion	AllVowels	SyllableCount	Stress	UltimaRhyme	RhymeVowels	PerfectRhyme	RhymeConsonants	Ultima	RhymeVowelsAndUltimaCoda	EcclesPhonetic	EcclesVowels	EcclesRhymeVowels	EcclesRhymeVowelsAndUltimaCoda	EcclesPerfectRhyme	EcclesSort	LemmaCount	Lemma1	Lemma2	Lemma3	Lemma4	Lemma5	ScansionWithElision	IsFitForDactyl	LemmaArray	IsLemma	IsNonLemma	DuplicateWords	NewLemmata	NoMacra	NoMacraLowerCase	AlphOrderNoMacra	Sort
89780	vocābulōrum	vocābulum	11	vcblrm	vocābulōrum	vocābulōrũ	⏑–⏑––	oāuōũ	5	2	ũ	ōũ	ōrũ	aram	'2 ũ	ōũ	vocabulorum	oauou	ou	oum	orum	ou-aram-uao-labacav-vocazzzzbulozzzzrum/	1	vocābulum					⏑–⏑–	0	["vocābulum"]	0	1			vocabulorum	vocabulorum	abclmooruuv	ozzzzuzzzzzz-ara-uazzzzo-labazzzzcav-vocābulōrum/
89781	excellentium	excellēns excellō	12	xcllntm	excellentium	ecscellentiũ	–––⏑–	eeeiũ	5	3	ũ	eiũ	entiũ	antaam	ũ	eiũ	ecscellentium	eeeiu	eiu	eium	entium	eiu-antaam-ee-llacsca-excellentium/	2	excellēns	excellō				–––⏑	1	["excellēns","excellō"]	0	1			excellentium	excellentium	ceeeillmntux	eiuzzzzzz-antaa-ee-llacsca-excellentium/
89782	Latīnōrum	Latīnus[prn] Latīnus[adj]	9	ltnrm	Latīnōrum	latīnōrũ	⏑–––	aīōũ	4	2	ũ	ōũ	ōrũ	aram	'2 ũ	ōũ	latinorum	aiou	ou	oum	orum	ou-aram-ia-natal-latizzzznozzzzrum	2	Latīnus[prn]	Latīnus[adj]				⏑––	1	["Latīnus[prn]","Latīnus[adj]"]	0	1			Latinorum	latinorum	ailmnortu	ozzzzuzzzzzz-ara-izzzza-nizzzztal-latīnōrum
`


//// Functions used in `generateJson`:

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

const getEmptyTextRepresentation = (headerRow) => {
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

const clearTextMessages = () => {
    textByGenerateJson.textContent = "";
    textByCopyToClipboard.textContent = "";
}

//// `outputArray` gets modified by `generateJson` and displayed in the second text-area by `displayOutput`.

let outputArray = [];

const output = (line) => {
    outputArray.push(line);
}


//// Functions called by buttons:

const generateJson = () => {
    clearTextMessages();
    textByGenerateJson.textContent = "Generating Json, please wait...";
    outputArray.length = 0; // Clear the output in case there’s anything from previous runs.
    const allInputRows = textareaInput.value.split("\n");
    const headerRow = allInputRows[0].split("\t");
    const schema = getSchemaFromHeaderRow(headerRow);
    const emptyTextReplacement = getEmptyTextRepresentation(headerRow); // Empty string fields are represented differently in “words” than in “lemmata”.
    const lastKeyInSchema = getLastKey(schema); // This is used to prevent trailing commas.
    const countColumnsInInput = headerRow.length;
    const valueRows = allInputRows.slice(1); // All rows except the header row.
    const countRows = valueRows.length;

    //// For each line of values in the input...
    for (let i = 0; i < countRows; i++) {
        //// Skip empty lines.
        if (valueRows[i] == "") { continue; }

        const rowOfValues = valueRows[i].split("\t");
        output("{");

        //// Create an object that maps each key in `headerRow` to the value in the current row.
        let valuesAsObject = {};
        for (let j = 0; j < countColumnsInInput; j++) {
            const currentKey = headerRow[j];
            const currentValue = rowOfValues[j];
            valuesAsObject[currentKey] = currentValue;
        }

        //// Fields will be added to the output in the order they appear in the schema.
        for (let currentKey in schema) {
            const currentValue = valuesAsObject[currentKey];
            //// Decide whether there should be a comma after the key–value pair.
            const lineTerminator = currentKey == lastKeyInSchema ? "" : ",";
            //// Use the types defined in the schema to determine the format.
            //// Strings need to be quoted, but other values do not.
            switch (schema[currentKey]) {
                case "int":
                    output(`"${currentKey}": ${currentValue ? currentValue : "null"}${lineTerminator}`);
                    break;
                case "string":
                    output(`"${currentKey}": ${currentValue ? `"${currentValue}"` : emptyTextReplacement}${lineTerminator}`);
                    break;
                case "array":
                    //// My value from Excel is always valid Json for an array of strings.
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
    clearTextMessages();
    textByCopyToClipboard.textContent = "Copying to clipboard...";
    textareaOutput.select();
    document.execCommand("copy");
    textByCopyToClipboard.textContent = "Copied!";
}


//// Event listeners.

buttonLoadSampleDataLemmata.addEventListener("click", ()=>{
    textareaInput.value = sampleDataLemmata;
    clearTextMessages();
});

buttonLoadSampleDataWords.addEventListener("click", ()=>{
    textareaInput.value = sampleDataWords;
    clearTextMessages();
});

buttonGenerateJson.addEventListener("click", ()=>{
    generateJson();
});

buttonCopyToClipboard.addEventListener("click", ()=>{
    copyToClipboard();
});
