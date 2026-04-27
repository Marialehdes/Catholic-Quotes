// ============================================================
// Catholic Quote Generator — script.js (v2)
// ============================================================

// --- Quote Data ---------------------------------------------
// Each quote: { text, author, category }
// category must be one of: "saints" | "scripture" | "inspiration"

const quotes = [

    // ---- Saints (14) ---------------------------------------
    {
        text: "You have made us for yourself, O Lord, and our heart is restless until it rests in you.",
        author: "St. Augustine",
        category: "saints"
    },
    {
        text: "God loves each of us as if there were only one of us.",
        author: "St. Augustine",
        category: "saints"
    },
    {
        text: "Pray, hope, and don't worry. Worry is useless. God is merciful and will hear your prayer.",
        author: "St. Padre Pio",
        category: "saints"
    },
    {
        text: "Not all of us can do great things. But we can do small things with great love.",
        author: "St. Teresa of Calcutta",
        category: "saints"
    },
    {
        text: "Be who God meant you to be and you will set the world on fire.",
        author: "St. Catherine of Siena",
        category: "saints"
    },
    {
        text: "We are not the sum of our weaknesses and failures; we are the sum of the Father's love for us.",
        author: "Pope St. John Paul II",
        category: "saints"
    },
    {
        text: "Let nothing disturb you, let nothing frighten you. All things are passing; God never changes. Patience obtains all things. Nothing is wanting to him who possesses God. God alone suffices.",
        author: "St. Teresa of Ávila",
        category: "saints"
    },
    {
        text: "The soul is made for God alone, and nothing less than God can fill it.",
        author: "St. John Vianney",
        category: "saints"
    },
    {
        text: "Lord, make me an instrument of your peace. Where there is hatred, let me sow love.",
        author: "St. Francis of Assisi",
        category: "saints"
    },
    {
        text: "Do not lose your inner peace for anything whatsoever, even if your whole world seems upset.",
        author: "St. Francis de Sales",
        category: "saints"
    },
    {
        text: "The things that we love tell us what we are.",
        author: "St. Thomas Aquinas",
        category: "saints"
    },
    {
        text: "Without love, deeds, even the most brilliant, count as nothing.",
        author: "St. Thérèse of Lisieux",
        category: "saints"
    },
    {
        text: "Act as if everything depended on you; trust as if everything depended on God.",
        author: "St. Ignatius of Loyola",
        category: "saints"
    },
    {
        text: "The world offers you comfort. But you were not made for comfort. You were made for greatness.",
        author: "Pope Benedict XVI",
        category: "saints"
    },

    // ---- Scripture (10) ------------------------------------
    {
        text: "I can do all things through Christ who strengthens me.",
        author: "Philippians 4:13",
        category: "scripture"
    },
    {
        text: "For God so loved the world that he gave his only Son, so that everyone who believes in him might not perish but might have eternal life.",
        author: "John 3:16",
        category: "scripture"
    },
    {
        text: "Be still, and know that I am God.",
        author: "Psalm 46:10",
        category: "scripture"
    },
    {
        text: "Trust in the Lord with all your heart, and lean not on your own understanding; in all your ways acknowledge Him, and He will direct your paths.",
        author: "Proverbs 3:5–6",
        category: "scripture"
    },
    {
        text: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures; he leads me beside still waters.",
        author: "Psalm 23:1–2",
        category: "scripture"
    },
    {
        text: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.",
        author: "Philippians 4:6",
        category: "scripture"
    },
    {
        text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
        author: "Jeremiah 29:11",
        category: "scripture"
    },
    {
        text: "Come to me, all you who are weary and burdened, and I will give you rest.",
        author: "Matthew 11:28",
        category: "scripture"
    },
    {
        text: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.",
        author: "Matthew 7:7",
        category: "scripture"
    },
    {
        text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
        author: "Joshua 1:9",
        category: "scripture"
    },

    // ---- Inspiration (8) -----------------------------------
    {
        text: "The family that prays together stays together.",
        author: "Ven. Patrick Peyton",
        category: "inspiration"
    },
    {
        text: "Prayer is the raising of the mind and heart to God.",
        author: "Catechism of the Catholic Church, §2559",
        category: "inspiration"
    },
    {
        text: "The Rosary is the most excellent form of prayer and the most efficacious means of attaining eternal life.",
        author: "Pope Leo XIII",
        category: "inspiration"
    },
    {
        text: "Every moment of our life can be the beginning of great things.",
        author: "Pope St. John Paul II",
        category: "inspiration"
    },
    {
        text: "The greatest love story of all time is contained in a tiny white host.",
        author: "Archbishop Fulton J. Sheen",
        category: "inspiration"
    },
    {
        text: "Each of us makes his own weather, determines the color of the skies in the emotional universe which he inhabits.",
        author: "Archbishop Fulton J. Sheen",
        category: "inspiration"
    },
    {
        text: "Do not abandon yourselves to despair. We are the Easter people and Hallelujah is our song.",
        author: "Pope St. John Paul II",
        category: "inspiration"
    },
    {
        text: "Real love is not about feelings. It is not merely an emotion. It is a decision, a commitment, a way of life.",
        author: "Pope Francis",
        category: "inspiration"
    },
];


// =============================================================
// Favorites — localStorage
// =============================================================
//
// localStorage is a browser API that stores key/value pairs as
// strings, permanently (until cleared). We use it to persist the
// user's saved quotes across page refreshes.
//
// JSON.stringify(array)  → converts our array to a JSON string for storage
// JSON.parse(string)     → converts the stored string back to an array
//
// If the key doesn't exist yet, getItem() returns null; the "|| '[]'"
// fallback gives us an empty array in that case.
//
let favorites = JSON.parse(localStorage.getItem("catholicFavorites") || "[]");

