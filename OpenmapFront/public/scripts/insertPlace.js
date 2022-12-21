export default async function insertPlace(place) {
    try {
      const response = await fetch('https://localhost:7164/OpenMap', {
        method: 'POST',
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