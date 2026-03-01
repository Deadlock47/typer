// Common Hindi words for auto-suggestions
const hindiWords = [
    "अनुराग", "अचल", "अचना", "अच्छा", "अजय", "अजित", "अंकित", "अंकुर", "अंजली", "अंजन",
    "अंजुली", "अंजुल", "अंबर", "अंबा", "अंबिका", "अंबिका", "अंबुज", "अंबु", "अंबुलिका",
    "अंबुष", "अंशु", "अंशुल", "अंशुमान", "अंशुमती", "अंशुमत्पुत्र", "अंशुमत्सुत",
    "आचल", "आचार्य", "आचिका", "आचिका", "आचित", "आचिता", "आचुका", "आचुकी", "आचेला",
    "आया", "आयन", "आयना", "आयाम", "आयास", "आयु", "आयुध", "आयुर्वेद", "आयुष्य", "आयुषी",
    "आयु", "आरत", "आरती", "आरण्य", "आरंभ", "आरं", "आराध्य", "आराध्या", "आराधना",
    "आराधनीय", "आराधक", "आराधिका", "आरी", "आरिका", "आरीय", "आरुणी", "आरुडिका",
    "आरुह", "आरुहा", "आरुहेण", "आरुढ", "आरुणि", "आरुणि", "आरुणि",
    "बालक", "बाल", "बालिका", "बालि", "बाली", "बाल्य", "बाल्यकाल", "बाल्यावस्था",
    "बानिज्य", "बाणिज्य", "बाणिजिक", "बानिज्यिक", "बानिज्यी", "बानिज्यिन्", "बानिज्या",
    "बांग", "बांगड़", "बांगडी", "बांगड़ी", "बांगर", "बांगरी", "बांगला", "बांग्ला",
    "बांग्लादेश", "बांगली", "बांग्लिका", "बांग्लिका", "बांग्लिन्", "बांग्लीय", "बांग्लीय",
    "कल", "कला", "कलि", "कलिका", "कलिमा", "कलीन", "कलीयुग", "कलीयुगीन", "कलीयुगीय",
    "कल्लोल", "कल्पना", "कल्पनीय", "कल्पनीयता", "कल्पनीयत्व", "कल्पनीयत्वम्",
    "दिन", "दिनकर", "दिनकारकः", "दिनकारकम्", "दिनकारा", "दिनकारी", "दिनकारीय",
    "धन", "धना", "धनंजय", "धनंजया", "धनंजयः", "धनंजयम्", "धनिक", "धनिका",
    "गौ", "गौर", "गौरव", "गौरवान्वित", "गौरवान्विता", "गौरवान्विति", "गौरवान्वितम्",
    "नर", "नरक", "नरकास्य", "नरकी", "नरकीन", "नरकीया", "नरकोद्भव", "नरकोत्पन्न",
    "पत्नी", "पत्नीग्रह", "पत्नीग्राह्य", "पत्नीग्राह्या", "पत्नीग्रह्य",
    "राज", "राजक", "राजकार", "राजकारी", "राजकीय", "राजकुमार", "राजकुमारी",
    "वन", "वनचर", "वनचरी", "वनचरीय", "वनज", "वनजन्म", "वना", "वनाग्नि",
    "साथ", "साथी", "साथीय", "साथीयत्व", "साथीयत्वम्", "साथी्य", "साथीन्",
    "समय", "समयज्ञ", "समयज्ञान", "समयचिन्ता", "समयज्ञान", "समयोचित", "समयोचिता",
    "आम", "आमजन", "आमजनता", "आमजनीन", "आमजनीय", "आमजनीया", "आमजनीयत्व",
    "नई", "नई्न", "नई्या", "नई्यता", "नई्यत्व", "नईन", "नईनता", "नईनत्व"
];

const elem = document.querySelector('textarea');
let selectedSuggestionIndex = -1;

// Function to get the current word being typed
function getCurrentWord() {
    const text = elem.value;
    const cursorPos = elem.selectionStart;
    const textBeforeCursor = text.substring(0, cursorPos);
    const lastSpace = textBeforeCursor.lastIndexOf(' ');
    const currentWord = textBeforeCursor.substring(lastSpace + 1).trim();
    return currentWord;
}

