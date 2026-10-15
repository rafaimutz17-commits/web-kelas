# Roman entry — draft implementation

The existing class website is retained. First entry to `/` shows the scroll story; choosing Pengunjung opens the existing Home. Completion is remembered in sessionStorage for the current tab. `/login` remains a replayable entry route. Admin continues to use the existing server authentication endpoint; choosing a role never grants admin access.

## Sequence

1. Downloaded photograph of the standing Vitruvius statue with a book.
2. Camera push with brief blur, then an idea caption.
3. Two-vanishing-point construction strokes and a sourced pencil illustration move over the drawing surface.
4. Pencil enlargement and camera rotation into the gate.
5. Continue / cancel; continue opens admin / visitor roles. Cancel stays at the gate with replay and resume actions.
6. Final background reuses the Roman sketch, with a standing figure and white mist.

GSAP/ScrollTrigger drives the sequence. Context cleanup removes pinning when leaving the story. Reduced motion and load failures show the gate directly; a skip button is always available during the story. Layout rules include narrow screens and short landscape viewports.

## Not final

This is a motion prototype, not the complete requested character performance. The downloaded statue is a static photograph. It does not have an independently moving drawing hand, and the drawing surface is composited beside it rather than an animated book held in the hand. The pencil is an externally sourced vector illustration, not a macro photograph. Three genuinely different poses of the same character are not implemented: no suitable licensed pose sequence was found during the asset search. Do not describe duplicated, mirrored, or repositioned photos as three poses.

To finish the intended performance, replace the statue layer with a licensed matching character/hand pose set or a licensed video/image sequence and synchronize it to the existing story beats. No generated 3D model, canvas model, or WebGL scene was added.

## Asset credits

- `public/images/vitruvius-standing.jpg`: **Dimitris Kamaras**, *Vitruvius, Loggia del Consiglio, Piazza dei Signori, Verona*, 13 October 2017. Source: https://commons.wikimedia.org/wiki/File:Vitruvius,_Loggia_del_Consiglio,_Piazza_dei_Signori,_Verona_(37108421733).jpg . License: **CC BY 2.0**, https://creativecommons.org/licenses/by/2.0/ . Downloaded 960px rendition; displayed with CSS silhouette clipping, grayscale/sepia filtering and animated transforms. No endorsement implied.
- `public/images/pencil.svg`: **Twitter, Inc. and other contributors**, Twemoji pencil (U+270F). Source: https://github.com/twitter/twemoji/blob/master/assets/svg/270f.svg . License: **CC BY 4.0**, https://creativecommons.org/licenses/by/4.0/ . Original SVG retained; CSS filter and transforms applied. No endorsement implied.
- Existing `public/images/roman-ruins-sketch.jpg`: *Drawing, Roman Ruins with Figures, ca. 1745*, Wikimedia Commons / Cooper Hewitt. Source: https://commons.wikimedia.org/wiki/File:Drawing,_Roman_Ruins_with_Figures,_ca._1745_(CH_18357879).jpg . Existing repository asset reused.

## Verification

- `npm ci --ignore-scripts` completed.
- `npm run build` passed (bundle size warning remains).
- `npm run typecheck` passed.
- Browser playback, mobile visual appearance, keyboard navigation and live admin authentication have not been verified in this environment. Review before merging or deploying.

## Manual review

Open `/` in a fresh tab session. Scroll forward and backward through the full sequence. Check skip, cancel, replay, role back-navigation and visitor entry. Verify returning Home does not repeat the intro in the same session. Repeat at 390×844 and short landscape sizes, with reduced motion enabled, and with session storage blocked. Use the configured Worker to test failed and successful admin login. Confirm repeated navigation does not leave pin spacers or duplicate scroll listeners.
