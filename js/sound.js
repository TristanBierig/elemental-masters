// Background OST
const playerBackgroundIdle = new Gapless5({
    tracks: ['../audio/background_loops/Overworld.wav'],
    loop: true,
    singleMode: true,
    volume: 0.05,
    loadLimit: 2,
});

// Endboss Music
const playerBackgroundBoss = new Gapless5({
    tracks: ['../audio/background_loops/Battle_Theme 2.wav'],
    loop: true,
    singleMode: true,
    volume: 0.1,
    loadLimit: 2,
});

// Character runs on grass
const playerSoundsRun = new Gapless5({
    tracks: ['../audio/sound_effects/footsteps_grass.mp3'],
    loop: true,
    singleMode: true,
    loadLimit: 1,
});

// Character in the Air
const playerSoundsFlying = new Gapless5({
    tracks: ['../audio/sound_effects/flying.mp3'],
    loop: true,
    singleMode: true,
    loadLimit: 1,
    volume: 0.2,
});