// Function to get suggestions based on input
function getSuggestions(word) {
    if (!word || word.length === 0) return [];
    
    const lowerWord = word.toLowerCase();
    return hindiWords.filter(w => 
        w.toLowerCase().startsWith(lowerWord)
    ).slice(0, 8); // Show max 8 suggestions
}

// Function to display suggestions
function showSuggestions(suggestions) {
    const dropdown = document.getElementById('suggestionsDropdown');
    const textarea = document.querySelector('textarea');
    
    if (suggestions.length === 0) {
        dropdown.style.display = 'none';
        return;
    }
    
    let html = suggestions.map((word, index) => 
        `<div class="suggestion-item" data-index="${index}" data-word="${word}">${word}</div>`
    ).join('');
    
    dropdown.innerHTML = html;
    dropdown.style.display = 'block';
    selectedSuggestionIndex = -1;
    
    // Add click listeners to suggestion items
    document.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', function() {
            insertSuggestion(this.getAttribute('data-word'));
        });
    });
}

// Function to insert selected suggestion
function insertSuggestion(word) {
    const text = elem.value;
    const cursorPos = elem.selectionStart;
    const textBeforeCursor = text.substring(0, cursorPos);
    const lastSpace = textBeforeCursor.lastIndexOf(' ');
    const textAfterCursor = text.substring(cursorPos);
    
    const newText = textBeforeCursor.substring(0, lastSpace + 1) + word + ' ' + textAfterCursor;
    elem.value = newText;
    
    // Move cursor after the inserted word
    const newCursorPos = lastSpace + 1 + word.length + 1;
    elem.selectionStart = newCursorPos;
    elem.selectionEnd = newCursorPos;
    
    // Hide suggestions
    document.getElementById('suggestionsDropdown').style.display = 'none';
    elem.focus();
}

// Event listener for input
elem.addEventListener('input', function(e) {
    const word = getCurrentWord();
    const suggestions = getSuggestions(word);
    showSuggestions(suggestions);
    localStorage.setItem("txtm", elem.value);
});

// Event listener for keyboard navigation in suggestions
elem.addEventListener('keydown', function(e) {
    const dropdown = document.getElementById('suggestionsDropdown');
    const items = dropdown.querySelectorAll('.suggestion-item');
    
    if (e.key === 'ArrowDown') {
        if (dropdown.style.display !== 'none' && items.length > 0) {
            e.preventDefault();
            selectedSuggestionIndex = (selectedSuggestionIndex + 1) % items.length;
            updateActiveSelection(items);
        }
    } else if (e.key === 'ArrowUp') {
        if (dropdown.style.display !== 'none' && items.length > 0) {
            e.preventDefault();
            selectedSuggestionIndex = selectedSuggestionIndex <= 0 ? items.length - 1 : selectedSuggestionIndex - 1;
            updateActiveSelection(items);
        }
    } else if (e.key === 'Enter' && selectedSuggestionIndex >= 0 && items.length > 0) {
        e.preventDefault();
        const selectedWord = items[selectedSuggestionIndex].getAttribute('data-word');
        insertSuggestion(selectedWord);
    } else if (e.key === 'Escape') {
        dropdown.style.display = 'none';
    }
});

// Function to update active selection styling
function updateActiveSelection(items) {
    items.forEach((item, index) => {
        if (index === selectedSuggestionIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Scroll into view
    if (selectedSuggestionIndex >= 0) {
        items[selectedSuggestionIndex].scrollIntoView({ block: 'nearest' });
    }
}

document.querySelector('.btn-clear').addEventListener('click',event=>{
    document.querySelector('textarea').value = "";
    document.getElementById('suggestionsDropdown').style.display = 'none';
})

document.querySelector('.btn-count').addEventListener('click',event=>{
    const count = document.querySelector('textarea').value.split(' ').filter((word) => (word.length > 0 && word !== "|" && word !== "-") ).length;
    alert(`word count is ${count} `)
})

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        localStorage.setItem("txtm",elem.value)
    }
})

window.onload = function(event) {
    const txt = localStorage.getItem("txtm");
    if (txt) {
        document.querySelector('textarea').value = txt;
    }
}