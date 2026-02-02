# SelfieGym Content Library 📚

## Overview
Complete content files for the SelfieGym platform. All data is bilingual (English/Arabic) and ready to import.

---

## 📁 Files Included

### 1. exercises-library.csv
**40 exercises** with:
- Exercise ID and names (EN/AR)
- Category (Strength, Cardio, Core, etc.)
- Muscle groups targeted
- Equipment needed
- Difficulty level
- Step-by-step instructions (EN/AR)
- Image URLs (Unsplash)
- Sets, reps, rest times

### 2. diet-programs.csv
**15 diet programs** including:
- Fat Loss Starter
- Aggressive Cut
- Lean Bulk / Mass Gainer
- Keto Classic
- Intermittent Fasting
- Mediterranean
- High Protein Cut
- Vegetarian Muscle
- Senior Wellness
- And more...

Each program includes:
- Daily calories
- Macro breakdown (protein/carbs/fat)
- Duration
- Difficulty
- Target audience

### 3. meal-plans.csv
**27 sample meals** with:
- Meal names (EN/AR)
- Timing
- Calories & macros
- Ingredients (EN/AR)
- Prep time
- Image URLs

### 4. workout-programs.csv
**12 workout programs**:
- Beginner Full Body
- Push Pull Legs
- Upper Lower Split
- 5x5 Strength
- Home Bodyweight
- HIIT Fat Burner
- Bro Split
- Arnold Split
- Powerbuilding
- Women's Toning
- Senior Fitness
- Calisthenics

### 5. workout-schedules.csv
**29 daily schedules** mapping:
- Which exercises on which days
- Week by week progression
- Exercise IDs for linking
- Notes in EN/AR

### 6. supplements-guide.csv
**12 supplements** with:
- Name (EN/AR)
- Purpose
- Dosage
- Timing
- Who needs it
- Safety notes
- Priority level

---

## 🔗 How to Import

### Google Sheets
1. Open Google Sheets
2. File → Import → Upload
3. Select CSV file
4. Choose "Replace spreadsheet" or "Insert new sheet"
5. Separator: Comma

### Database
- All files use standard CSV format
- UTF-8 encoding for Arabic support
- First row contains headers

---

## 📊 Data Relationships

```
workout-programs.csv
       ↓
workout-schedules.csv (references Program ID)
       ↓
exercises-library.csv (referenced by Exercise IDs)

diet-programs.csv
       ↓
meal-plans.csv (references Program ID)
```

---

## 🖼️ Images

All image URLs are from Unsplash (free to use).
Format: `https://images.unsplash.com/photo-xxx?w=300`

For production, download and host locally.

---

## 📝 Notes

- All text is bilingual (English & Arabic)
- Arabic uses Gulf/Najdi dialect where appropriate
- Prices not included (add based on your model)
- Exercise videos can be added to Video URL column

---

## ✅ Content Stats

| File | Records |
|------|---------|
| Exercises | 40 |
| Diet Programs | 15 |
| Meal Plans | 27 |
| Workout Programs | 12 |
| Workout Schedules | 29 |
| Supplements | 12 |
| **Total** | **135** |

---

*Created: 2026-02-02*
*For: SelfieGym.com*
