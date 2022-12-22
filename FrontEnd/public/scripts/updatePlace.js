export default async function updatePlace(place) {
    try {
      const response = await fetch(`https://localhost:7164/OpenMap/id?id=${place['idPlace']}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(place)
      });
      return response.ok;
    } catch (error) {
      console.error(error);
      return false;
    }
  }