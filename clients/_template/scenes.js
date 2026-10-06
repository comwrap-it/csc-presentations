/* Client-specific scenes (optional).
   Add scenes here when the shared library in core/scenes/library.js is not enough,
   then list their ids in client.json → "scenes" where you want them to appear.
   Every scene type of the library can be reused (bigstat, needs, cases, story3, …).
   Images go in this client's assets/img folder and are referenced as "assets/img/<file>". */
window.CLIENT_SCENES = [
  {
    id: "client-context", sec: "why", layout: "full", type: "bigstat",
    core: { focus: "act" },
    k: ["{client} today", "{client} oggi"],
    h: ["Example: two numbers that frame the conversation", "Esempio: due numeri che inquadrano la conversazione"],
    d: {
      stats: [
        { v: 12, suf: "", t: ["markets to serve with localized content", "mercati da servire con contenuti localizzati"] },
        { v: 400, suf: "+", t: ["assets produced per campaign", "asset prodotti per campagna"] }
      ],
      src: "Replace with the real source"
    },
    n: ["Speaker notes for this scene.", "Note per chi presenta per questa scena."]
  }
];
