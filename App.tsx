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
    <div>
      <input type="text" value={name} disabled />
      <input
        type="number"
        min="1"
        value={updatedGuests}
        onChange={(e) => setUpdatedGuests(Number(e.target.value))}
      />
      <button onClick={() => handleSave(id, updatedGuests)}>Save</button>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
};

export default function App() {
  const baseReservation = {
    id: 0,
    name: '',
    numOfGuests: 1,
  };
  // const [name, setName] = React.useState('');
  // const [numOfGuests, setNumOfGuests] = React.useState(1);
  const [reservation, setReservation] =
    React.useState<Reservation>(baseReservation);
  const [reservations, setReservations] = React.useState<Reservation[]>([]);
  const [searchName, setSearchName] = React.useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setReservation({ ...reservation, name: e.target.value });
    // setName(e.target.value);
  };

  const handleNumOfGuestsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setReservation({ ...reservation, numOfGuests: Number(e.target.value) });
    // setNumOfGuests(Number(e.target.value));
  };

  const handleBookNow = () => {
    if (!reservation.name.length) {
      return;
    }
    if (
      reservations.find(
        (res) =>
          res.name.toLocaleLowerCase() === reservation.name.toLocaleLowerCase()
      )
    ) {
      window.alert('Name already in use!');
      setReservation(baseReservation);
      return;
    }

    setReservations([...reservations, { ...reservation, id: Date.now() }]);
    setReservation(baseReservation);
  };

  const handleDelete = (index: number): void => {
    setReservations(
      reservations.filter((reservation) => reservation.id !== index)
    );
  };

  const handleSave = (value: number, updatedGuests: number): void => {
    setReservations(
      reservations.map((res) =>
        res.id === Number(value) ? { ...res, numOfGuests: updatedGuests } : res
      )
    );
  };

  const filteredReservations = searchName
    ? reservations.filter((res) =>
        res.name.toLowerCase().includes(searchName.toLowerCase())
      )
    : reservations;

  return (
    <div>
      {/* <button
        onClick={() =>
          console.log('reservations: ', JSON.stringify(reservations))
        }
      >
        Show Reservations in Console
      </button> */}
      <br></br>
      <div>
        <input
          placeholder="...filter by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
      <input
        type="text"
        placeholder="Insert your name"
        value={reservation.name}
        onChange={handleNameChange}
      />
      <input
        type="number"
        min="1"
        defaultValue="1"
        value={reservation.numOfGuests}
        onChange={handleNumOfGuestsChange}
      />
      <button onClick={handleBookNow}>Book Now</button>
      {filteredReservations.map((res) => (
        <ResComponent
          key={res.id}
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
