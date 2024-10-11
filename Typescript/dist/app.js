"use strict";
class wordCounterApp {
    constructor(fileNameID, searchWordID, counterButtonID, resultDiv) {
        this.fileName = document.getElementById(fileNameID);
        this.searchWord = document.getElementById(searchWordID);
        this.counterButton = document.getElementById(counterButtonID);
        this.resultDiv = document.getElementById(resultDiv);
        this.counterButton.addEventListener('click', () => this.handleCounter());
    }
    handleCounter() {
        var _a;
        const word = this.searchWord.value.trim().toLowerCase();
        const file = (_a = this.fileName.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file) {
            this.updateResult("Upload a .txt file!");
            return;
        }
        if (!word) {
            this.updateResult("Input a word to count!");
            return;
        }
        this.readFile(file, word);
    }
    readFile(file, word) {
        const reader = new FileReader();
        reader.onload = (event) => {
            var _a;
            const fileContent = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            const count = this.countOccurances(fileContent, word);
            this.updateResult(`The word "${word}" appears ${count} amount of times!`);
        };
        reader.readAsText(file);
    }
    countOccurances(text, searchWord) {
        const normilization = text.toLowerCase();
        const words = normilization.split(/\s+/);
        return words.reduce((acc, word) => word === searchWord ? acc + 1 : acc, 0);
    }
    updateResult(message) {
        this.resultDiv.textContent = message;
    }
}
const app = new wordCounterApp('fileInput', 'searchWord', 'countButton', 'result');
//# sourceMappingURL=app.js.map