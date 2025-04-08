import { useState } from "react";

export default function BiddingPlatform() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ title: "", description: "", startBid: "", image: "" });
  const [bids, setBids] = useState({});

  const addService = () => {
    if (newService.title && newService.startBid) {
      setServices([...services, { ...newService, highestBid: newService.startBid }]);
      setNewService({ title: "", description: "", startBid: "", image: "" });
    }
  };

  const placeBid = (index, bidAmount, name, email) => {
    if (bidAmount > services[index].highestBid) {
      const updatedServices = [...services];
      updatedServices[index].highestBid = bidAmount;
      updatedServices[index].highestBidder = { name, email };
      setServices(updatedServices);
    } else {
      alert("Het bod moet hoger zijn dan het huidige hoogste bod.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <header className="bg-blue-600 text-white text-center py-4 w-full mb-6">
        <h1 className="text-3xl font-bold">Talentenveiling VBS De Watermolen</h1>
      </header>
      <div className="mb-6 p-6 border rounded-lg bg-white shadow-lg w-full max-w-lg text-center">
        <h2 className="font-bold text-xl mb-2">Voeg zelf uw talent toe</h2>
        <input type="text" placeholder="Talent" value={newService.title} onChange={(e) => setNewService({ ...newService, title: e.target.value })} className="mb-2 p-2 border rounded w-full" />
        <textarea placeholder="Beschrijving" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} className="mb-2 p-2 border rounded w-full" />
        <input type="number" placeholder="Startbod" value={newService.startBid} onChange={(e) => setNewService({ ...newService, startBid: e.target.value })} className="mb-2 p-2 border rounded w-full" />
        <input type="text" placeholder="Afbeeldings-URL" value={newService.image} onChange={(e) => setNewService({ ...newService, image: e.target.value })} className="mb-4 p-2 border rounded w-full" />
        <button className="bg-blue-600 text-white w-full p-2 rounded" onClick={addService}>Talent Toevoegen</button>
      </div>
      <div className="w-full max-w-lg">
        {services.map((service, index) => (
          <div key={index} className="mb-6 p-6 bg-blue-800 text-white shadow-lg text-center rounded-lg">
            <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
            {service.image && <img src={service.image} alt={service.title} className="w-full h-auto mb-2" />}
            <p className="mb-2">{service.description}</p>
            <p className="text-lg font-semibold mb-2">Hoogste bod: €{service.highestBid}</p>
            <input type="number" placeholder="Bod" onChange={(e) => setBids({ ...bids, [index]: e.target.value })} className="mb-2 p-2 border rounded w-full text-black" />
            <input type="text" placeholder="Naam" onChange={(e) => setBids({ ...bids, [`${index}_name`]: e.target.value })} className="mb-2 p-2 border rounded w-full text-black" />
            <input type="email" placeholder="Email" onChange={(e) => setBids({ ...bids, [`${index}_email`]: e.target.value })} className="mb-4 p-2 border rounded w-full text-black" />
            <button className="bg-green-600 text-white w-full p-2 rounded" onClick={() => placeBid(index, bids[index], bids[`${index}_name`], bids[`${index}_email`])}>Bied</button>
          </div>
        ))}
      </div>
    </div>
  );
}
