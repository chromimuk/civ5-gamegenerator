"use strict";

({
    init: function () {

        const civs = [
            'Morocco',
            'Greece',
            'Assyria',
            'Songhai',
            'The Huns',
            'Rome',
            'Germany',
            'The Celts',
            'Poland',
            'Russia',
            'Persia',
            'Carthage',
            'England',
            'Venice',
            'Indonesia',
            'India',
            'Mongolia',
            'Sweden',
            'Ethiopia',
            'Denmark',
            'Arabia',
            'The Iroquois',
            'Spain',
            'Polynesia',
            'Portugal',
            'Austria',
            'The Aztecs',
            'France',
            'Babylon',
            'Japan',
            'The Maya',
            'The Inca',
            'Brazil',
            'Shoshone',
            'Egypt',
            'Siam',
            'Korea',
            'The Zulus',
            'Ottomans',
            'Byzantium',
            'America',
            'Netherlands',
            'China'
        ];

        const maps = [
            'Continents',
            'Pangaea',
            'Archipelago',
            'Fractal',
            'Earth'
        ];

        // http://civilization.wikia.com/wiki/Victory_(Civ5)
        const victories = [{
                title: 'Domination',
                description: {
                    left: "This means you need to conquer the starting capitals of all other players, regardless of whether they're still in play or not. For example, if you control 5 capitals, and the only other player in the world controls the other 5, and then you conquer his or her Original Capital, the game is not over - you'll also need to conquer the other 4 capitals he or she is currently controlling. Also, you will need to protect your own original capital all the time, by any means possible - you cannot win without that!",
                    right: "If you want to see who controls the original capitals of all civilizations, you can check the Domination Victory bar in the Victory Overview. If you see a small icon on the bottom-right of a civilization icon,it means that another player is controlling the original capital of that civilization. It will also provide details on who the player exactly is. Note that you do NOT need to wipe out all other players completely! You just need to conquer their original capitals."
                }
            },
            {
                title: 'Science',
                description: {
                    left: "To achieve a science victory, you must build and launch a spaceship. In order to do this, you need first to complete the Apollo Program project, and then you must reach far enough in the technology tree to be able to build the components of the spaceship.",
                    right: "All of the necessary technologies for this are in the Information Era, and require developing practically the entire tech tree. Once you have all the required components of the spaceship (or as they become available), you can assemble them at your capital. The spaceship will be automatically launched to Alpha Centauri once assembled."
                }
            },
            {
                title: 'Culture',
                description: {
                    left: "Cultural victory is achieved by filling out five trees of social policies and completing the Utopia Project. Each tree has 5 policies, so in order to win you must have acquired 25 social policies in 5 different policy trees. Social policies are acquired with Culture, with the cost increasing for each new one.",
                    right: "Also, founded and annexed cities increase the amount of Culture needed depending on map size, which makes this path very hard for large empires. To work around this issue, you can limit the foundation of new cities and, when capturing other players' cities, you can make them puppets instead of annexing them."
                }
            },
            {
                title: 'Diplomacy',
                description: {
                    left: "Diplomatic victory is achieved by winning a vote in the United Nations. To win the vote, you must have the majority vote, and in order to gather more votes, players can become allies with City-States, or return captured cities to defeated AI players. The player who built the United Nations first has two votes instead of the usual one, giving them an extra edge when voting.",
                    right: "Every civilization leader will vote for another civilization that liberated his capital (in which case this leader will get the vote). City-States will only vote if they are allied with a civilization or a civilization liberated them in the past, so a common way of winning would be allying with the required amount of City-States on the turn just before the UN vote occurs."
                }
            }
        ];

        const rollResult = this.roll(civs.length, maps.length, victories.length);
        const civ = civs[rollResult.civ];
        const map = maps[rollResult.map];
        const victory = victories[rollResult.victory];
        this.print(civ, map, victory, rollResult);
    },

    roll: function (civsLength, mapsLength, victoriesLength) {
        if (civsLength === 0)
            throw new Error("must provide civs");
        if (mapsLength === 0)
            throw new Error("must provide maps");
        if (victoriesLength === 0)
            throw new Error("must provide victories");

        var getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const civIndex = getRandomInt(0, civsLength - 1);
        const mapIndex = getRandomInt(0, mapsLength - 1);
        const victoryIndex = getRandomInt(0, victoriesLength - 1);

        return {
            civ: civIndex,
            map: mapIndex,
            victory: victoryIndex
        };
    },

    getHeadline: function (victoryType, civName) {
        switch (victoryType) {
            case 'Domination':
                return `${civName} declared war on everyone and won`;
            case 'Science':
                return `${civName} control space and our future`;
            case 'Culture':
                return `${civName} dominates the world with its culture`;
            case 'Diplomacy':
                return `"For a brighter future, we trust ${civName} to rule the world" declares Secretary-General of United Nations`;
            default:
                throw new Error("Not implemented");
        }
    },


    print: function (civ, map, victory, rollResult) {
        if (civ.length === 0)
            throw new Error("must provide civ");
        if (map.length === 0)
            throw new Error("must provide map");
        if (victory.length === 0)
            throw new Error("must provide victory");
        if (rollResult.length === 0)
            throw new Error("must provide rollResult");

        const headline = this.getHeadline(victory.title, civ);
        this.printDate();
        this.printVolume(rollResult.civ, rollResult.map, rollResult.victory);
        this.printResults(headline, civ, map, victory);
    },

    printDate: function () {
        const divDate = document.getElementById("subtitleCenter");
        const today = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        divDate.innerText = today.toLocaleDateString("en-US", options);
    },

    printVolume: function (rollCiv, rollMap, rollVictory) {
        const spanVolume = document.getElementById("subtitleLeftVolumeNumber");
        spanVolume.innerText = `${rollCiv}${rollMap}${rollVictory}`;
    },

    printResults: function (headline, civ, map, victory) {
        const divHeadline = document.getElementById("headline");
        const divCiv = document.getElementById("resultCiv");
        const divMap = document.getElementById("resultMap");
        const divVictory = document.getElementById("resultVictory");
        const divVictoryDescriptionLeft = document.getElementById("victoryDescriptionLeft");
        const divVictoryDescriptionRight = document.getElementById("victoryDescriptionRight");

        divHeadline.innerText = headline;
        divCiv.innerText = civ;
        divMap.innerText = map;
        divVictory.innerText = victory.title;
        divVictoryDescriptionLeft.innerText = victory.description.left;
        divVictoryDescriptionRight.innerText = victory.description.right;
    }
}).init();
