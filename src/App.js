import React, {useState} from 'react';
import './App.scss';

export const kSPADES = 'S';
export const kCLUBS = 'C';
export const kHEARTS = 'H';
export const kDIAMONDS = 'D';
export const kJACK = 'J';
export const kQUEEN = 'Q';
export const kKING = 'K';

class DeckModel {
    constructor() {
        this._kCardFaces = ['1', '2', '3', '4', '5', '6', '7', '8', '9', kJACK, kQUEEN, kKING];
        this._kSuits = [kSPADES, kCLUBS, kHEARTS, kDIAMONDS];
        this._plainDeck = this._generatePlainDeck();
        this._shuffledDeck = this._shuffle(this._shuffledDeck);
    }

    _generatePlainDeck = () => {
        const deck = [];

        this._kSuits.forEach((suit) => {
            this._kCardFaces.forEach((face) => deck.push(new CardModel(face, suit)));
        })
        return deck;
    }

    _shuffle = (deck) => {
        // TODO implement the shuffling
        return deck;
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
}

const CardsTable = () => {

    const [deck] = useState(new DeckModel());
    const [cards]  = useState(deck.plainDeck);

    return (
        <div className='CardsTable'>
            {cards.map((card) =>(
                <Card cardModel={card}>
                </Card>
            ))}
        </div>
    )
}

const Card = ({cardModel}) => {
    return (
        <div className={cardModel.isRedSuit ? 'red-suit' : 'black-suit'}>
            <span className='top-suit'>{cardModel.suit}</span>
            <span className='face'>{cardModel.face}</span>
            <span className='bottom-suit'>{cardModel.suit}</span>
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
