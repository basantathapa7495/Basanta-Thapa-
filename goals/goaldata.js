/**
goaldata.js — Sample Habit Tracking Data
─────────────────────────────────────────
Replace this with your actual habit data.
*/

// Define your habits/tasks
const tasks = [
    { key: "meditation", label: "Meditation" },
    { key: "reading", label: "Reading (30min)" },
    { key: "exercise", label: "Exercise" },
    { key: "writing", label: "Writing" },
    { key: "noPhone", label: "No Phone Morning" },
    { key: "journal", label: "Journaling" }
];

// Daily completion data (100 days)
const dailyData = [
    { day: 1, date: "2026-03-01", meditation: false, reading: true, exercise: false, writing: true, noPhone: true, journal: false },
    { day: 2, date: "2026-03-02", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 3, date: "2026-03-03", meditation: true, reading: false, exercise: true, writing: true, noPhone: false, journal: true },
    { day: 4, date: "2026-03-04", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 5, date: "2026-03-05", meditation: false, reading: true, exercise: false, writing: true, noPhone: true, journal: false },
    { day: 6, date: "2026-03-06", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 7, date: "2026-03-07", meditation: true, reading: true, exercise: true, writing: false, noPhone: true, journal: true },
    { day: 8, date: "2026-03-08", meditation: true, reading: true, exercise: false, writing: true, noPhone: true, journal: false },
    { day: 9, date: "2026-03-09", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 10, date: "2026-03-10", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 11, date: "2026-03-11", meditation: true, reading: false, exercise: true, writing: true, noPhone: true, journal: false },
    { day: 12, date: "2026-03-12", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 13, date: "2026-03-13", meditation: true, reading: true, exercise: false, writing: true, noPhone: true, journal: true },
    { day: 14, date: "2026-03-14", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 15, date: "2026-03-15", meditation: true, reading: true, exercise: true, writing: false, noPhone: true, journal: false },
    { day: 16, date: "2026-03-16", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 17, date: "2026-03-17", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 18, date: "2026-03-18", meditation: true, reading: false, exercise: false, writing: true, noPhone: true, journal: false },
    { day: 19, date: "2026-03-19", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 20, date: "2026-03-20", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 21, date: "2026-03-21", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: false },
    { day: 22, date: "2026-03-22", meditation: true, reading: true, exercise: false, writing: true, noPhone: true, journal: true },
    { day: 23, date: "2026-03-23", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 24, date: "2026-03-24", meditation: true, reading: true, exercise: true, writing: false, noPhone: true, journal: true },
    { day: 25, date: "2026-03-25", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 26, date: "2026-03-26", meditation: true, reading: false, exercise: true, writing: true, noPhone: true, journal: false },
    { day: 27, date: "2026-03-27", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 28, date: "2026-03-28", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 29, date: "2026-03-29", meditation: true, reading: true, exercise: false, writing: true, noPhone: true, journal: false },
    { day: 30, date: "2026-03-30", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 31, date: "2026-03-31", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 32, date: "2026-04-01", meditation: true, reading: true, exercise: true, writing: false, noPhone: true, journal: false },
    { day: 33, date: "2026-04-02", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 34, date: "2026-04-03", meditation: true, reading: false, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 35, date: "2026-04-04", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 36, date: "2026-04-05", meditation: true, reading: true, exercise: false, writing: true, noPhone: true, journal: false },
    { day: 37, date: "2026-04-06", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 38, date: "2026-04-07", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 39, date: "2026-04-08", meditation: true, reading: true, exercise: true, writing: false, noPhone: true, journal: false },
    { day: 40, date: "2026-04-09", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 41, date: "2026-04-10", meditation: true, reading: false, exercise: false, writing: true, noPhone: true, journal: true },
    { day: 42, date: "2026-04-11", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 43, date: "2026-04-12", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: false },
    { day: 44, date: "2026-04-13", meditation: true, reading: true, exercise: false, writing: true, noPhone: true, journal: true },
    { day: 45, date: "2026-04-14", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 46, date: "2026-04-15", meditation: true, reading: true, exercise: true, writing: false, noPhone: true, journal: true },
    { day: 47, date: "2026-04-16", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 48, date: "2026-04-17", meditation: true, reading: false, exercise: true, writing: true, noPhone: true, journal: false },
    { day: 49, date: "2026-04-18", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true },
    { day: 50, date: "2026-04-19", meditation: true, reading: true, exercise: true, writing: true, noPhone: true, journal: true }
];