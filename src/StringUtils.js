export function escapeSpecialCharacters(inputString) {
    /* 
    If the below characters are seen, we are simply adding quotations symbol before and after the text.
    1. comma i.e. , as the file type is csv
    2. hash i.e. # as we are using encodeURIComponent function
    */
    let escapedString = inputString
    if(inputString && inputString !== "") {
        if(inputString.includes(",") || inputString.includes("#")) {
            escapedString = "\"" + inputString + "\""
        }
    }
    return escapedString
}