using Dapper;
using OpenMapRepo.Model;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;


namespace OpenMapRepo.Repository
{
    public class OpenMapRepository : IOpenMap
    {
        private readonly IConfiguration _configuration;
        private readonly string? connectionString;

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
					END as PhotoUrl 
                FROM PLACES
                WHERE ID_PLACE_PK = @Id";

            using SqlConnection con = new(connectionString);
            return await con.QueryFirstOrDefaultAsync<OpenMapResponse>(sql,new { Id = id });

        }


        public async Task<bool> UpdatePlace(OpenMapRequest request, int ID)
        {

            string sql = @"

            UPDATE PLACES
                set NAME_PLACE = @NamePlace
                ,DESC_PLACE = @DescPlace
                ,NAME_CITY = @NameCity
                ,NAME_UF = @NameUf
                ,PHOTO_URL = @PhotoUrl
            WHERE ID_PLACE_PK = @ID";

            using SqlConnection con = new(connectionString);

            var parametros = new DynamicParameters();

            parametros.Add("NamePlace", request.NamePlace);
            parametros.Add("DescPlace", request.DescPlace);
            parametros.Add("NameCity", request.NameCity);
            parametros.Add("NameUf", request.NameUf);
            parametros.Add("PhotoUrl", request.PhotoUrl);
            parametros.Add("Id", ID);

            return await con.ExecuteAsync(sql, parametros) > 0;
        }

        public async Task<bool> AddPlace(OpenMapRequest request)
        {
            string sql = @"

            INSERT INTO dbo.PLACES
                (NAME_PLACE
                ,DESC_PLACE
                ,NAME_CITY
                ,NAME_UF
                ,PHOTO_URL)
             VALUES(
                @NamePlace
               ,@DescPlace 
               ,@NameCity
               ,@NameUf
               ,@PhotoUrl)";

            using SqlConnection con = new(connectionString);
            return await con.ExecuteAsync(sql, request) > 0;
            
        }

        public async Task<bool> DeletePlace(int id)
        {
            string sql = @"

            DELETE 
            FROM PLACES
            WHERE id_place_pk = @Id";

            using SqlConnection con = new(connectionString);


            return await con.ExecuteAsync(sql, new { Id = id }) > 0;
        }

    }
}
