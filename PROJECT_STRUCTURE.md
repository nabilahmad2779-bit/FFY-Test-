
# Forte-FY Project Structure & File Guide

This document outlines the architecture of the Forte-FY web application. The project uses a **Split-Architecture** approach to deliver highly optimized experiences for both Desktop (mouse-driven, parallax-heavy) and Mobile (touch-driven, vertical scroll) users.

## Root Directory
*   **`index.tsx`**: The raw entry point that redirects to the main application source.
*   **`metadata.json`**: Project configuration and permissions.

---

## `forte-fy/` (Main Source Directory)

### Core Configuration
*   **`index.html`**: The HTML template containing global CSS variables, fonts (Space Grotesk, Cinzel, Plus Jakarta Sans), and Tailwind CDN.
*   **`index.tsx`**: The React DOM root.
*   **`App.tsx`**: The Primary Router. It uses the `useIsMobile` hook to determine whether to mount `<DesktopApp />` or `<MobileApp />`.
*   **`DesktopApp.tsx`**: The main orchestrator for **Desktop** users. Handles global navigation, theme state (Light/Dark), and the one-page scroll sections.
*   **`constants.tsx`**: A centralized data file containing all static content (Events, Members, Stats, Partner Logos) to keep components clean.
*   **`types.ts`**: TypeScript definitions for data models (EventData, Members, etc.).

### `hooks/`
*   **`useIsMobile.ts`**: A custom hook that listens to window resize events to detect if the device is mobile (<768px).

### `services/`
*   **`geminiService.ts`**: Handles API calls to Google Gemini AI to generate dynamic "Impact Visions" and "Skill Roadmaps".

### `code/` (Department Headers & Footers)
Contains reusable navigation components specific to each department to ensure branding consistency.
*   **`HRHeaderFooter.tsx`**: Human Resources navigation logic.
*   **`PRHeaderFooter.tsx`**: Public Relations navigation logic.
*   **`ITHeaderFooter.tsx`**: IT Department navigation logic.
*   **`OpsHeaderFooter.tsx`**: Operations navigation logic.
*   **`AcadHeaderFooter.tsx`**: Academics navigation logic.

---

### `components/` (Shared & Desktop UI)

*   **`DepartmentCard.tsx`**: The 3D-tilt interactive card used on the Desktop "Structural Pillars" section.
*   **`KineticDepartmentCard.tsx`**: A touch-optimized, gyroscope-simulated card component for Mobile.
*   **`DepartmentsView.tsx`**: The desktop grid layout for selecting departments.
*   **`DepartmentDetailView.tsx`**: A routing wrapper that decides which Department Component to render based on URL ID and Theme.
*   **`ImpactGenerator.tsx`**: An AI-powered component where users generate vision statements.
*   **`ScrollReveal.tsx`**: A wrapper that animates children elements when they enter the viewport.
*   **`SmartImage.tsx`**: An image component that handles grayscale-to-color transitions based on scroll position.
*   **`PCMenuMainPage.tsx`**: The full-screen "Bento Grid" navigation menu for Desktop.
*   **`MobileMenuMainPage.tsx`**: The full-screen navigation menu for Mobile.

#### `components/pages/` (Desktop Main Pages)
*   **`StoryPage.tsx`**: "Our Legacy" / History section.
*   **`EventsPage.tsx`**: "The Archive" / Event Portfolio section.
*   **`HallOfFamePage.tsx`**: "Apex Circle" / Top members section.
*   **`AlumniPage.tsx`**: Alumni network registry.
*   **`PanelPage.tsx`**: Current Executive Panel section.

#### `components/pages/event_pages/` (Desktop Event Details - Dark Mode)
Immersive, parallax-heavy case studies for specific events.
*   `MosaicStories.tsx`
*   `SpiritualQuest.tsx`
*   `CosmicQuest.tsx`
*   `BrushFlash.tsx`

#### `components/pages/event_pages_light/` (Desktop Event Details - Light Mode)
Light-themed variants of the event detail pages.
*   `MosaicStoriesLight.tsx`
*   `SpiritualQuestLight.tsx`
*   `CosmicQuestLight.tsx`
*   `BrushFlashLight.tsx`

#### `components/departments/` (Desktop Department Logic)
*   **`HRDepartment.tsx`**: Human Resources page.
*   **`PRDepartment.tsx`**: Public Relations page.
*   **`ITDepartment.tsx`**: Information Technology page.
*   **`OpsDepartment.tsx`** / **`Ops_Light.tsx`**: Operations (Dark/Light variants).
*   **`AcadDepartment.tsx`** / **`Acad_Light.tsx`**: Academics (Dark/Light variants).

#### `components/departments/Mobile_Departments/` (Mobile Department Logic)
Highly optimized mobile layouts for departments.
*   `MobHRDepartment.tsx` (Dark) & `Light_Mobile_Departments/MobHRDepartment_light.tsx` (Light)
*   `MobPRDepartment.tsx` (Dark) & `Light_Mobile_Departments/MobPRDepartment_light.tsx` (Light)
*   `MobITDepartment.tsx` (Dark) & `Light_Mobile_Departments/MobITDepartment_light.tsx` (Light)
*   `MobOpsDepartment.tsx` (Dark) & `Light_Mobile_Departments/MobOpsDepartment_light.tsx` (Light)
*   `MobAcadDepartment.tsx` (Dark) & `Light_Mobile_Departments/MobAcadDepartment_light.tsx` (Light)

#### `components/MainMenuPages/MainMenuPagesMobile/`
Mobile-specific implementations of the main menu landing pages.
*   `StoryPageMobile.tsx`
*   `EventsPageMobile.tsx`
*   `HallOfFamePageMobile.tsx`
*   `AlumniPageMobile.tsx`
*   `PanelPageMobile.tsx`

---

### `mobile/` (Mobile Application Root)

*   **`MobileApp.tsx`**: The main entry point for Mobile users. Handles the mobile header, navigation state, and view routing.

#### `mobile/pages/`
*   **`MobileDepartmentsView.tsx`**: The grid view of departments for mobile users.
*   *(Legacy Wrappers)*: `MobileStory.tsx`, `MobileEvents.tsx`, `MobileHallOfFame.tsx`, `MobileAlumni.tsx`, `MobilePanel.tsx`.

#### `mobile/pages/EventsForMobile/`
Specific mobile layouts for individual event details (simplified parallax, touch-optimized).
*   `MosaicStories.tsx`
*   `SpiritualQuest.tsx`
*   `CosmicQuest.tsx`
*   `BrushFlash.tsx`
