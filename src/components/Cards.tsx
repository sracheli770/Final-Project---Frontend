import React, { useEffect, useState } from 'react';
import { CardType } from '../@types';

const Cards = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState('')
    const [bsId, setBsId] = useState('')
    const [cards, setCards] = useState<CardType[]>([])
    const url = 'http://localhost:3001/api/cards'

    useEffect(() => {
        fetch(url, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(json => setCards(json))
    }, [])

    const handleSaveCard = async () => {
        const newCard: CardType = { name, description, address, phone, image, bsId, _id: '1' }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCard)
        })

            /*  .then(res => console.log(res)) */
            .then(res => res.json())
            .then(json => {
                console.log(json);
                newCard._id = json.id
                setCards(c => [...c, newCard])
                setName('')
                setDescription('')
                setAddress('')
                setPhone('')
                setImage('')
                setBsId('')
            })
            .catch(e => console.log(e))
    }

  return (
    <div className='App'>
          <h2>Add New Bussiness Card</h2>
          <form>
              <input value={name} onChange={e => setName(e.currentTarget.value)} type='text' placeholder='Name' /> <br />
              <input value={description} onChange={e => setDescription(e.currentTarget.value)} type='text' placeholder='Description' /> <br />
              <input value={address} onChange={e => setAddress(e.currentTarget.value)} type='text' placeholder='Address' /> <br />
              <input value={phone} onChange={e => setPhone(e.currentTarget.value)} type='text' placeholder='Phone Number' /> <br />
              <input value={image} onChange={e => setImage(e.currentTarget.value)} type='text' placeholder='Image' /> <br />
              <input value={bsId} onChange={e => setBsId(e.currentTarget.value)} type='text' placeholder='Bussiness Id' /> <br />
              <input className='btn btn-primary my-2' value='Save' onClick={handleSaveCard} type='button' />
          </form>

          <div>
              {cards.map(c =>
                  <div className='w-50 card mx-auto my-2' key={c._id} >
                      <h2>Name: {c.name}</h2>
                      <h4>Description: {c.description}</h4>
                      <h4>Address: {c.address}</h4>
                      <h4>Phone Number: {c.phone}</h4>
                      <img className='w-50 mx-auto' src={c.image} alt={c.name} />
                      <h4>Bussiness Id: {c.bsId}</h4>
                  </div>
              )}
          </div>
    </div>
  )
}

export default Cards