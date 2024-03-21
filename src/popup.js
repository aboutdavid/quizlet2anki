async function main() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        const response = await chrome.tabs.sendMessage(tab.id, { type: "getHTML" });

        if (response.error) return document.querySelector("#results").innerText = response.error

        const quizlet = new window.QuizletFetcher(response.html)


        document.querySelector("#results").innerText = `${quizlet.title}\nDescription: ${quizlet.description || "No description found."}\n${quizlet.cards.length} card(s) found`
        window.cardSet = quizlet
        document.getElementById("generate").disabled = false
    } catch (e) {
        document.querySelector("#results").innerText = "Failed to get and parse HTML. This can be caused by the page not being a Quizlet Flashcard, or the page not being fully loaded when you open this extension. Try closing and opening it again."
    }
}
main()
document.getElementById("generate").addEventListener("click", makeCards);
async function makeCards() {

    const apkg = new window.apkgExport(window.cardSet.title)
    window.cardSet.cards.forEach(card => {
        apkg.addCard(card.term, card.definition)
    })

    apkg.save()
        .then(zip => {
            saveAs(zip, "output.apkg")
        })
}