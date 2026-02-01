# Design Guidelines - Cultural Hub Social App

## 1. Brand Identity

**Purpose**: A unified social platform where users curate their cultural identity across films, series, music, anime, manga, and books in one polished profile.

**Aesthetic Direction**: Fluid Dark Editorial with Intelligent Glass Effects
- Deep dark backgrounds (#0D0D0D) with glowing cyan accents
- Glass-morphism cards with subtle frosted effects
- Soft shadows throughout for depth
- Horizontal content carousels emphasizing visual curation
- Profile-centric with prominent stats
- Minimalist icons only—no photos in UI chrome

**Memorable Element**: The glowing cyan floating action button against deep black, and the unified cultural profile displaying all media consumption in one elegant timeline.

## 2. Navigation Architecture

**Root Navigation**: Tab Bar (4 tabs + Floating Action Button)

Tabs:
1. **Home** (house icon) - Timeline feed with posts and releases
2. **Discover** (compass icon) - Browse media with horizontal carousels
3. **Create** (plus icon, cyan Floating Action Button) - Create post
4. **Profile** (user icon) - Stats-focused profile with tabs

## 3. Screen-by-Screen Specifications

### Authentication
**Login Screen**
- Layout: Centered form on scrollable dark view
- Components: App wordmark, email field, password field, "Sign In with Apple" button (primary), "Sign In with Google" button, "Create Account" link
- Top inset: insets.top + Spacing.xl
- Bottom inset: insets.bottom + Spacing.xl

**Signup Screen**
- Similar to Login with name field, privacy/terms links below

### Home Tab
**Home Screen**
- Header: Transparent, app wordmark centered
- Layout: Vertical scrollable feed (FlatList)
- Components:
  - "New Releases" section with horizontal scrolling carousel of gradient cards (each showing media thumbnail, title, type badge)
  - "Your Timeline" section with vertical post cards
  - Post card: User avatar + name, media thumbnail (left), title + type, star rating, comment text, like/comment counts
- Empty State: empty-timeline.png
- Top inset: headerHeight + Spacing.xl
- Bottom inset: tabBarHeight + Spacing.xl

**Post Detail Screen** (Stack)
- Header: Default with back, "Post" title
- Layout: Scrollable
- Components: Expanded post card, comments list, comment input (sticky bottom)
- Glass effect card with soft shadow
- Bottom inset: insets.bottom + Spacing.xl

### Discover Tab
**Discover Screen**
- Header: Transparent, search icon (right)
- Layout: Scrollable with sections
- Components:
  - Category chips row (Films, Series, Music, Anime, Manga, Books)
  - Each category: horizontal carousel of gradient media cards
  - "Trending" section, "Top Rated" section
- Empty State: Not needed (always has content)
- Top inset: headerHeight + Spacing.xl
- Bottom inset: tabBarHeight + Spacing.xl

**Media Detail Screen** (Stack)
- Header: Transparent, back button, share icon (right)
- Layout: Scrollable
- Components:
  - Hero: Large thumbnail with gradient overlay, title, year
  - Stats row: Avg rating, review count
  - Actions: "Rate & Review" (cyan button), status dropdown (Want/Consuming/Completed), "Add to List" icon
  - Description, community reviews section
- Glass effect sections with soft shadows
- Top inset: headerHeight + Spacing.xl
- Bottom inset: insets.bottom + Spacing.xl

**Search Screen** (Stack)
- Header: Large search bar, back button
- Layout: Results list (scrollable)
- Components: Search input, filter chips, results as media cards
- Empty State: empty-search.png (no search), no-results.png (no results)
- Top inset: headerHeight + Spacing.xl
- Bottom inset: insets.bottom + Spacing.xl

### Create (Floating Action Button)
**Create Post Modal**
- Full-screen modal, glass effect background
- Header: "Cancel" (left), "Create" title, "Publish" (right, cyan when valid)
- Components: Media type chips, search media input, selected media preview, star rating (5 stars, cyan), comment text area
- Top inset: Spacing.xl
- Bottom inset: insets.bottom + Spacing.xl

### Profile Tab
**Profile Screen**
- Header: Transparent, settings icon (right)
- Layout: Scrollable with stats header + tabs
- Components:
  - Profile header: Large avatar, name, bio, stats cards (Posts, Reviews, Followers, Following in glass cards)
  - Tab selector: Posts | Reviews | Lists | Status
  - Content grid below tabs
- Top inset: headerHeight + Spacing.xl
- Bottom inset: tabBarHeight + Spacing.xl
- Empty States: empty-posts.png, empty-reviews.png, empty-lists.png, empty-status.png

**Settings Screen** (Stack)
- Header: Default, back, "Settings" title
- Layout: Scrollable form with glass sections
- Components: Account section (name, email, avatar, bio), Preferences (theme, notifications), Account Actions (Log Out with confirmation, Delete Account nested with double confirmation)

## 4. Color Palette

**Background**: #0D0D0D (Deep Black)
**Surface**: #1A1A1A (Dark Gray) - Cards, glass overlays
**Primary Accent**: #00D9FF (Cyan) - FAB, CTAs, ratings, links
**Secondary Accent**: #6C63FF (Purple) - Gradients, badges
**Text Primary**: #FFFFFF (White)
**Text Secondary**: #9CA3AF (Gray)
**Border**: #2A2A2A (Subtle Dark)
**Success**: #10B981
**Warning**: #F59E0B
**Error**: #EF4444

Gradient overlays: Linear from Primary Accent to Secondary Accent

## 5. Typography

**Primary Font**: Satoshi (Google Font alternative: Plus Jakarta Sans) - Modern, fluid, geometric
**Secondary Font**: Inter - Clean body text

**Type Scale**:
- Hero: Satoshi Bold, 32px
- Title: Satoshi Bold, 24px
- Heading: Satoshi SemiBold, 18px
- Body: Inter Regular, 16px
- Caption: Inter Medium, 14px
- Small: Inter Regular, 12px

## 6. Visual Design

- Icons: Feather icons from @expo/vector-icons
- Glass Effect: backgroundColor with 10% opacity, blur overlay effect
- Soft Shadows: shadowOffset {width: 0, height: 4}, shadowOpacity: 0.20, shadowRadius: 8
- Floating Action Button (Create): Cyan background, white plus icon, shadow: {width: 0, height: 2}, shadowOpacity: 0.10, shadowRadius: 2
- Touchables: 15% opacity reduction on press
- Cards: Glass effect with soft shadow
- Star Ratings: Filled/outlined stars in cyan
- Type Badges: Small pills with gradient background
- Category Cards: Gradient from cyan to purple

## 7. Assets to Generate

**App Identity**:
- `icon.png` - App icon: Stylized cultural grid with cyan accent (used: device home screen)
- `splash-icon.png` - Simplified icon version (used: app launch)

**Empty States**:
- `empty-timeline.png` - Minimal timeline illustration with cyan accents (used: Home screen, no posts)
- `empty-search.png` - Magnifying glass with floating media icons (used: Search screen, initial state)
- `no-results.png` - Simple "not found" visual (used: Search screen, no results)
- `empty-posts.png` - Post icon outline in cyan (used: Profile Posts tab)
- `empty-reviews.png` - Star rating outline (used: Profile Reviews tab)
- `empty-lists.png` - List icon outline (used: Profile Lists tab)
- `empty-status.png` - Bookmark outline (used: Profile Status tab)

**User Avatars** (presets):
- `avatar-1.png` through `avatar-5.png` - Abstract gradient avatars (cyan to purple gradients)

All illustrations: Dark backgrounds, cyan/purple gradient accents, minimal line art, glass effect aesthetic.