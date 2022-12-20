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

        console.log('fetchUrl',fetchUrl);

        await fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
        .then(response => {
                if(response.status == 204){
                    console.log('Não tem dados. Entre em contato com o suporte')
                } else {
                    return response.json();
                }
            })
        .then(data =>{  
                console.log('Console log do fetch',data);
                result = data;
                console.log('no fetch2',result)
                return result;
                } )
        .catch(error => console.error(error))

        console.log('no fetch2',result)
        return result;
}