// Persist the current favorites array to localStorage
function persistFavorites() {
    localStorage.setItem("catholicFavorites", JSON.stringify(favorites));
}


// --- State --------------------------------------------------
let activeCategory = "all";
let lastIndex      = -1;
let currentQuote   = null;   // The quote currently shown on the card


// --- DOM References -----------------------------------------
const quoteText      = document.getElementById("quote-text");
const quoteAuthor    = document.getElementById("quote-author");
const categoryBadge  = document.getElementById("category-badge");
const quoteContainer = document.getElementById("quote-container");
const newQuoteBtn    = document.getElementById("btn-new-quote");
const saveBtn        = document.getElementById("btn-save");
const filterButtons  = document.querySelectorAll(".filter-btn");
const favSection     = document.getElementById("favorites-section");
const favList        = document.getElementById("favorites-list");


// --- Pick a random quote from the active category -----------
function pickRandomQuote() {
    const pool = activeCategory === "all"
        ? quotes
        : quotes.filter(q => q.category === activeCategory);

    if (pool.length === 0) return null;

    // Avoid showing the same quote twice in a row
    let pick;
    do {
        pick = pool[Math.floor(Math.random() * pool.length)];
    } while (pool.length > 1 && quotes.indexOf(pick) === lastIndex);

    lastIndex = quotes.indexOf(pick);
    return pick;
}


// --- Display a quote with fade-out → update → fade-in -------
function showQuote() {
    // Step 1: add .fading → CSS transitions opacity to 0
    quoteContainer.classList.add("fading");

    // Step 2: after 400ms (matching --speed in CSS), swap content and remove .fading
    setTimeout(function() {
        currentQuote = pickRandomQuote();
        if (!currentQuote) return;

        quoteText.textContent   = currentQuote.text;
        quoteAuthor.textContent = "— " + currentQuote.author;  // — Author
        categoryBadge.textContent =
            currentQuote.category.charAt(0).toUpperCase() + currentQuote.category.slice(1);

        // Keep the Save button in sync with whether this quote is already saved
        updateSaveButton();

        quoteContainer.classList.remove("fading");  // fade back in
    }, 400);
}


// --- Sync the Save button with the current quote's saved state ---
function updateSaveButton() {
    if (!currentQuote) return;

    // .some() returns true if any item in favorites matches by text
    const isSaved = favorites.some(function(f) { return f.text === currentQuote.text; });

    saveBtn.textContent = isSaved ? "♥ Saved" : "♡ Save";   // ♥ or ♡
    saveBtn.classList.toggle("saved", isSaved);
    saveBtn.setAttribute("aria-pressed", String(isSaved));
}


// --- Save the current quote to favorites --------------------
function saveFavorite() {
    if (!currentQuote) return;

    // Don't allow duplicate entries
    const alreadySaved = favorites.some(function(f) { return f.text === currentQuote.text; });
    if (alreadySaved) return;

    favorites.push(currentQuote);
    persistFavorites();

    updateSaveButton();
    renderFavorites();
}


// --- Remove a quote from favorites by its text --------------
//
// We use the quote text as a unique key (all quotes have distinct text).
// Array.filter() returns every item that does NOT match, effectively removing it.
//
function removeFavorite(quoteTextKey) {
    favorites = favorites.filter(function(f) { return f.text !== quoteTextKey; });
    persistFavorites();

    // If the removed quote is currently displayed, update the Save button
    updateSaveButton();
    renderFavorites();
}


// --- Build the favorites section from the favorites array ---
//
// We use createElement() instead of innerHTML so that quote text
// is set via textContent — safe even if a quote somehow contained
// special characters (no HTML injection possible).
//
function renderFavorites() {
    // Nothing saved → hide the whole section
    if (favorites.length === 0) {
        favSection.hidden = true;
        return;
    }

    // Show section and rebuild the list from scratch
    favSection.hidden = false;
    favList.innerHTML = "";

    favorites.forEach(function(quote) {
        // <li class="fav-item">
        const li = document.createElement("li");
        li.className = "fav-item";

        // Left side: quote text + author
        const content = document.createElement("div");
        content.className = "fav-content";

        const textEl = document.createElement("p");
        textEl.className = "fav-text";
        // U+201C / U+201D are curly open/close double quotes
        textEl.textContent = "“" + quote.text + "”";

        const authorEl = document.createElement("span");
        authorEl.className = "fav-author";
        authorEl.textContent = "— " + quote.author;

        content.appendChild(textEl);
        content.appendChild(authorEl);

        // Right side: remove (×) button
        const removeBtn = document.createElement("button");
        removeBtn.className = "btn-remove";
        removeBtn.setAttribute("aria-label", "Remove from favorites");
        removeBtn.textContent = "×";   // ×

        // Capture quote.text in the closure for the click handler
        removeBtn.addEventListener("click", function() {
            removeFavorite(quote.text);
        });

        li.appendChild(content);
        li.appendChild(removeBtn);
        favList.appendChild(li);
    });
}


// --- Category filter buttons --------------------------------
filterButtons.forEach(function(btn) {
    btn.addEventListener("click", function() {
        filterButtons.forEach(function(b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activeCategory = btn.dataset.category;
        showQuote();
    });
});


// --- Wire up main buttons -----------------------------------
newQuoteBtn.addEventListener("click", showQuote);
saveBtn.addEventListener("click", saveFavorite);


// --- Initialize on page load --------------------------------
renderFavorites();  // Restore any favorites saved from a previous visit
showQuote();        // Display the first random quote
