class wordCounterApp{
    private fileName: HTMLInputElement;
    private searchWord: HTMLInputElement;
    private counterButton: HTMLInputElement;
    private resultDiv: HTMLDivElement;

    constructor (fileNameID: string, searchWordID: string, counterButtonID: string, resultDiv: string){
        //Get the HTML elelemts 
        this.fileName = document.getElementById(fileNameID) as HTMLInputElement;
        this.searchWord = document.getElementById(searchWordID) as HTMLInputElement;
        this.counterButton = document.getElementById(counterButtonID) as HTMLInputElement;
        this.resultDiv = document.getElementById(resultDiv) as HTMLDivElement;

        //event listener for button click
        this.counterButton.addEventListener('click', () => this.handleCounter());

    }

    private handleCounter(): void{
        // Retrieve word to be searched in file
        const word = this.searchWord.value.trim().toLowerCase();
        const file = this.fileName.files?.[0];

        //check for empty fields (Could be done with HTML but this is an extra layer)
        if (!file){
            this.updateResult("Upload a .txt file!");
            return;
        }

        if (!word){
            this.updateResult("Input a word to count!");
            return;
        }

        //Read the file
        this.readFile(file, word);

    }

    private readFile(file: File, word: string): void{
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = event.target?.result as string;
            const count = this.countOccurances(fileContent, word);
            this.updateResult(`The word "${word}" appears ${count} amount of times!`);
        }
        reader.readAsText(file);
    }

    private countOccurances(text: string, searchWord: string): number{
        const normilization = text.toLowerCase();
        const words = normilization.split(/\s+/); //this splits white space
        return words.reduce((acc, word) => word === searchWord ? acc + 1 : acc, 0) //count the times the word is in the file.
    }

    private updateResult(message: string): void {
        this.resultDiv.textContent = message;
    }
}

//get the class to work with the HTML elements.
const app = new wordCounterApp('fileInput', 'searchWord', 'countButton', 'result');