import React, {useState} from 'react';
import './App.scss';

export const kSPADES = 'S';
export const kCLUBS = 'C';
export const kHEARTS = 'H';
export const kDIAMONDS = 'D';
export const kJACK = 'J';
export const kQUEEN = 'Q';
export const kKING = 'K';
export const kCardFaces = ['1', '2', '3', '4', '5', '6', '7', '8', '9', kJACK, kQUEEN, kKING];
export const kSuits = [kSPADES, kCLUBS, kHEARTS, kDIAMONDS];

class DeckModel {
    constructor() {
        this._plainDeck = this._generatePlainDeck();
        this._shuffledDeck = this._shuffle();
    }

    _generatePlainDeck = () => {
        const deck = [];

        kSuits.forEach((suit) => {
            kCardFaces.forEach((face) => deck.push(new CardModel(face, suit)));
        })
        return deck;
    }

    _shuffle = () => {
        // TODO implement the shuffling
        const result = [];
        // Creates a Set with indexes not yet randomly picked
        const notUsedIndexSet = new Set();
        for (let i = 0; i < this._plainDeck.length; i++) notUsedIndexSet.add(i);

        this._plainDeck.forEach((card) => {
            const randomIndex = Math.floor( Math.random() * notUsedIndexSet.size);
            const notUsedIndexArray = Array.from(notUsedIndexSet.values());
            const destinyIndex = notUsedIndexArray[randomIndex];

            result[destinyIndex] = card;
            notUsedIndexSet.delete(destinyIndex);
        });

        return result;
    }

    * nextPair() {
        for (let i = 0; i < this._shuffledDeck.length; i += 2) {
            yield {
                card1: this._shuffledDeck[i],
                card2: this._shuffledDeck[i + 1],
            }
        }
    }

    get shuffledDeck() {
        return this._shuffledDeck;
    }

    get plainDeck() {
        return this._plainDeck;
    }

}

class CardModel {
    constructor(face, suit) {
        this.face = face;
        this.suit = suit;
    }

    get isRedSuit() {
        return this.suit === kHEARTS || this.suit === kDIAMONDS;
    }

    get isBlackSuit() {
        return this.suit === kCLUBS || this.suit === kSPADES;
    }

    get key() {
        return this.face + this.suit;
    }
}

const CardsTable = () => {
    const [deck] = useState(new DeckModel());

    return (
        <div className='CardsTable'>
            {deck.shuffledDeck.map((card) =>(
                <Card key={card.key} cardModel={card}>
                </Card>
            ))}
        </div>
    )
}

const Card = ({cardModel}) => {
    return (
        <div className={cardModel.isRedSuit ? 'redSuit' : 'blackSuit'}>
            <span className='topSuit'>{cardModel.suit}</span>
            <span className='face'>{cardModel.face}</span>
            <span className='bottomSuit'>{cardModel.suit}</span>
        </div>
    )
}

const App = () => {
    return (
        <div className='App'>
            <CardsTable />
        </div>
    )
}

export default App;
