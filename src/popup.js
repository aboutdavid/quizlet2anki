import QuizletFetcher from "quizlet-fetcher"
import slugify from "slugify"
import Exporter from "../libs/apkg-export.js"

const mimes = {
	'image/jpeg': '.jpg',
	'image/png': '.png',
	'image/gif': '.gif',
	'image/bmp': '.bmp',
	'image/webp': '.webp',
	'image/svg+xml': '.svg',
	'audio/mpeg': '.mp3',
	'audio/wav': '.wav',
	'audio/ogg': '.ogg',
	'audio/midi': '.mid'
}

let cardSet = null

async function main() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        const response = await chrome.tabs.sendMessage(tab.id, { type: "getHTML" });

        if (response.error) return document.querySelector("#results").innerText = response.error

        var quizlet = new QuizletFetcher(response.html).getJSON()
        quizlet.title = quizlet.title.replace("Back ButtonSearch IconFilter Icon", "") // Hotfix for Chromium based browsers
        document.querySelector("#results").innerText = `${quizlet.title}\n\nAuthor: ${quizlet.author}\n\nDescription: ${quizlet.description || "No description found."}\n\n${quizlet.cards.length} card(s) found with ${quizlet.cards.filter(a => a.image).length} image(s)`
        document.querySelector("#status").innerText = "Status: Ready"
        cardSet = quizlet
        document.getElementById("generate").disabled = false
    } catch (e) {
        console.error(e)
        document.querySelector("#status").innerText = "Status: Failed to load"
        document.querySelector("#results").innerText = "Failed to get and parse HTML. This can be caused by the page not being a Quizlet Flashcard, or the page not being fully loaded when you open this extension. Try closing and opening it again."
    }
}
main()
document.getElementById("generate").addEventListener("click", makeCards);

async function makeCards() {
    document.querySelector("#status").innerText = "Generating."
    const apkg = new Exporter(cardSet.title)
    let promises = cardSet.cards.map(async (card, i) => {
        const id = Math.random().toString(32).slice(2)

        if (card.image) {
            document.querySelector("#status").innerText = `Status: Downloading image ${i}/${cardSet.cards.length}`
            const img = await (await fetch(card.image.replace(/^https:\/\/.*?\/(https?:\/\/.*)$/, "$1"))).blob()
            var filename = id
            mimes[img] ? filename = filename + mimes[img] : null
            apkg.addMedia(filename, img)
            console.log(apkg.media)
        }
        apkg.addCard(card.term, card.image ? `${card.definition} <br><img src="${id}">` : card.definition)
    })

    Promise.all(promises)
        .then(() => {
            apkg.save()
                .then(zip => {
                    document.querySelector("#status").innerText = "Saving..."

                    var uri = URL.createObjectURL(zip)
                    var name = `${slugify(cardSet.title)}.apkg`
                    var link = document.createElement("a");

                    link.setAttribute('download', name);
                    link.href = uri;
                    document.body.appendChild(link);
                    link.click();
                    link.remove();

                    document.querySelector("#status").innerText = "Saved. Check the downloads section of your browser."
                    document.getElementById("generate").innerText = "✅ Saved"
                    setTimeout(function () { document.getElementById("generate").innerText = "Download" }, 3000)
                })
        })
}