import * as React from 'react';
import './style.css';

type Reservation = {
  id: number;
  name: string;
  numOfGuests: number;
};

type ResCompProps = {
  id: number;
  name: string;
  numOfGuests: number;
  handleSave: (id: number, numOfPeople: number) => void;
  handleDelete: (id: number) => void;
};

const ResComponent = ({
  id,
  name,
  numOfGuests,
  handleSave,
  handleDelete,
}: ResCompProps) => {
  const [updatedGuests, setUpdatedGuests] = React.useState<number>(numOfGuests);
  return (
    <div key={id}>
      <input type="text" value={name} />
      <input
        type="number"
        min="1"
        defaultValue={numOfGuests}
        onChange={(e) => setUpdatedGuests(Number(e.target.value))}
      />
      <button onClick={() => handleSave(id, updatedGuests)}>Save</button>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
};

export default function App() {
  const [name, setName] = React.useState<string>('');
  const [reservations, setReservations] = React.useState<Reservation[]>([]);
  const [numOfGuests, setNumOfGuests] = React.useState(1);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleNumOfGuestsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNumOfGuests(Number(e.target.value));
  };

  const handleBookNow = () => {
    if (!name.length) {
      return;
    }
    setReservations([
      ...reservations,
      {
        id: Date.now(),
        name,
        numOfGuests,
      },
    ]);
  };

  const handleDelete = (index: number): void => {
    setReservations(
      reservations.filter((reservation) => reservation.id !== index)
    );
  };

  const handleSave = (value: number, updatedGuests: number): void => {
    console.log('New people, ', updatedGuests);
    setReservations(
      reservations.map((res) =>
        res.id === Number(value) ? { ...res, numOfGuests: updatedGuests } : res
      )
    );
  };

  return (
    <div>
      <button onClick={() => console.log('reservations: ', reservations)}>
        Show Reservations in Console
      </button>
      <br></br>
      <input
        type="text"
        placeholder="Insert your name"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="number"
        min="1"
        defaultValue="1"
        onChange={handleNumOfGuestsChange}
      />
      <button onClick={handleBookNow}>Book Now</button>
      {reservations.map((res) => (
        <ResComponent
          id={res.id}
          name={res.name}
          numOfGuests={res.numOfGuests}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}
