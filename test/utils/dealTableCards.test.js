const expect = require("chai").expect;
const dealTableCards = require("../../src/utils/dealTableCards");
const deckBuilder = require("../../src/utils/deckBuilder");

describe("****************** FUNCTION dealTableCards ******************", () => {
    describe("verifyDeckTable functionality", () => {
        it('should provide false if the numPlayers is impossible', () => {
            const deck = deckBuilder.createDeck();
            const event = "preFlop";
            
            expect(dealTableCards.verifyDeckTable(deck, 1, event)).to.equal(false);
            expect(dealTableCards.verifyDeckTable(deck, 6, event)).to.equal(false);
        });

        it('should provide false if an improper event is passed', () => {
            const deck = deckBuilder.createDeck();
            const event = "Flop";
            
            expect(dealTableCards.verifyDeckTable(deck, 2, event)).to.equal(false);
        });

        it("should verify the deck is the correct length before dealing the flop", () => {
            const event = "preFlop";
            
            for (let i = 2; i < 6; i++) {
                const deck = deckBuilder.createDeck();
                deck.splice(0, i*2);
                expect(dealTableCards.verifyDeckTable(deck, i, event)).to.equal(true);                
            }
        });

        it("should verify the deck is the correct length after dealing the flop", () => {
            const event = "postFlop";
            
            for (let i = 2; i < 6; i++) {
                const deck = deckBuilder.createDeck();
                deck.splice(0, i*2);
                dealTableCards.flop(deck);
                expect(dealTableCards.verifyDeckTable(deck, i, event)).to.equal(true);                
            }
        });

        it("should verify the deck is the correct length before dealing the turn", () => {
            const event = "preTurn";
            
            for (let i = 2; i < 6; i++) {
                const deck = deckBuilder.createDeck();
                deck.splice(0, i*2);
                dealTableCards.flop(deck);
                expect(dealTableCards.verifyDeckTable(deck, i, event)).to.equal(true);                
            }
        });

        it("should verify the deck is the correct length after dealing the turn", () => {
            const event = "postTurn";
            
            for (let i = 2; i < 6; i++) {
                const deck = deckBuilder.createDeck();
                deck.splice(0, i*2);
                dealTableCards.flop(deck);
                dealTableCards.turn(deck);
                expect(dealTableCards.verifyDeckTable(deck, i, event)).to.equal(true);                
            }
        });

        it("should verify the deck is the correct length before dealing the river", () => {
            const event = "preRiver";
            
            for (let i = 2; i < 6; i++) {
                const deck = deckBuilder.createDeck();
                deck.splice(0, i*2);
                dealTableCards.flop(deck);
                dealTableCards.turn(deck);
                expect(dealTableCards.verifyDeckTable(deck, i, event)).to.equal(true);                
            }
        });

        it("should verify the deck is the correct length after dealing the river", () => {
            const event = "postRiver";
            
            for (let i = 2; i < 6; i++) {
                const deck = deckBuilder.createDeck();
                deck.splice(0, i*2);
                dealTableCards.flop(deck);
                dealTableCards.turn(deck);
                dealTableCards.river(deck);
                expect(dealTableCards.verifyDeckTable(deck, i, event)).to.equal(true);                
            }
        });
    });

    describe("flop functionality", () => {
        it("should deal 3 cards from the deck", () => {
            const deck = deckBuilder.createDeck();
            const flop = dealTableCards.flop(deck);
            expect(flop.length).to.equal(3);
            expect(deck.length).to.equal(49);
        });

        it("should remove the 3 dealt cards from the deck", () => {
            const deck = [
                { value: 2, suit: "hearts" },
                { value: 3, suit: "clubs" },
                { value: 4, suit: "spades" }
            ];
            const expectedResult = deck.slice(0);
            const flop = dealTableCards.flop(deck);
            expect(flop).to.deep.include(expectedResult[0]);
            expect(flop).to.deep.include(expectedResult[1]);
            expect(flop).to.deep.include(expectedResult[2]);
            expect(flop.length).to.equal(3);
            expect(deck.length).to.equal(0);
        });

        it("should select 3 valid cards at random and never fail", () => {
            let error = false;
            for (let i = 0; i < 50; i++) {
                let deck = deckBuilder.createDeck();
                let flop = dealTableCards.flop(deck);
                if (flop.length !== 3) {
                    error = true;
                }
            }
            expect(error).to.equal(false);
        });
    });

    describe("turn functionality", () => {
        it("should deal 1 card from the deck", () => {
            const deck = deckBuilder.createDeck();
            dealTableCards.flop(deck);
            const turn = dealTableCards.turn(deck);
            expect(turn.length).to.equal(1);
            expect(deck.length).to.equal(48);
        });

        it("should remove the dealt card from the deck", () => {
            const deck = [{ value: 2, suit: "hearts" }];
            const expectedResult = deck.slice(0);
            const turn = dealTableCards.turn(deck);
            expect(turn).to.deep.include(expectedResult[0]);
            expect(turn.length).to.equal(1);
            expect(deck.length).to.equal(0);
        });

        it("should select a valid card at random and never fail", () => {
            let error = false;
            for (let i = 0; i < 50; i++) {
                let deck = deckBuilder.createDeck();
                dealTableCards.flop(deck);
                let turn = dealTableCards.turn(deck);
                if (turn.length !== 1) {
                    error = true;
                }
            }
            expect(error).to.equal(false);
        });
    });

    describe("river functionality", () => {
        it("should deal 1 card from the deck", () => {
            const deck = deckBuilder.createDeck();
            dealTableCards.flop(deck);
            dealTableCards.turn(deck);
            const river = dealTableCards.river(deck);
            expect(river.length).to.equal(1);
            expect(deck.length).to.equal(47);
        });

        it("should remove the dealt card from the deck", () => {
            const deck = [{ value: 2, suit: "hearts" }];
            const expectedResult = deck.slice(0);
            const river = dealTableCards.river(deck);
            expect(river).to.deep.include(expectedResult[0]);
            expect(river.length).to.equal(1);
            expect(deck.length).to.equal(0);
        });

        it("should select a valid card at random and never fail", () => {
            let error = false;
            for (let i = 0; i < 50; i++) {
                let deck = deckBuilder.createDeck();
                let river = dealTableCards.river(deck);
                if (river.length !== 1) {
                    error = true;
                }
            }
            expect(error).to.equal(false);
        });
    });

    describe("logDeck functionality", () => {
        const flop = [
            { value: 2, suit: 'hearts' },
            { value: 3, suit: 'hearts' },
            { value: 4, suit: 'hearts' }
        ];
        const turn = [{ value: 5, suit: 'hearts' }];
        const river = [{ value: 6, suit: 'hearts' }];

        it("should not affect the original deck", () => {
            const deck = deckBuilder.createDeck();
            const loggedDeck = dealTableCards.logDeck(flop, turn, river, deck);
            deck.push({ value: 1, suit: "spades" });
            expect(loggedDeck.deck.indexOf({value: 1, suit: 'spades' })).to.equal(-1);
        });
        
        it("should log the remaining deck", () => {
            const deck = deckBuilder.createDeck();
            const loggedDeck = dealTableCards.logDeck(flop, turn, river, deck);
            expect(loggedDeck).to.deep.equal({
                flop: flop.slice(0),
                turn: turn.slice(0),
                river: river.slice(0),
                deck: deck.slice(0)
            });
        });
    });
});
