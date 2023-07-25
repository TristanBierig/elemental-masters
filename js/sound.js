// Background OST
const playerBackgroundIdle = new Gapless5({
    tracks: ['audio/background_loops/Overworld.wav'],
    loop: true,
    singleMode: true,
    volume: 0.05,
    loadLimit: 2,
});

// Endboss Music
const playerBackgroundBoss = new Gapless5({
    tracks: ['audio/background_loops/Battle_Theme 2.wav'],
    loop: true,
    singleMode: true,
    volume: 0.05,
    loadLimit: 2,
});

// Character runs on grass
const playerSoundsRun = new Gapless5({
    tracks: ['audio/sound_effects/footsteps_grass.mp3'],
    loop: true,
    singleMode: true,
    loadLimit: 0.5,
});

// Character in the Air
const playerSoundsFlying = new Gapless5({
    tracks: ['audio/sound_effects/flying.mp3'],
    loop: true,
    singleMode: true,
    loadLimit: 1,
    volume: 0.1,
});

// Killing Slime
const playerSoundsKillSlime = new Gapless5({
    tracks: ['audio/sound_effects/pop.mp3'],
    loop: false,
    singleMode: true,
    loadLimit: 1,
    volume: 0.2,
});

// Collect loot
const playerSoundsCollectLoot = new Gapless5({
    tracks: ['audio/sound_effects/collect.mp3'],
    loop: false,
    singleMode: true,
    loadLimit: 1,
    volume: 0.5,
});

// Spellcast Earth
const playerSoundsEarthSpell = new Gapless5({
    tracks: ['audio/sound_effects/rock-shatter.mp3'],
    loop: false,
    singleMode: true,
    loadLimit: 1,
    volume: 0.4,
});

const playerSoundsPunch = new Gapless5({
    tracks: ['audio/sound_effects/punch.mp3'],
    loop: false,
    singleMode: true,
    loadLimit: 1,
    volume: 0.4,
});