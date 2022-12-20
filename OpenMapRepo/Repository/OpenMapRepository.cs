using Dapper;
using OpenMapRepo.Model;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;


namespace OpenMapRepo.Repository
{
    public class OpenMapRepository : IOpenMap
    {
        private readonly IConfiguration _configuration;
        private readonly string connectionString;

        public OpenMapRepository(IConfiguration configuration) { 
        
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("SqlConnection");

        }

        public async Task<IEnumerable<OpenMapResponse>> SearchAllPlaces(int SearchPageNumber,string searchText)
        {
            

            string whereClause = searchText != "All" ? $"WHERE NAME_PLACE like '%{searchText}%' or DESC_PLACE like '%{searchText}%'" : "";

            string sql = @"

            DECLARE @PageNumber AS INT, @RowspPage AS INT
            SET @PageNumber = "+ SearchPageNumber + @"
            SET @RowspPage = 20


                SELECT 
                    ID_PLACE_PK as IdPlace
                    ,NAME_PLACE as NamePlace
                    ,DESC_PLACE as DescPlace
                    ,DATE_INSERTED as DateInserted
                    ,DATE_UPDATED as DateUpdated
                    ,NAME_CITY as NameCity
                    ,NAME_UF as NameUf
                    ,CASE
						WHEN PHOTO_URL is null then 'https://picsum.photos/300/200' 
						else PHOTO_URL
					END as PhotoUrl
                    ,c.total_records as TotalRecords
                FROM PLACES
                JOIN (select count(*) total_records from places " + whereClause + @") c ON 1=1
                " + whereClause + @"
                ORDER BY DATE_INSERTED DESC
                OFFSET ((@PageNumber - 1) * @RowspPage) ROWS
                FETCH NEXT @RowspPage ROWS ONLY
            ";

            using SqlConnection con = new(connectionString);
            return await con.QueryAsync<OpenMapResponse>(sql);
            
        }

        public async Task<OpenMapResponse> SearchPlace(int id)
        {
            

            string sql = @"

                
                SELECT 
                    ID_PLACE_PK as IdPlace
                    ,NAME_PLACE as NamePlace
                    ,DESC_PLACE as DescPlace
                    ,DATE_INSERTED as DateInserted
                    ,DATE_UPDATED as DateUpdated
                    ,NAME_CITY as NameCity
                    ,NAME_UF as NameUf
                    ,CASE
						WHEN PHOTO_URL is null then 'https://picsum.photos/300/200' 
						else PHOTO_URL
					END as PhotoUrl as PhotoUrl
                FROM PLACES
                WHERE ID_PLACE_PK = @Id";

            using SqlConnection con = new(connectionString);
            return await con.QueryFirstOrDefaultAsync<OpenMapResponse>(sql,new { Id = id });

        }

        public Task<IEnumerable<OpenMapResponse>> SearchPlaces(string SearchText)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AddPlace(OpenMapRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdatePlace(OpenMapRequest request, int idPlace)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeletePlace(int idPlace)
        {
            throw new NotImplementedException();
        }

    }
}
