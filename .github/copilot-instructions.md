# PROJECT INSTRUCTIONS

## 1. PROJECT IDENTITY

This is an existing website with an ANCIENT ROMAN theme.

The visual design of the website is already finished.

The job is to ADD MOTION and INTERACTION.

Do NOT redesign the website unless I explicitly ask you to.

Preserve the existing:
- layout
- colors
- typography
- spacing
- content
- images
- components
- visual identity

---

## 2. MOTION DESIGN GOAL

The motion should feel:

- cinematic
- elegant
- monumental
- ancient
- luxurious
- mysterious
- subtle
- smooth
- premium

Think of a high-end Roman museum, historical exhibition, luxury brand, or cinematic archaeological experience.

The website must NOT feel:

- futuristic
- cyberpunk
- generic SaaS
- gaming UI
- flashy
- childish
- over-animated
- AI-generated/template-like

---

## 3. ANIMATION LIBRARIES

GSAP is the PRIMARY animation library.

Use:
- GSAP
- GSAP ScrollTrigger

Anime.js may be used ONLY when it provides a clear advantage for a specific animation.

Do NOT use multiple libraries for the exact same animation.

Do NOT add another animation library unless explicitly requested.

---

## 4. ANIMATION PHILOSOPHY

Every animation must have a purpose.

Do NOT animate an element simply because it exists.

Animation should support:

1. visual hierarchy
2. storytelling
3. navigation
4. user feedback
5. visual polish

Not everything needs animation.

Primary elements:
- stronger motion

Secondary elements:
- subtle motion

Decorative elements:
- very subtle motion

---

## 5. PREFERRED MOTION STYLE

Prefer:

- cinematic fade reveal
- slide reveal
- text reveal
- stagger animation
- image reveal
- subtle scale
- subtle parallax
- scroll-triggered reveal
- layered depth
- elegant hover transitions
- seamless section transitions

Motion should be controlled and intentional.

---

## 6. TIMING AND EASING

Animations should feel deliberate and premium.

Avoid overly fast animation.

Avoid excessive bounce.

Avoid excessive elastic effects.

Avoid random rotation.

Avoid aggressive scaling.

Avoid random movement.

Avoid making everything animate at the same time.

Use stagger and sequencing to create hierarchy.

---

## 7. SCROLL ANIMATION

Use GSAP ScrollTrigger for meaningful scroll interactions.

Do NOT attach ScrollTrigger to every element.

Scrolling should feel cinematic.

Preferred sequence:

section entrance
→ heading
→ supporting text
→ image/card
→ decorative element

Use parallax sparingly.

Avoid excessive movement.

---

## 8. HOVER INTERACTIONS

Hover effects should be subtle.

Good examples:

- slight translateY
- subtle scale
- image zoom
- border transition
- opacity transition
- underline reveal

Avoid dramatic hover animations.

---

## 9. ANTI AI-SLOP RULE

DO NOT invent random effects just to make the website look "cool".

DO NOT add these unless explicitly requested:

- random particles
- random floating objects
- excessive glow
- excessive blur
- random 3D rotations
- excessive parallax
- random cursor effects
- excessive gradients
- excessive bouncing
- unnecessary 3D effects
- animation on every element

If an animation does not improve the experience, DO NOT ADD IT.

---

## 10. REFERENCE RULE

When I provide a:

- website
- screenshot
- GIF
- video
- animation reference

treat the reference as the PRIMARY source for the requested motion style.

Analyze the reference for:

- timing
- easing
- movement
- stagger
- scroll behavior
- transition style
- interaction style
- visual rhythm

Do NOT copy the original website's:

- branding
- content
- images
- layout
- code

unless explicitly requested.

Recreate the MOTION LANGUAGE inside my existing Roman website.

---

## 11. BEFORE CODING

For significant animation changes:

FIRST inspect the existing implementation.

Then determine:

1. target element
2. purpose of animation
3. trigger
4. movement
5. duration
6. easing
7. stagger
8. GSAP / Anime.js / CSS choice

Do NOT immediately invent an animation.

For complex changes, explain the planned animation before implementation.

---

## 12. REACT + GSAP

This project uses React.

When using GSAP:

- use gsap.context() when appropriate
- clean up animations
- clean up ScrollTrigger
- avoid duplicate timelines
- avoid memory leaks
- avoid unnecessary re-renders
- prefer transform and opacity for performance

Reuse existing animation utilities when possible.

Do not rewrite entire components for small animation changes.

---

## 13. IMPLEMENTATION RULE

When I request an animation:

ONLY implement the requested animation.

Do NOT add additional creative animations that I did not request.

Do NOT redesign the page.

Do NOT change unrelated components.

Make the smallest necessary code changes.

---

## 14. WORKFLOW

Follow this workflow:

ANALYZE
→ PLAN
→ IMPLEMENT
→ TEST
→ POLISH

After implementation:

- check for errors
- check console
- check layout
- check responsive behavior
- check animation timing
- check performance

Remove unnecessary animation.

---

## 15. PRIORITY

When there is a conflict, follow this priority:

1. My explicit instruction
2. Provided animation reference
3. Existing website design
4. This motion system
5. General UI conventions

NEVER prioritize "making it flashy" over preserving the existing website.

---

# FINAL RULE

I WANT THE WEBSITE TO FEEL DESIGNED, NOT GENERATED.

DO NOT MAKE UP A NEW ANIMATION STYLE.

FOLLOW THE PROVIDED REFERENCE AND THE EXISTING ROMAN VISUAL IDENTITY.

ADD MOTION.
DO NOT REDESIGN.