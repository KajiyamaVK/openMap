export default async  function(id='',searchText, pages=1){
    
        let fetchUrl;
        let result;

        const prefixUrl = 'https://localhost:7164/openMap'

        if(id){
            fetchUrl = `${prefixUrl}/id?id=${id}`
        } else {
            const searchFetchText = !searchText ? 'All' : searchText
            fetchUrl = `${prefixUrl}?SearchPageNumber=${pages}&SearchText=${searchFetchText}`
        }

        await fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
        .then(response => {
                if(response.status == 204){
                    console.error('Não tem dados. Entre em contato com o suporte')
                } else {
                    return response.json();
                }
            })
        .then(data =>{  
                result = data;
                return result;
                } )
        .catch(error => console.error(error))

        return result;
}