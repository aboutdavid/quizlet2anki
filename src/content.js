chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    var quizletRegex = /^https:\/\/quizlet\.com\/(?:[a-zA-Z]{2}\/)?\d+\/[^\/]+\/(?!flashcards)/;


    if (request.type == "getHTML") {
        console.log(document.title.includes(" | Quizlet"))
        if (!document.title.includes(" | Quizlet")) return sendResponse({ error: `This is not a valid Quizlet set. Ensure you are not in the flashcard mode.
❌ https://quizlet.com/123456789/flashcards
✅ https://quizlet.com/123456789/title-of-flash-cards-here`  })
        if (!quizletRegex.test(location.href)) return sendResponse({ error: `This is not a valid Quizlet set. Ensure you are not in the flashcard mode.
❌ https://quizlet.com/123456789/flashcards
✅ https://quizlet.com/123456789/title-of-flash-cards-here` })
        sendResponse({ html: document.documentElement.innerHTML })

    }

    return true;
});