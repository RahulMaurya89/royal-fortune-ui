# Royal Fortune — Premium Casino Game UI

## Goal
Build a cohesive, responsive virtual-currency casino game interface with a dark burgundy-and-emerald Art Deco style, cinematic gold detailing, and reusable AAA-game controls. The experience will remain clearly fictional and will contain no real-money, deposit, withdrawal, payment, crypto, or cash-out features.

## Experience
- Replace the placeholder with an immersive Royal Fortune game shell.
- Add a persistent top status bar with player profile, level progress, notifications, settings, and a prominent virtual coin balance.
- Use a main menu as the entry point, with direct access to Play, Daily Reward, Shop, Profile, Settings, and Achievements.
- Add a dedicated game-selection view with Roulette, Blackjack, Slots, Poker, and Dice cards, including artwork, descriptions, coin requirements, unlock states, and play controls.
- Build playable presentation states for Roulette, Blackjack, and Slots with distinct central tables, denomination controls, bet adjustment, result feedback, history, back/settings controls, and game-specific primary actions.
- Add Level Complete, Daily Reward, Settings, Achievement, Game Rules, Pause, Insufficient Coins, and New Game Unlocked overlays.
- Add full Profile, Shop, Achievements, and Loading screens.

## Visual System
- Deep near-black foundation, burgundy structure, emerald gameplay surfaces, restrained antique-gold highlights, and warm ivory typography.
- Fine Art Deco line work, beveled metallic details, glass panels, soft cinematic shadows, and high-contrast readable type.
- Use generated casino artwork for the five game cards while keeping gameplay controls crisp and interface-driven.
- Define reusable panel, button, badge, progress, coin, navigation, and modal patterns with clear hover, pressed, disabled, focus, and locked states.
- Keep desktop composition optimized for 16:9 while adapting navigation, cards, tables, and controls for narrow screens.

## Interaction Details
- Navigation and all visible buttons will function within the prototype.
- Virtual coin bets will update balances, game results, history, and XP in local UI state.
- Roulette, Blackjack, and Slots will have lightweight simulated rounds and animation-ready transitions.
- Locked games will explain their level requirement; low balances will open the matching warning.
- Settings controls, reward claiming, shop purchases, profile tabs, achievement filtering, popup dismissal, and loading transitions will be interactive.

## Technical Notes
- Keep the implementation frontend-only and self-contained; no persistence, authentication, or money services are needed.
- Build small reusable React components for the shared shell, game cards, gameplay controls, overlays, and status elements.
- Add route-specific metadata to the home screen and retain semantic, accessible controls.
- Verify the finished interface in desktop and mobile widths, including navigation, modal flows, game actions, console health, and visual overlap.
