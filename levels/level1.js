let level1;


function initLevel() {

level1 = new Level(
    [   // Creates normal slime
        new Slime(undefined, 'normal'),
        new Slime(undefined, 'normal'),
        // Creates flying slime
        new Slime(undefined, 'fly'),
        new Slime(undefined, 'fly'),
        // Creates tiny slime
        new Slime(undefined, 'tiny'),
        new Slime(undefined, 'tiny'),
        new Endboss()
    ],
    [
        new Cloud(),
        new Cloud()
    ],
    [
    ],
    [
        new Foreground('img/Background/props/tree1/green/3.png', -80),
        new Foreground('img/Background/props/tree1/green/3.png', 660),
        new Foreground('img/Background/props/tree2/orange/5.png', 1370),
        new Foreground('img/Background/props/cover grass/4.png'),
        new Foreground('img/Background/props/cover grass/4.png'),
        new Foreground('img/Background/props/cover grass/4.png'),
        new Foreground('img/Background/props/cover grass/4.png'),
        new Foreground('img/Background/props/cover grass/4.png'),
        new Foreground('img/Background/props/cover grass/4.png'),
        new Foreground('img/Background/props/cover grass/4.png'),
        new Foreground('img/Background/props/cover grass/4.png'),
        new Foreground('img/Background/props/cover grass/4.png'),
        new Foreground('img/Background/props/tree2/green/1.png'),
        new Foreground('img/Background/props/tree2/green/2.png'),
        new Foreground('img/Background/props/tree2/green/4.png'),
        new Foreground('img/Background/props/tree2/green/5.png'),
        new Foreground('img/Background/props/high grass/1.png'),
        new Foreground('img/Background/props/high grass/3.png'),
        new Foreground('img/Background/props/high grass/2.png'),
        new Foreground('img/Background/props/high grass/5.png'),
        new Foreground('img/Background/props/bush/green/1.png'),
        new Foreground('img/Background/props/tump/3.png'),
        new Foreground('img/Background/props/stones/2.png'),
        new Foreground('img/Background/props/tree2/orange/2.png'),
        new Foreground('img/Background/props/tree2/orange/5.png')
    ],
    [  
    ]
);
}