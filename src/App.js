import React, {useState} from 'react';
import './App.css';


class Deck {
    constructor() {
        this._kCardFaces = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K'];
        this._kSuits = ['S', 'C', 'H', 'D'];
        this._plainDeck = this._generatePlainDeck();
        this._shuffledDeck = this._shuffle(this._shuffledDeck);
    }

    _generatePlainDeck = () => {
        const deck = [];

        this._kSuits.forEach((suit) => {
            this._kCardFaces.forEach((face) => deck.push({face, suit}));
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

const CardsTable = () => {

    const [deck] = useState(new Deck());
    const [cards, setCards]  = useState(deck.plainDeck);

    return (
        <div className='CardsTable'>
            {cards.map((card) =>(
                <Card face={card.face} suit={card.suit}>
                </Card>
            ))}
        </div>
    )
}

const Card = ({face, suit}) => {
    return (
        <div className='Card'>
            <span className='Card-topSuit'>{suit}</span>
            <span className='Card-face'>{face}</span>
            <span className='Card-bottomSuit'>{suit}</span>
        </div>
    )
}

const App = () => {
    return (
        <CardsTable />
    )
}


export default App;
