export default async function deletePlace(id) {
    try {
      const response = await fetch(`https://localhost:7164/OpenMap/id?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
      });
      return response.ok;
    } catch (error) {
      console.error(error);
      return false;
    }
  }