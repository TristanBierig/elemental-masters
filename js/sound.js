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

// Character getting hit
const playerSoundsHurt = new Gapless5({
    tracks: ['audio/sound_effects/ouch.mp3'],
    loop: false,
    singleMode: true,
    loadLimit: 1,
    volume: 0.4,
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

// Punch
const playerSoundsPunch = new Gapless5({
    tracks: ['audio/sound_effects/punch.mp3'],
    loop: false,
    singleMode: true,
    loadLimit: 1,
    volume: 0.4,
});

// Transform
const playerSoundsTransform = new Gapless5({
    tracks: ['audio/sound_effects/transform.mp3'],
    loop: false,
    singleMode: true,
    loadLimit: 1,
    volume: 0.4,
});

// GameOver Sound
const playerSoundsGameOver = new Gapless5({
    tracks: ['audio/sound_effects/game_over.mp3'],
    loop: false,
    singleMode: true,
    loadLimit: 1,
    volume: 0.4,
});

// GameOver Screen Loop
const playerSoundsGameOverLoop = new Gapless5({
    tracks: ['audio/background_loops/Gameover.wav'],
    loop: true,
    singleMode: true,
    loadLimit: 1,
    volume: 0.05,
});

// Victory Screen Loop
const playerSoundsVictory = new Gapless5({
    tracks: ['audio/background_loops/Victory.wav'],
    loop: true,
    singleMode: true,
    loadLimit: 1,
    volume: 0.05,
});

// Endboss death
const playerSoundsEndbossDeath = new Gapless5({
    tracks: ['audio/sound_effects/boss_death.mp3'],
    loop: false,
    singleMode: true,
    loadLimit: 1,
    volume: 0.3,
});

